import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing env variable NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseServiceRoleKey) {
  throw new Error('Missing env variable SUPABASE_SERVICE_ROLE_KEY');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Extracts the Supabase access token from request cookies and verifies
 * the user via the admin client.  Returns the user object or null.
 *
 * Usage in getServerSideProps:
 *   const user = await getServerSession(ctx.req);
 *   if (!user) return { redirect: { destination: '/admin/login', permanent: false } };
 */
export async function getServerSession(req) {
  try {
    // Supabase JS client stores the session in a cookie whose name follows
    // the pattern: sb-<project-ref>-auth-token.  The value is a JSON object
    // (or base64-encoded JSON) containing access_token & refresh_token.
    const cookies = req.headers.cookie || '';

    // Parse cookies into a simple object
    const parsed = Object.fromEntries(
      cookies.split(';').map((c) => {
        const [key, ...rest] = c.trim().split('=');
        return [key, rest.join('=')];
      })
    );

    // Find the Supabase auth cookie (sb-<ref>-auth-token or sb-<ref>-auth-token.0 for chunked)
    let tokenData = null;

    // First try the standard single cookie
    const authCookieKey = Object.keys(parsed).find(
      (k) => k.startsWith('sb-') && k.endsWith('-auth-token')
    );

    if (authCookieKey && parsed[authCookieKey]) {
      try {
        tokenData = JSON.parse(decodeURIComponent(parsed[authCookieKey]));
      } catch {
        // Try base64 decode
        try {
          tokenData = JSON.parse(
            Buffer.from(decodeURIComponent(parsed[authCookieKey]), 'base64').toString()
          );
        } catch {
          // Not base64 either
        }
      }
    }

    // If not found, try chunked cookies (sb-<ref>-auth-token.0, .1, .2, ...)
    if (!tokenData) {
      const chunkPrefix = Object.keys(parsed).find(
        (k) => k.startsWith('sb-') && k.endsWith('-auth-token.0')
      );
      if (chunkPrefix) {
        const base = chunkPrefix.replace('.0', '');
        let combined = '';
        let i = 0;
        while (parsed[`${base}.${i}`] !== undefined) {
          combined += parsed[`${base}.${i}`];
          i++;
        }
        if (combined) {
          try {
            tokenData = JSON.parse(decodeURIComponent(combined));
          } catch {
            try {
              tokenData = JSON.parse(
                Buffer.from(decodeURIComponent(combined), 'base64').toString()
              );
            } catch {
              // Give up
            }
          }
        }
      }
    }

    if (!tokenData?.access_token) return null;

    const { data, error } = await supabaseAdmin.auth.getUser(tokenData.access_token);

    if (error || !data?.user) return null;

    return data.user;
  } catch {
    return null;
  }
}

export default supabaseAdmin;
