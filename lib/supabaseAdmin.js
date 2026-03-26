import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

/**
 * Extracts the Supabase access token from request cookies and verifies
 * the user via the admin client. Returns the user object or null.
 */
export async function getServerSession(req) {
  if (!supabaseAdmin) return null;
  try {
    const cookies = req.headers.cookie || '';
    const parsed = Object.fromEntries(
      cookies.split(';').map((c) => {
        const [key, ...rest] = c.trim().split('=');
        return [key, rest.join('=')];
      })
    );

    const accessToken = parsed['sb-access-token'];
    if (!accessToken) return null;

    const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
    if (error || !data?.user) return null;

    return data.user;
  } catch {
    return null;
  }
}

export default supabaseAdmin;
