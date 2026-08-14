import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Search, ShoppingCart, Truck, CheckCircle, AlertTriangle, ArrowLeft, Clock, RefreshCw, X, ShieldCheck } from 'lucide-react';

interface AdminOrdersViewProps {
  onNavigate: (route: string) => void;
  selectedOrderNumber?: string;
}

export const AdminOrdersView: React.FC<AdminOrdersViewProps> = ({ onNavigate, selectedOrderNumber }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  // Dispatch / Tracking Modal
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [carrierInput, setCarrierInput] = useState('Royal Mail UK');
  const [shippingMethodInput, setShippingMethodInput] = useState('Tracked 24');

  const headers = { 'Content-Type': 'application/json' };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (statusFilter) query.set('status', statusFilter);
      if (paymentFilter) query.set('paymentStatus', paymentFilter);

      const res = await apiFetch(`/api/v1/admin/orders?${query.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSingleOrder = async (ordNum: string) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/v1/admin/orders/${ordNum}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setSelectedOrder(data.order);
      }
    } catch (err) {
      console.error('Error loading single order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOrderNumber) {
      loadSingleOrder(selectedOrderNumber);
    } else {
      setSelectedOrder(null);
      loadOrders();
    }
  }, [selectedOrderNumber, search, statusFilter, paymentFilter]);

  const handleUpdateStatus = async (orderNum: string, newStatus: string) => {
    try {
      const res = await apiFetch(`/api/v1/admin/orders/${orderNum}/status`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Status update failed.');
        return;
      }

      if (selectedOrderNumber) loadSingleOrder(selectedOrderNumber);
      else loadOrders();
    } catch (err: any) {
      alert('Failed to update status.');
    }
  };

  const handleUpdatePayment = async (orderNum: string, paymentStatus: string) => {
    try {
      const res = await apiFetch(`/api/v1/admin/orders/${orderNum}/payment`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ paymentStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Payment status update failed.');
        return;
      }

      if (selectedOrderNumber) loadSingleOrder(selectedOrderNumber);
      else loadOrders();
    } catch (err: any) {
      alert('Failed to update payment status.');
    }
  };

  const handleSaveShipmentTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const res = await apiFetch(`/api/v1/admin/orders/${selectedOrder.orderNumber}/shipment`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          provider: carrierInput,
          shippingMethod: shippingMethodInput,
          trackingNumber: trackingNumberInput,
          status: 'DISPATCHED',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to dispatch shipment.');
        return;
      }

      setIsDispatchModalOpen(false);
      if (selectedOrderNumber) loadSingleOrder(selectedOrderNumber);
      else loadOrders();
    } catch (err: any) {
      alert('Failed to save shipment tracking.');
    }
  };

  // Detail View Component
  if (selectedOrderNumber && selectedOrder) {
    const shippingAddr = selectedOrder.shippingAddressSnapshot || {};
    const billingAddr = selectedOrder.billingAddressSnapshot || shippingAddr;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/admin/orders')}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
            </button>
            <div>
              <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">
                Order #{selectedOrder.orderNumber}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-GB')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-black uppercase px-3 py-1 rounded-xl border ${
              selectedOrder.paymentStatus === 'PAID'
                ? 'bg-teal-100 text-teal-800 border-teal-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              Payment: {selectedOrder.paymentStatus}
            </span>

            <span className={`text-xs font-black uppercase px-3 py-1 rounded-xl border ${
              selectedOrder.status === 'SHIPPED'
                ? 'bg-blue-100 text-blue-800 border-blue-200'
                : selectedOrder.status === 'DELIVERED'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              Status: {selectedOrder.status}
            </span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase text-[10px] block font-extrabold">Payment State:</span>
            {selectedOrder.paymentStatus !== 'PAID' && (
              <button
                onClick={() => handleUpdatePayment(selectedOrder.orderNumber, 'PAID')}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg cursor-pointer"
              >
                Mark Payment as PAID / Confirmed
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase text-[10px] block font-extrabold">Fulfillment State:</span>
            <button
              onClick={() => setIsDispatchModalOpen(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Add Courier Tracking & Dispatch</span>
            </button>

            {selectedOrder.status === 'SHIPPED' && (
              <button
                onClick={() => handleUpdateStatus(selectedOrder.orderNumber, 'DELIVERED')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg cursor-pointer"
              >
                Mark as DELIVERED
              </button>
            )}

            {selectedOrder.status !== 'CANCELLED' && selectedOrder.status !== 'DELIVERED' && (
              <button
                onClick={() => handleUpdateStatus(selectedOrder.orderNumber, 'CANCELLED')}
                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg cursor-pointer"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>

        {/* Dispatch Modal */}
        {isDispatchModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm uppercase text-slate-900">Add Tracking & Dispatch</h3>
                <button onClick={() => setIsDispatchModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveShipmentTracking} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Carrier Provider</label>
                  <input
                    type="text"
                    required
                    value={carrierInput}
                    onChange={(e) => setCarrierInput(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Shipping Method</label>
                  <input
                    type="text"
                    required
                    value={shippingMethodInput}
                    onChange={(e) => setShippingMethodInput(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Tracking Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GB892104382RM"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-mono font-bold uppercase focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsDispatchModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg font-bold"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg font-bold">
                    Confirm Dispatch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Historical Order Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-black text-xs uppercase text-slate-900 tracking-wider">Historical Order Items (Snapshot)</h3>
            <div className="divide-y divide-slate-100">
              {selectedOrder.items?.map((item: any) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {item.imageSnapshotUrl && (
                      <img src={item.imageSnapshotUrl} alt="" className="w-10 h-10 object-contain rounded border bg-slate-50" />
                    )}
                    <div>
                      <p className="font-bold text-slate-900">{item.productName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">SKU: {item.productSku}</p>
                      {item.variantName && <p className="text-[10px] text-teal-600 font-medium">{item.variantName}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">£{(item.subtotalPence / 100).toFixed(2)}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {item.quantity} x £{(item.unitPricePence / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Summary */}
            <div className="border-t border-slate-200 pt-4 space-y-1.5 text-xs text-right">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">£{(selectedOrder.subtotalPence / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Discount:</span>
                <span className="font-bold text-teal-600">-£{(selectedOrder.discountPence / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Shipping:</span>
                <span className="font-bold text-slate-900">£{(selectedOrder.shippingPence / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-100">
                <span>Total:</span>
                <span className="text-teal-600">£{(selectedOrder.totalPence / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer & Address Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <div>
              <h4 className="font-black text-xs uppercase text-slate-900 tracking-wider mb-2">Customer Info</h4>
              <p className="font-bold text-slate-900">
                {selectedOrder.user ? `${selectedOrder.user.firstName} ${selectedOrder.user.lastName}` : 'Guest User'}
              </p>
              <p className="text-slate-500 font-mono">{selectedOrder.guestEmail || selectedOrder.user?.email}</p>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <h4 className="font-black text-xs uppercase text-slate-900 tracking-wider mb-2">Shipping Address</h4>
              <p className="font-bold text-slate-800">{shippingAddr.recipient}</p>
              <p className="text-slate-600">{shippingAddr.line1}</p>
              {shippingAddr.line2 && <p className="text-slate-600">{shippingAddr.line2}</p>}
              <p className="text-slate-600">{shippingAddr.city}, {shippingAddr.postcode}</p>
              <p className="text-slate-500 font-bold uppercase">{shippingAddr.country}</p>
            </div>

            {selectedOrder.shipments?.[0] && (
              <div className="border-t border-slate-100 pt-3">
                <h4 className="font-black text-xs uppercase text-slate-900 tracking-wider mb-2">Shipment Tracking</h4>
                <p className="font-bold text-slate-800">{selectedOrder.shipments[0].provider}</p>
                <p className="font-mono text-teal-600 font-bold uppercase">{selectedOrder.shipments[0].trackingNumber}</p>
                <p className="text-[10px] text-slate-400">
                  Dispatched: {new Date(selectedOrder.shipments[0].dispatchedAt).toLocaleString('en-GB')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Orders Table View
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Order Fulfillment Queue</h1>
          <p className="text-xs text-slate-500 font-medium">Manage pending customer orders, payment state, and dispatch.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search order #, customer email, or tracking #..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-xl bg-slate-50 p-2 outline-none"
            >
              <option value="">All Order Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
              <tr>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Date</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total (£)</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-teal-600">{o.orderNumber}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-500">
                    {new Date(o.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">
                      {o.user ? `${o.user.firstName} ${o.user.lastName}` : 'Guest Customer'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">{o.guestEmail || o.user?.email}</p>
                  </td>
                  <td className="p-3 font-black text-slate-900">£{(o.totalPence / 100).toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      o.paymentStatus === 'PAID'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      o.status === 'SHIPPED'
                        ? 'bg-blue-100 text-blue-800'
                        : o.status === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : o.status === 'CANCELLED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onNavigate(`/admin/orders/${o.orderNumber}`)}
                      className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
