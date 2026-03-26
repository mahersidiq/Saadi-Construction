import { useState } from 'react';
import Head from 'next/head';
import { Save, Lock } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { supabase } from '@/lib/supabase';
import { getServerSession, supabaseAdmin } from '@/lib/supabaseAdmin';

export async function getServerSideProps(ctx) {
  const user = await getServerSession(ctx.req);

  if (!user) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  // Fetch site settings — expects a single row in the site_settings table
  const { data: settings } = await supabaseAdmin
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  return {
    props: {
      settings: settings ?? {
        contact_email: '',
        phone: '',
        tagline: '',
      },
    },
  };
}

export default function AdminSettings({ settings: initialSettings }) {
  // ── Site Settings ──
  const [siteForm, setSiteForm] = useState({
    contact_email: initialSettings.contact_email || '',
    phone: initialSettings.phone || '',
    tagline: initialSettings.tagline || '',
  });
  const [siteLoading, setSiteLoading] = useState(false);
  const [siteMessage, setSiteMessage] = useState({ type: '', text: '' });

  // ── Password ──
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Handle site settings change
  const handleSiteChange = (e) => {
    const { name, value } = e.target;
    setSiteForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save site settings
  const handleSiteSubmit = async (e) => {
    e.preventDefault();
    setSiteMessage({ type: '', text: '' });
    setSiteLoading(true);

    try {
      // Upsert — update the existing row or insert if none exists
      const { error: upsertErr } = await supabase
        .from('site_settings')
        .upsert(
          {
            id: initialSettings.id || 1,
            contact_email: siteForm.contact_email,
            phone: siteForm.phone,
            tagline: siteForm.tagline,
          },
          { onConflict: 'id' }
        );

      if (upsertErr) throw upsertErr;

      setSiteMessage({ type: 'success', text: 'Settings saved successfully.' });
    } catch (err) {
      setSiteMessage({
        type: 'error',
        text: err.message || 'Failed to save settings.',
      });
    } finally {
      setSiteLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  // Update password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage({
        type: 'error',
        text: 'Password must be at least 8 characters.',
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setPasswordLoading(true);

    try {
      const { error: updateErr } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (updateErr) throw updateErr;

      setPasswordMessage({
        type: 'success',
        text: 'Password updated successfully.',
      });
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordMessage({
        type: 'error',
        text: err.message || 'Failed to update password.',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const inputClasses =
    'w-full rounded-lg border border-mid-gray bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:cursor-not-allowed disabled:bg-light-gray disabled:opacity-60';

  const labelClasses = 'block text-sm font-semibold text-charcoal mb-1.5';

  return (
    <>
      <Head>
        <title>Settings | Saadi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">
            Settings
          </h1>
          <p className="mt-1 text-sm text-charcoal/60">
            Manage site settings and account security.
          </p>
        </div>

        {/* ── Site Settings ── */}
        <form
          onSubmit={handleSiteSubmit}
          className="rounded-xl border border-mid-gray bg-white p-6 shadow-sm"
        >
          <h2 className="mb-6 font-heading text-lg font-bold text-charcoal">
            Site Settings
          </h2>

          {siteMessage.text && (
            <div
              className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
                siteMessage.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {siteMessage.text}
            </div>
          )}

          <div className="space-y-5">
            {/* Contact Email */}
            <div>
              <label htmlFor="contact_email" className={labelClasses}>
                Contact Email
              </label>
              <input
                id="contact_email"
                name="contact_email"
                type="email"
                value={siteForm.contact_email}
                onChange={handleSiteChange}
                disabled={siteLoading}
                placeholder="info@saadiconstructiongroup.com"
                className={inputClasses}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={siteForm.phone}
                onChange={handleSiteChange}
                disabled={siteLoading}
                placeholder="(773) 555-0100"
                className={inputClasses}
              />
            </div>

            {/* Tagline */}
            <div>
              <label htmlFor="tagline" className={labelClasses}>
                Tagline
              </label>
              <input
                id="tagline"
                name="tagline"
                type="text"
                value={siteForm.tagline}
                onChange={handleSiteChange}
                disabled={siteLoading}
                placeholder="Building Chicago's Future, One Project at a Time"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={siteLoading}
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {siteLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>

        {/* ── Change Password ── */}
        <form
          onSubmit={handlePasswordSubmit}
          className="rounded-xl border border-mid-gray bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-navy/10 p-2">
              <Lock className="h-5 w-5 text-navy" />
            </div>
            <h2 className="font-heading text-lg font-bold text-charcoal">
              Change Password
            </h2>
          </div>

          {passwordMessage.text && (
            <div
              className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
                passwordMessage.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {passwordMessage.text}
            </div>
          )}

          <div className="space-y-5 max-w-md">
            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className={labelClasses}>
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                minLength={8}
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                disabled={passwordLoading}
                placeholder="Minimum 8 characters"
                className={inputClasses}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className={labelClasses}>
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                disabled={passwordLoading}
                placeholder="Re-enter your new password"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock className="h-4 w-4" />
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

AdminSettings.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
