export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    phone,
    company,
    propertyAddress,
    city,
    unitCount,
    projectType,
    timeline,
    source,
    message,
  } = req.body;

  // Validate required fields
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Full name is required.' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  try {
    // Save lead to Supabase
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const { createClient } = require('@supabase/supabase-js');
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { autoRefreshToken: false, persistSession: false } }
      );

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
        // Continue to send email even if DB insert fails
      }
    }

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      const { sendContactEmail } = require('@/lib/resend');

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

    return res.status(200).json({
      success: true,
      message: 'Your bid request has been submitted successfully.',
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({
      error: 'Something went wrong. Please try again or contact us directly at (512) 962-9856.',
    });
  }
}
