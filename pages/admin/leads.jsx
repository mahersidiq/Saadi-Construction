import { useState, useMemo } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import LeadsTable from '@/components/admin/LeadsTable';
import { supabase } from '@/lib/supabase';
import { getServerSession, supabaseAdmin } from '@/lib/supabaseAdmin';

export async function getServerSideProps(ctx) {
  const user = await getServerSession(ctx.req);

  if (!user) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  const { data: leads, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    props: {
      leads: leads ?? [],
    },
  };
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

export default function AdminLeads({ leads: initialLeads }) {
  const [leads, setLeads] = useState(initialLeads);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Filter leads by status and date range
  const filteredLeads = useMemo(() => {
    let filtered = leads;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((l) => l.status === statusFilter);
    }

    if (dateFrom) {
      const from = new Date(dateFrom);
      filtered = filtered.filter((l) => new Date(l.created_at) >= from);
    }

    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      filtered = filtered.filter((l) => new Date(l.created_at) <= to);
    }

    return filtered;
  }, [leads, statusFilter, dateFrom, dateTo]);

  // Handle status change — update Supabase and local state
  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Failed to update status: ' + error.message);
      return;
    }

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const inputClasses =
    'rounded-lg border border-mid-gray bg-white px-3 py-2 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

  return (
    <>
      <Head>
        <title>Leads | Saadi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">Leads</h1>
          <p className="mt-1 text-sm text-charcoal/60">
            Manage and track all incoming leads.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-4 rounded-xl border border-mid-gray bg-white p-4 shadow-sm">
          {/* Status */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={inputClasses}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
              From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Date To */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
              To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Clear */}
          {(statusFilter !== 'all' || dateFrom || dateTo) && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all');
                setDateFrom('');
                setDateTo('');
              }}
              className="rounded-lg border border-mid-gray px-3 py-2 text-sm font-medium text-charcoal/60 transition-colors hover:bg-light-gray"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Table */}
        <LeadsTable leads={filteredLeads} onStatusChange={handleStatusChange} />
      </div>
    </>
  );
}

AdminLeads.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
