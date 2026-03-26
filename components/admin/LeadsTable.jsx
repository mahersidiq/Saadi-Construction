import { useState, useMemo } from 'react';
import { Search, Download, ChevronUp, ChevronDown } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'quoted', label: 'Quoted', color: 'bg-purple-100 text-purple-800' },
  { value: 'won', label: 'Won', color: 'bg-green-100 text-green-800' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800' },
];

const COLUMNS = [
  { key: 'created_at', label: 'Date' },
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'property_address', label: 'Property' },
  { key: 'unit_count', label: 'Units' },
  { key: 'project_type', label: 'Project Type' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'source', label: 'Source' },
  { key: 'status', label: 'Status' },
];

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getStatusOption(value) {
  return STATUS_OPTIONS.find((s) => s.value === value) || STATUS_OPTIONS[0];
}

/**
 * Admin leads table with search, sort, CSV export, and inline status editing.
 *
 * @param {object}   props
 * @param {Array}    props.leads          - Array of lead objects
 * @param {Function} props.onStatusChange - Callback(id, newStatus) when status changes
 */
export default function LeadsTable({ leads = [], onStatusChange }) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');

  // --- Filter ---
  const filtered = useMemo(() => {
    if (!search.trim()) return leads;
    const q = search.toLowerCase();
    return leads.filter((lead) =>
      COLUMNS.some((col) => {
        const val = lead[col.key];
        if (val == null) return false;
        return String(val).toLowerCase().includes(q);
      })
    );
  }, [leads, search]);

  // --- Sort ---
  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let aVal = a[sortKey] ?? '';
      let bVal = b[sortKey] ?? '';

      if (sortKey === 'created_at') {
        aVal = new Date(aVal).getTime() || 0;
        bVal = new Date(bVal).getTime() || 0;
      } else if (sortKey === 'unit_count') {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  // --- Sort handler ---
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'created_at' ? 'desc' : 'asc');
    }
  };

  // --- CSV Export ---
  const exportCSV = () => {
    const headers = COLUMNS.map((c) => c.label);
    const rows = leads.map((lead) =>
      COLUMNS.map((col) => {
        let val = lead[col.key] ?? '';
        if (col.key === 'created_at') val = formatDate(val);
        // Escape double quotes and wrap in quotes
        return `"${String(val).replace(/"/g, '""')}"`;
      })
    );

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saadi-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- Sort icon ---
  const SortIcon = ({ column }) => {
    if (sortKey !== column) {
      return <ChevronUp className="ml-1 inline h-3 w-3 opacity-0 group-hover:opacity-30" />;
    }
    return sortDir === 'asc' ? (
      <ChevronUp className="ml-1 inline h-3 w-3 text-gold" />
    ) : (
      <ChevronDown className="ml-1 inline h-3 w-3 text-gold" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-mid-gray bg-white py-2 pl-10 pr-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-charcoal/60">
            {sorted.length} lead{sorted.length !== 1 ? 's' : ''}
          </span>
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg border border-navy bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table wrapper with horizontal scroll */}
      <div className="overflow-x-auto rounded-lg border border-mid-gray">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead>
            <tr className="border-b border-mid-gray bg-light-gray">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="group cursor-pointer whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70 transition-colors hover:text-navy"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <SortIcon column={col.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-mid-gray bg-white">
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-4 py-12 text-center text-charcoal/50"
                >
                  {search ? 'No leads match your search.' : 'No leads yet.'}
                </td>
              </tr>
            ) : (
              sorted.map((lead) => (
                <tr
                  key={lead.id}
                  className="transition-colors hover:bg-light-gray/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-charcoal">
                    {lead.name || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {lead.company || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {lead.email ? (
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-navy underline decoration-navy/30 hover:decoration-navy"
                      >
                        {lead.email}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {lead.phone || '—'}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-charcoal/70" title={lead.property_address}>
                    {lead.property_address || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center text-charcoal/70">
                    {lead.unit_count ?? '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {lead.project_type || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {lead.timeline || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {lead.source || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <select
                      value={lead.status || 'new'}
                      onChange={(e) => onStatusChange(lead.id, e.target.value)}
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                        getStatusOption(lead.status || 'new').color
                      }`}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
