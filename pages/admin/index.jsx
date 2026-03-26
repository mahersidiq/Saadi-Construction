import { getServerSession } from '@/lib/supabaseAdmin';

/**
 * /admin redirects to /admin/dashboard (if authenticated) or /admin/login.
 */
export async function getServerSideProps(ctx) {
  const user = await getServerSession(ctx.req);

  if (!user) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  return { redirect: { destination: '/admin/dashboard', permanent: false } };
}

export default function AdminIndex() {
  return null;
}
