import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Package, AlertTriangle, ArrowRight, RefreshCw, CheckCircle, Clock } from 'lucide-react';

interface DashboardMetrics {
  revenuePence: number;
  totalOrders: number;
  ordersLast24h?: number;
  ordersLast7d?: number;
  orderStatuses: {
    pending: number;
    processing: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    refunded: number;
  };
  pendingPayments: number;
  failedPayments?: number;
  lowStockCount: number;
  outOfStockCount: number;
  notificationQueue?: { pending: number; failed: number };
  recentOrders: any[];
  recentAudit?: Array<{
    id: string;
    action: string;
    entity: string;
    entityId: string;
    createdAt: string;
    userId: string | null;
  }>;
}

interface AdminDashboardOverviewProps {
  onNavigate: (route: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ onNavigate }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/api/v1/admin/dashboard', {
        headers: {},
});

      if (!res.ok) {
        throw new Error('Failed to load real database-backed dashboard metrics.');
      }

      const data = await res.json();
      setMetrics(data);
    } catch (err: any) {
      setError(err?.message || 'Error fetching metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3 shadow-xs">
        <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading database metrics...</p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="bg-red-50 p-6 rounded-2xl border border-red-200 text-red-800 space-y-3">
        <p className="font-bold text-sm">Dashboard Load Error</p>
        <p className="text-xs text-red-600">{error || 'Unable to retrieve metrics.'}</p>
        <button
          onClick={fetchMetrics}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  const formattedRevenue = `£${(metrics.revenuePence / 100).toFixed(2)}`;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Operational Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time database-backed performance and fulfillment metrics.</p>
        </div>
        <button
          onClick={fetchMetrics}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-slate-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Net Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{formattedRevenue}</p>
          <p className="text-[10px] text-teal-600 font-bold">GBP Authoritative Orders</p>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{metrics.totalOrders}</p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600">
            <Clock className="w-3 h-3" />
            <span>{metrics.orderStatuses.pending} Pending Dispatch</span>
          </div>
          {(metrics.ordersLast24h != null || metrics.ordersLast7d != null) && (
            <p className="text-[10px] text-slate-500 font-medium">
              {metrics.ordersLast24h ?? 0} / 24h · {metrics.ordersLast7d ?? 0} / 7d
            </p>
          )}
        </div>

        {/* Low Stock Warning Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Stock Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600">{metrics.lowStockCount}</p>
          <p className="text-[10px] text-slate-500 font-medium">{metrics.outOfStockCount} Out-of-Stock SKUs</p>
        </div>

        {/* Pending Payments Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pending Payments</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-purple-700">{metrics.pendingPayments}</p>
          <p className="text-[10px] text-slate-500 font-medium">
            Bank Transfers Awaiting Match
            {typeof metrics.failedPayments === 'number' ? ` · ${metrics.failedPayments} failed` : ''}
          </p>
        </div>
      </div>

      {/* Operational indicators */}
      {(metrics.notificationQueue || metrics.recentAudit) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-900">Notification Queue</h3>
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">Pending</p>
                <p className="text-xl font-black text-slate-900">{metrics.notificationQueue?.pending ?? 0}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">Failed</p>
                <p className="text-xl font-black text-red-600">{metrics.notificationQueue?.failed ?? 0}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/admin/notifications')}
              className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
            >
              Open notifications
            </button>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-900">Recent Audit Activity</h3>
            {(metrics.recentAudit || []).length === 0 ? (
              <p className="text-xs text-slate-400 font-medium">No recent audit entries.</p>
            ) : (
              <ul className="space-y-2">
                {(metrics.recentAudit || []).slice(0, 5).map((entry) => (
                  <li key={entry.id} className="text-[11px] text-slate-600 flex justify-between gap-2 border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-800 truncate">
                      {entry.action} · {entry.entity}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {new Date(entry.createdAt).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Order Status Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-black text-xs uppercase tracking-wider text-slate-900">Order Pipeline Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Pending</span>
            <span className="text-lg font-black text-amber-600">{metrics.orderStatuses.pending}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Confirmed</span>
            <span className="text-lg font-black text-blue-600">{metrics.orderStatuses.confirmed}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Processing</span>
            <span className="text-lg font-black text-indigo-600">{metrics.orderStatuses.processing}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Shipped</span>
            <span className="text-lg font-black text-teal-600">{metrics.orderStatuses.shipped}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivered</span>
            <span className="text-lg font-black text-emerald-600">{metrics.orderStatuses.delivered}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Cancelled</span>
            <span className="text-lg font-black text-red-600">{metrics.orderStatuses.cancelled}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Refunded</span>
            <span className="text-lg font-black text-slate-600">{metrics.orderStatuses.refunded}</span>
          </div>
        </div>
      </div>

      {/* Recent Customer Orders */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-xs uppercase tracking-wider text-slate-900">Recent Customer Orders</h3>
          <button
            onClick={() => onNavigate('/admin/orders')}
            className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {metrics.recentOrders.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 font-bold border border-dashed border-slate-200 rounded-xl">
            No orders found in the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
                <tr>
                  <th className="p-3">Order Ref</th>
                  <th className="p-3">Customer / Email</th>
                  <th className="p-3">Total (£ GBP)</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-mono font-bold text-teal-600">{order.orderNumber}</td>
                    <td className="p-3">
                      <p className="font-bold text-slate-900">
                        {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest Customer'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">{order.guestEmail || order.user?.email}</p>
                    </td>
                    <td className="p-3 font-black text-slate-900">£{(order.totalPence / 100).toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        order.paymentStatus === 'PAID'
                          ? 'bg-teal-100 text-teal-800'
                          : order.paymentStatus === 'AWAITING_TRANSFER'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        order.status === 'SHIPPED'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onNavigate(`/admin/orders/${order.orderNumber}`)}
                        className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
