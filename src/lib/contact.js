export const contactUnavailable =
  "Your inquiry could not be sent. Please call (832) 360-3804 or email info@multifamilyrehabspecialists.com.";
const response = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

// Delivery is injected so validation and failure handling can be tested without sending email.
export async function handleContact(request, { configured, send }) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin)
    return response(
      { error: "Please submit this request from our website." },
      403,
    );
  if (
    !request.headers
      .get("Content-Type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return response({ error: "Please send a JSON request." }, 415);
  const length = Number(request.headers.get("Content-Length") || 0);
  if (length > 24000)
    return response({ error: "Please shorten your message." }, 413);
  let body;
  try {
    // Bound the stream too: Content-Length can be missing or incorrect.
    const reader = request.body?.getReader();
    if (!reader)
      return response({ error: "Please include your contact details." }, 400);
    const chunks = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24000) {
        await reader.cancel();
        return response({ error: "Please shorten your message." }, 413);
      }
      chunks.push(value);
    }
    const joined = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      joined.set(chunk, offset);
      offset += chunk.byteLength;
    }
    body = JSON.parse(new TextDecoder().decode(joined));
  } catch {
    return response({ error: "Please check your inquiry and try again." }, 400);
  }
  if (!body || Array.isArray(body) || typeof body !== "object")
    return response({ error: "Please include your contact details." }, 400);
  const fields = {
    name: 120,
    email: 254,
    phone: 30,
    propertyAddress: 300,
    projectType: 120,
    message: 5000,
    website: 200,
  };
  const values = {};
  for (const [field, max] of Object.entries(fields)) {
    if (body[field] !== undefined && typeof body[field] !== "string")
      return response({ error: "Please check your contact details." }, 400);
    values[field] = (body[field] || "").trim();
    if (values[field].length > max)
      return response({ error: "Please shorten your inquiry." }, 400);
  }
  if (values.website)
    return response({ error: "Please call us to discuss your project." }, 400);
  if (!values.name) return response({ error: "Full name is required." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    return response({ error: "Please provide a valid email address." }, 400);
  if (
    !/^[+()\d .-]{7,30}$/.test(values.phone) ||
    values.phone.replace(/\D/g, "").length < 7
  )
    return response({ error: "Please provide a valid phone number." }, 400);
  if (!configured) return response({ error: contactUnavailable }, 503);
  try {
    await send({
      name: values.name,
      email: values.email,
      phone: values.phone,
      propertyName: values.propertyAddress,
      service: values.projectType,
      message: values.message,
    });
    return response(
      { success: true, message: "Your inquiry has been sent." },
      200,
    );
  } catch {
    // Do not expose provider diagnostics or log customers' personal details.
    console.error("[contact] Email delivery failed.");
    return response({ error: contactUnavailable }, 502);
  }
}
