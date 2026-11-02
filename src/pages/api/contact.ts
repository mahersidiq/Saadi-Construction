import type { APIRoute } from "astro";
import { handleContact } from "@/lib/contact";
import { sendContactEmail } from "@/lib/resend";
export const prerender = false;
export const POST: APIRoute = ({ request }) =>
  handleContact(request, {
    configured: Boolean(
      import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY,
    ),
    send: sendContactEmail,
  });
