import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Mail, RefreshCw, Eye } from 'lucide-react';

interface NotificationRow {
  id: string;
  eventType: string;
  status: string;
  recipient: string;
  subject?: string | null;
  provider?: string | null;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  sentAt?: string | null;
  failedAt?: string | null;
  errorMessage?: string | null;
  isManualResend?: boolean;
  order?: { orderNumber: string } | null;
}

export const AdminNotificationsView: React.FC = () => {
  const [rows, setRows] = useState<NotificationRow[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<{ subject: string; html: string; text: string } | null>(null);
  const [message, setMessage] = useState('');

  const headers = () => {
    return {};
  };

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const qs = new URLSearchParams();
      if (statusFilter) qs.set('status', statusFilter);
      const res = await apiFetch(`/api/v1/admin/notifications?${qs.toString()}`, { headers: headers() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load notifications');
      setRows(data.notifications || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter]);

  const resend = async (id: string) => {
    setMessage('');
    try {
      const res = await apiFetch(`/api/v1/admin/notifications/${id}/resend`, {
        method: 'POST',
        headers: { ...headers(), 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Resend failed');
      setMessage('Resend queued.');
      await load();
    } catch (err: any) {
      setMessage(err?.message || 'Resend denied or failed.');
    }
  };

  const showPreview = async (eventType: string) => {
    setPreview(null);
    try {
      const res = await apiFetch(`/api/v1/admin/notifications/preview/${eventType}`, {
        headers: headers(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Preview unavailable');
      setPreview({ subject: data.subject, html: data.html, text: data.text });
    } catch (err: any) {
      setMessage(err?.message || 'Preview failed');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-teal-600" />
            Transactional Notifications
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Outbox delivery status for order and account emails. Recipients are masked.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white"
          >
            <option value="">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SENT">Sent</option>
            <option value="FAILED">Failed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button
            type="button"
            onClick={load}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-900 text-white cursor-pointer"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => showPreview('ORDER_CREATED')}
            className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white cursor-pointer flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            Demo preview
          </button>
        </div>
      </div>

      {message && <p className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">{message}</p>}
      {error && <p className="text-xs font-bold text-red-600">{error}</p>}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3">Event</th>
              <th className="p-3">Order</th>
              <th className="p-3">Recipient</th>
              <th className="p-3">Status</th>
              <th className="p-3">Attempts</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">
                  No notifications yet.
                </td>
              </tr>
            ) : (
              rows.map((n) => (
                <tr key={n.id} className="border-t border-slate-100">
                  <td className="p-3 font-bold text-slate-800">
                    {n.eventType}
                    {n.isManualResend && (
                      <span className="ml-1 text-[9px] uppercase text-amber-600">resend</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-[10px]">{n.order?.orderNumber || '—'}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-500">{n.recipient}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        n.status === 'SENT'
                          ? 'bg-teal-50 text-teal-700'
                          : n.status === 'FAILED'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {n.status}
                    </span>
                    {n.errorMessage && (
                      <p className="text-[10px] text-red-500 mt-1 max-w-[180px] truncate" title={n.errorMessage}>
                        {n.errorMessage}
                      </p>
                    )}
                  </td>
                  <td className="p-3">
                    {n.attempts}/{n.maxAttempts}
                  </td>
                  <td className="p-3 text-slate-500">{new Date(n.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => resend(n.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:underline cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Resend
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {preview && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black">Demo template preview (no real send)</h3>
            <button type="button" onClick={() => setPreview(null)} className="text-xs font-bold text-slate-500 cursor-pointer">
              Close
            </button>
          </div>
          <p className="text-xs font-bold text-slate-700">{preview.subject}</p>
          <iframe title="email-preview" sandbox="" srcDoc={preview.html} className="w-full h-96 border border-slate-200 rounded-xl bg-white" />
          <pre className="text-[10px] bg-slate-50 p-3 rounded-xl overflow-auto max-h-40 whitespace-pre-wrap">{preview.text}</pre>
        </div>
      )}
    </div>
  );
};
