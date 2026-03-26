import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@saadiconstructiongroup.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Saadi Construction Group <noreply@saadiconstructiongroup.com>';

/**
 * Sends a formatted contact/lead notification email via Resend.
 *
 * @param {Object} lead - The lead data object.
 * @param {string} lead.name - Full name of the contact.
 * @param {string} lead.email - Email address.
 * @param {string} [lead.phone] - Phone number.
 * @param {string} [lead.company] - Company or property name.
 * @param {string} [lead.propertyName] - Property name.
 * @param {string} [lead.unitCount] - Number of units.
 * @param {string} [lead.service] - Service of interest.
 * @param {string} [lead.timeline] - Project timeline.
 * @param {string} [lead.budget] - Budget range.
 * @param {string} [lead.message] - Additional message.
 * @param {string} [lead.source] - Lead source / page.
 * @returns {Promise<Object>} Resend API response.
 */
export async function sendContactEmail(lead) {
  const {
    name,
    email,
    phone,
    company,
    propertyName,
    unitCount,
    service,
    timeline,
    budget,
    message,
    source,
  } = lead;

  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const buildRow = (label, value) => {
    if (!value) return '';
    return `
      <tr>
        <td style="padding: 10px 16px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 160px; vertical-align: top;">
          ${label}
        </td>
        <td style="padding: 10px 16px; color: #1f2937; border-bottom: 1px solid #e5e7eb;">
          ${value}
        </td>
      </tr>
    `;
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /></head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 32px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background-color: #0A2240; padding: 24px 32px;">
          <h1 style="margin: 0; color: #C8982A; font-size: 20px; font-weight: 700;">
            New Lead Received
          </h1>
          <p style="margin: 8px 0 0; color: #d1d5db; font-size: 14px;">
            ${submittedAt} (CST)
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 24px 32px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${buildRow('Name', name)}
            ${buildRow('Email', `<a href="mailto:${email}" style="color: #2563eb;">${email}</a>`)}
            ${buildRow('Phone', phone ? `<a href="tel:${phone}" style="color: #2563eb;">${phone}</a>` : null)}
            ${buildRow('Company', company)}
            ${buildRow('Property', propertyName)}
            ${buildRow('Unit Count', unitCount)}
            ${buildRow('Service', service)}
            ${buildRow('Timeline', timeline)}
            ${buildRow('Budget', budget)}
            ${buildRow('Source', source)}
          </table>

          ${
            message
              ? `
            <div style="margin-top: 24px; padding: 16px; background-color: #f9fafb; border-radius: 6px; border-left: 4px solid #C8982A;">
              <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">
                Message
              </p>
              <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                ${message}
              </p>
            </div>
          `
              : ''
          }
        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
            Saadi Construction Group &middot; Houston, TX &middot; saadiconstructiongroup.com
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [CONTACT_EMAIL],
    replyTo: email,
    subject: `New Lead: ${name}${service ? ` - ${service}` : ''}`,
    html,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

export default sendContactEmail;
