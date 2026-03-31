import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { sendContactEmail } from '@/lib/resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const { name, email, phone, company, propertyAddress, city, unitCount, projectType, timeline, source, message } = body;

  // Validate required fields
  if (!name || !name.trim()) {
    return new Response(JSON.stringify({ error: 'Full name is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!email || !email.trim()) {
    return new Response(JSON.stringify({ error: 'Email is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Please provide a valid email address.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!phone || !phone.trim()) {
    return new Response(JSON.stringify({ error: 'Phone number is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    // Save lead to Supabase
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey) {
      const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { error: dbError } = await supabaseAdmin.from('leads').insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company?.trim() || null,
          property_address: propertyAddress?.trim() || null,
          city: city || null,
          unit_count: unitCount?.trim() || null,
          project_type: projectType || null,
          timeline: timeline || null,
          source: source || null,
          message: message?.trim() || null,
        },
      ]);

      if (dbError) {
        console.error('Supabase insert error:', dbError);
      }
    }

    // Send email notification
    if (import.meta.env.RESEND_API_KEY) {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company?.trim() || '',
        propertyName: propertyAddress?.trim() || '',
        unitCount: unitCount?.trim() || '',
        service: projectType || '',
        timeline: timeline || '',
        message: message?.trim() || '',
        source: source || '',
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Your bid request has been submitted successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again or contact us directly at (512) 962-9856.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
