import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { FileText, Search, RefreshCw, Eye, X } from 'lucide-react';

export const AdminAuditLogView: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadLogs = async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      query.set('page', page.toString());
      query.set('limit', '20');
      if (actionFilter) query.set('action', actionFilter);
      if (entityFilter) query.set('entity', entityFilter);

      const res = await apiFetch(`/api/v1/admin/audit-log?${query.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        if (data.pagination) setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Error loading audit log:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(1);
  }, [actionFilter, entityFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Security & Mutation Audit Log</h1>
          <p className="text-xs text-slate-500 font-medium">Immutable record of sensitive administrative actions across the platform.</p>
        </div>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">Audit Metadata Snapshot</h3>
              <button onClick={() => setSelectedLog(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><span className="font-bold text-slate-500">Action:</span> <span className="font-mono font-bold text-teal-600">{selectedLog.action}</span></p>
              <p><span className="font-bold text-slate-500">Entity:</span> <span className="font-mono">{selectedLog.entity} ({selectedLog.entityId})</span></p>
              <p><span className="font-bold text-slate-500">Admin:</span> <span>{selectedLog.user ? `${selectedLog.user.firstName} ${selectedLog.user.lastName} (${selectedLog.user.email})` : 'System'}</span></p>
              <p><span className="font-bold text-slate-500">Timestamp:</span> <span>{new Date(selectedLog.createdAt).toLocaleString('en-GB')}</span></p>
              <p><span className="font-bold text-slate-500">IP Address:</span> <span className="font-mono">{selectedLog.ipAddress || 'Internal'}</span></p>

              <div className="pt-2">
                <span className="font-bold text-slate-500 block mb-1">Raw Metadata JSON:</span>
                <pre className="bg-slate-900 text-teal-400 p-3 rounded-xl font-mono text-[10px] overflow-x-auto max-h-60">
                  {JSON.stringify(selectedLog.metadata, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setSelectedLog(null)} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-bold">
          <input
            type="text"
            placeholder="Filter by action (e.g. INVENTORY_ADJUSTED)..."
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="border border-slate-200 rounded-xl bg-slate-50 p-2.5 outline-none flex-1"
          />
          <input
            type="text"
            placeholder="Filter by entity (e.g. Product)..."
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="border border-slate-200 rounded-xl bg-slate-50 p-2.5 outline-none flex-1"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Administrator</th>
                <th className="p-3">Action</th>
                <th className="p-3">Entity</th>
                <th className="p-3">Entity ID</th>
                <th className="p-3 text-right">Metadata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-[10px] text-slate-500">
                    {new Date(log.createdAt).toLocaleString('en-GB')}
                  </td>
                  <td className="p-3 font-bold text-slate-900">
                    {log.user ? `${log.user.firstName} ${log.user.lastName}` : 'System'}
                  </td>
                  <td className="p-3 font-mono font-bold text-teal-600 text-[10px]">{log.action}</td>
                  <td className="p-3 font-medium text-slate-700">{log.entity}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-400">{log.entityId}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold cursor-pointer"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-between items-center pt-2 text-xs font-bold text-slate-500">
            <span>Page {pagination.page} of {pagination.totalPages}</span>
            <div className="flex gap-2">
              <button
                disabled={pagination.page <= 1}
                onClick={() => loadLogs(pagination.page - 1)}
                className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => loadLogs(pagination.page + 1)}
                className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
