import { Resend } from "resend";
import { business } from "../data/business.js";

export function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
}
export function renderContactEmail(lead) {
  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Property", lead.propertyName],
    ["Renovation scope", lead.service],
    ["Project details", lead.message],
  ];
  return `<!doctype html><html lang="en"><body style="font-family:Arial,sans-serif;color:#25372f"><h1>New apartment renovation inquiry</h1><table style="border-collapse:collapse;width:100%">${rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><th style="padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #ddd">${label}</th><td style="padding:12px;white-space:pre-wrap;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table><p>${business.name} · Houston, Texas</p></body></html>`;
}
export async function sendContactEmail(lead) {
  const apiKey = import.meta.env?.RESEND_API_KEY || process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Email is unavailable.");
  const to =
    import.meta.env?.CONTACT_EMAIL ||
    process.env.CONTACT_EMAIL ||
    business.email;
  const from =
    import.meta.env?.FROM_EMAIL ||
    process.env.FROM_EMAIL ||
    `${business.name} <noreply@multifamilyrehabspecialists.com>`;
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    reply_to: lead.email,
    subject: `Property inquiry: ${lead.name.replace(/[\r\n]/g, " ")}`,
    html: renderContactEmail(lead),
  });
  if (error || !data?.id) throw new Error("Email delivery was not confirmed.");
  return data;
}
export default sendContactEmail;
