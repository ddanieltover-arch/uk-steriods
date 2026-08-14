import { apiFetch } from '../../lib/api/client';
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { Package, ChevronRight, ChevronLeft, Calendar, CreditCard, Truck, AlertCircle } from 'lucide-react';

interface OrderHistoryPageProps {
  currentUser: User | null;
  onNavigate: (path: string) => void;
}

export const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({
  currentUser,
  onNavigate,
}) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      onNavigate('/');
      return;
    }
    fetchOrderHistory(pagination.page);
  }, [currentUser]);

  const fetchOrderHistory = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch(`/api/v1/account/orders?page=${page}&limit=10`, {
        headers: {},
});

      if (!res.ok) throw new Error('Failed to load order history.');

      const data = await res.json();
      setOrders(data.orders || []);
      if (data.pagination) setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message || 'Error retrieving orders.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchOrderHistory(newPage);
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="hover:text-slate-800 cursor-pointer" onClick={() => onNavigate('/')}>Home</span>
              <span>/</span>
              <span className="hover:text-slate-800 cursor-pointer" onClick={() => onNavigate('/account')}>My Account</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">Order History</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Order History & Invoices
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading order history...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-800 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => fetchOrderHistory(pagination.page)} className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-xs cursor-pointer">
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">No Orders Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't placed any orders with us yet.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-200 font-extrabold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Order Number</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Payment State</th>
                    <th className="py-4 px-4">Total (£)</th>
                    <th className="py-4 px-4">Items</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-extrabold text-slate-900">
                        {ord.orderNumber}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-slate-500">
                        {new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            ord.status === 'DELIVERED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            ord.paymentStatus === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.paymentStatus === 'FAILED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap">
                        £{(ord.totalPence / 100).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        {ord.itemCount} {ord.itemCount === 1 ? 'item' : 'items'}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => onNavigate(`/account/orders/${ord.orderNumber}`)}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-2xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Order</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden divide-y divide-slate-100">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{ord.orderNumber}</span>
                    <span className="font-black text-slate-900 text-sm">£{(ord.totalPence / 100).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{ord.itemCount} items</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        ord.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.status}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        ord.paymentStatus === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.paymentStatus === 'FAILED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate(`/account/orders/${ord.orderNumber}`)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Order Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {pagination.totalPages > 1 && (
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Page {pagination.page} of {pagination.totalPages}</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={pagination.page <= 1}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    className="p-2 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    className="p-2 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
