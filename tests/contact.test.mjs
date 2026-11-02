import { test } from "node:test";
import assert from "node:assert/strict";
import { handleContact } from "../src/lib/contact.js";
const lead = {
  name: "Test Owner",
  email: "owner@example.com",
  phone: "(832) 555-0123",
  propertyAddress: "Houston",
  projectType: "Unit interiors",
  message: "Two vacant units.",
};
const request = (body, headers = {}) =>
  new Request("https://multifamilyrehabspecialists.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
test("unconfigured email never reports a successful lead", async () => {
  let sent = false;
  const result = await handleContact(request(lead), {
    configured: false,
    send: async () => {
      sent = true;
    },
  });
  assert.equal(result.status, 503);
  assert.equal(sent, false);
  const body = await result.json();
  assert.match(body.error, /832/);
  assert.equal(body.success, undefined);
});
test("provider failure is a failure, with no internal error exposed", async () => {
  const result = await handleContact(request(lead), {
    configured: true,
    send: async () => {
      throw new Error("private provider details");
    },
  });
  assert.equal(result.status, 502);
  assert.doesNotMatch(JSON.stringify(await result.json()), /private/);
});
test("success waits for delivery and maps the property and scope", async () => {
  let sent;
  const result = await handleContact(request(lead), {
    configured: true,
    send: async (value) => {
      sent = value;
    },
  });
  assert.equal(result.status, 200);
  assert.equal((await result.json()).success, true);
  assert.equal(sent.propertyName, lead.propertyAddress);
  assert.equal(sent.service, lead.projectType);
  assert.equal(result.headers.get("Cache-Control"), "no-store");
});
for (const [label, change] of [
  ["empty name", { name: " " }],
  ["bad email", { email: "no-at-sign" }],
  ["bad phone", { phone: "123" }],
  ["non-string value", { name: {} }],
  ["too long", { message: "a".repeat(5001) }],
  ["honeypot", { website: "spam.example" }],
]) {
  test(`rejects ${label} before delivery`, async () => {
    let sent = false;
    const result = await handleContact(request({ ...lead, ...change }), {
      configured: true,
      send: async () => {
        sent = true;
      },
    });
    assert.equal(result.status, 400);
    assert.equal(sent, false);
  });
}
test("malformed JSON and non-object payloads do not crash the API", async () => {
  for (const raw of ["{", "null", "[]", '"hello"']) {
    const req = new Request(
      "https://multifamilyrehabspecialists.com/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
      },
    );
    assert.equal((await handleContact(req, {})).status, 400);
  }
});
test("oversized request bodies are rejected", async () => {
  assert.equal(
    (await handleContact(request({ message: "a".repeat(25000) }), {})).status,
    413,
  );
});
test("a cross-origin submission is rejected", async () => {
  assert.equal(
    (
      await handleContact(
        request(lead, { Origin: "https://other.example" }),
        {},
      )
    ).status,
    403,
  );
});
test("an unexpected media type is rejected", async () => {
  assert.equal(
    (await handleContact(request(lead, { "Content-Type": "text/plain" }), {}))
      .status,
    415,
  );
});

test("customer text is escaped in the email and property details are included", async () => {
  const { renderContactEmail } = await import("../src/lib/resend.js");
  const html = renderContactEmail({
    ...lead,
    name: "<script>alert(1)</script>",
    propertyName: "A&B Apartments",
    message: '<a href="bad">hello</a>',
  });
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("A&amp;B Apartments"));
  assert.ok(html.includes("&lt;a href=&quot;bad&quot;&gt;"));
  assert.ok(!html.includes("<script>"));
});
