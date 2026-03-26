import Head from 'next/head';
import Link from 'next/link';
import { Users, FolderKanban, FileText, PlusCircle, Edit3, Eye } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { getServerSession } from '@/lib/supabaseAdmin';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function getServerSideProps(ctx) {
  const user = await getServerSession(ctx.req);

  if (!user) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  // Fetch counts in parallel
  const [leadsRes, newLeadsRes, projectsRes, postsRes, recentLeadsRes] =
    await Promise.all([
      supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }),
      supabaseAdmin
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new'),
      supabaseAdmin.from('projects').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('posts').select('id', { count: 'exact', head: true }),
      supabaseAdmin
        .from('leads')
        .select('id, name, email, phone, project_type, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

  return {
    props: {
      stats: {
        totalLeads: leadsRes.count ?? 0,
        newLeads: newLeadsRes.count ?? 0,
        projects: projectsRes.count ?? 0,
        posts: postsRes.count ?? 0,
      },
      recentLeads: recentLeadsRes.data ?? [],
    },
  };
}

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-purple-100 text-purple-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

function formatDate(dateStr) {
  if (!dateStr) return '--';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminDashboard({ stats, recentLeads }) {
  const cards = [
    {
      label: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'New Leads',
      value: stats.newLeads,
      icon: Users,
      color: 'text-gold bg-gold/10',
    },
    {
      label: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'text-navy bg-navy/10',
    },
    {
      label: 'Blog Posts',
      value: stats.posts,
      icon: FileText,
      color: 'text-green-600 bg-green-50',
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard | Saadi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">Dashboard</h1>
          <p className="mt-1 text-sm text-charcoal/60">
            Welcome back. Here is an overview of your site.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-mid-gray bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">{card.label}</p>
                  <p className="mt-1 font-heading text-3xl font-bold text-charcoal">
                    {card.value}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
          >
            <PlusCircle className="h-4 w-4" />
            Add Project
          </Link>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold/90"
          >
            <Edit3 className="h-4 w-4" />
            Write Post
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 rounded-lg border border-navy px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
          >
            <Eye className="h-4 w-4" />
            View Leads
          </Link>
        </div>

        {/* Recent Leads */}
        <div className="rounded-xl border border-mid-gray bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-mid-gray px-6 py-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">
              Recent Leads
            </h2>
            <Link
              href="/admin/leads"
              className="text-sm font-medium text-navy hover:text-gold transition-colors"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-mid-gray bg-light-gray">
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Date
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Type
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mid-gray">
                {recentLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-charcoal/50"
                    >
                      No leads yet.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="transition-colors hover:bg-light-gray/50">
                      <td className="whitespace-nowrap px-6 py-3 text-charcoal/70">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 font-medium text-charcoal">
                        {lead.name || '--'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-charcoal/70">
                        {lead.email || '--'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-charcoal/70">
                        {lead.project_type || '--'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                            STATUS_COLORS[lead.status] || STATUS_COLORS.new
                          }`}
                        >
                          {lead.status || 'new'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

AdminDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
