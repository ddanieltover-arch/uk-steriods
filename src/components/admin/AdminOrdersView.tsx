import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import {
  Search,
  Truck,
  ArrowLeft,
  X,
  Pencil,
  Trash2,
} from 'lucide-react';

interface AdminOrdersViewProps {
  onNavigate: (route: string) => void;
  selectedOrderNumber?: string;
}

type AddressForm = {
  recipient: string;
  line1: string;
  line2: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
};

const emptyAddress = (): AddressForm => ({
  recipient: '',
  line1: '',
  line2: '',
  city: '',
  county: '',
  postcode: '',
  country: 'GB',
  phone: '',
  email: '',
});

function snapshotToForm(snapshot: any, fallbackEmail = ''): AddressForm {
  return {
    recipient: snapshot?.recipient || '',
    line1: snapshot?.line1 || '',
    line2: snapshot?.line2 || '',
    city: snapshot?.city || '',
    county: snapshot?.county || '',
    postcode: snapshot?.postcode || '',
    country: snapshot?.country || 'GB',
    phone: snapshot?.phone || '',
    email: snapshot?.email || fallbackEmail || '',
  };
}

export const AdminOrdersView: React.FC<AdminOrdersViewProps> = ({ onNavigate, selectedOrderNumber }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('status') || '';
  });
  const [paymentFilter, setPaymentFilter] = useState(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('paymentStatus') || '';
  });
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [carrierInput, setCarrierInput] = useState('Royal Mail UK');
  const [shippingMethodInput, setShippingMethodInput] = useState('Tracked 24');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editGuestEmail, setEditGuestEmail] = useState('');
  const [editShipping, setEditShipping] = useState<AddressForm>(emptyAddress());
  const [editBilling, setEditBilling] = useState<AddressForm>(emptyAddress());
  const [editShippingPounds, setEditShippingPounds] = useState('0');
  const [editDiscountPounds, setEditDiscountPounds] = useState('0');
  const [sameBilling, setSameBilling] = useState(true);

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
    } catch {
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
    } catch {
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
    } catch {
      alert('Failed to save shipment tracking.');
    }
  };

  const openEditModal = () => {
    if (!selectedOrder) return;
    const email = selectedOrder.guestEmail || selectedOrder.user?.email || '';
    const shipping = snapshotToForm(selectedOrder.shippingAddressSnapshot, email);
    const billing = snapshotToForm(selectedOrder.billingAddressSnapshot, email);
    setEditGuestEmail(email);
    setEditShipping(shipping);
    setEditBilling(billing);
    setSameBilling(
      JSON.stringify({ ...shipping, email: shipping.email || email }) ===
        JSON.stringify({ ...billing, email: billing.email || email })
    );
    setEditShippingPounds(((selectedOrder.shippingPence || 0) / 100).toFixed(2));
    setEditDiscountPounds(((selectedOrder.discountPence || 0) / 100).toFixed(2));
    setIsEditModalOpen(true);
  };

  const handleSaveOrderEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const shippingPence = Math.round(parseFloat(editShippingPounds || '0') * 100);
    const discountPence = Math.round(parseFloat(editDiscountPounds || '0') * 100);
    if (Number.isNaN(shippingPence) || Number.isNaN(discountPence) || shippingPence < 0 || discountPence < 0) {
      alert('Shipping and discount must be valid non-negative amounts.');
      return;
    }

    const shippingAddressSnapshot = {
      ...editShipping,
      email: editShipping.email || editGuestEmail,
    };
    const billingAddressSnapshot = sameBilling
      ? shippingAddressSnapshot
      : {
          ...editBilling,
          email: editBilling.email || editGuestEmail,
        };

    setSavingEdit(true);
    try {
      const res = await apiFetch(`/api/v1/admin/orders/${selectedOrder.orderNumber}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          guestEmail: editGuestEmail || undefined,
          shippingAddressSnapshot,
          billingAddressSnapshot,
          shippingPence,
          discountPence,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || (data.errors || []).join('\n') || 'Failed to update order.');
        return;
      }
      setIsEditModalOpen(false);
      setSelectedOrder(data.order);
    } catch {
      alert('Failed to update order.');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;
    const ok = window.confirm(
      `Permanently delete order #${selectedOrder.orderNumber}?\n\nThis removes the order, items, payments, and shipments. Stock will be released if the order was not already cancelled/refunded.`
    );
    if (!ok) return;

    setDeleting(true);
    try {
      const res = await apiFetch(`/api/v1/admin/orders/${selectedOrder.orderNumber}`, {
        method: 'DELETE',
        headers,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to delete order.');
        return;
      }
      onNavigate('/admin/orders');
    } catch {
      alert('Failed to delete order.');
    } finally {
      setDeleting(false);
    }
  };

  const renderAddressFields = (
    value: AddressForm,
    onChange: (next: AddressForm) => void,
    prefix: string
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {(
        [
          ['recipient', 'Recipient'],
          ['email', 'Email'],
          ['phone', 'Phone'],
          ['line1', 'Address line 1'],
          ['line2', 'Address line 2'],
          ['city', 'City'],
          ['county', 'County'],
          ['postcode', 'Postcode'],
          ['country', 'Country'],
        ] as const
      ).map(([key, label]) => (
        <div key={`${prefix}-${key}`} className={key === 'line1' || key === 'line2' ? 'sm:col-span-2' : ''}>
          <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">{label}</label>
          <input
            type={key === 'email' ? 'email' : 'text'}
            required={key !== 'line2' && key !== 'county'}
            value={value[key]}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-medium"
          />
        </div>
      ))}
    </div>
  );

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
            <span
              className={`text-xs font-black uppercase px-3 py-1 rounded-xl border ${
                selectedOrder.paymentStatus === 'PAID'
                  ? 'bg-teal-100 text-teal-800 border-teal-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}
            >
              Payment: {selectedOrder.paymentStatus}
            </span>

            <span
              className={`text-xs font-black uppercase px-3 py-1 rounded-xl border ${
                selectedOrder.status === 'SHIPPED'
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : selectedOrder.status === 'DELIVERED'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}
            >
              Status: {selectedOrder.status}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 uppercase text-[10px] block font-extrabold">Order:</span>
            <button
              onClick={openEditModal}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-lg cursor-pointer flex items-center gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Order
            </button>
            <button
              onClick={handleDeleteOrder}
              disabled={deleting}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deleting ? 'Deleting…' : 'Delete Order'}
            </button>
            {selectedOrder.paymentStatus !== 'PAID' && (
              <button
                onClick={() => handleUpdatePayment(selectedOrder.orderNumber, 'PAID')}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg cursor-pointer"
              >
                Mark Payment as PAID / Confirmed
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 uppercase text-[10px] block font-extrabold">Fulfillment:</span>
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

        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm uppercase text-slate-900">
                  Edit Order #{selectedOrder.orderNumber}
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveOrderEdit} className="space-y-5 text-xs">
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Customer email</label>
                  <input
                    type="email"
                    required
                    value={editGuestEmail}
                    onChange={(e) => setEditGuestEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Shipping (£)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={editShippingPounds}
                      onChange={(e) => setEditShippingPounds(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Discount (£)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={editDiscountPounds}
                      onChange={(e) => setEditDiscountPounds(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-black text-[11px] uppercase text-slate-900 tracking-wider">Shipping address</h4>
                  {renderAddressFields(editShipping, setEditShipping, 'ship')}
                </div>

                <label className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameBilling}
                    onChange={(e) => setSameBilling(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  Billing address same as shipping
                </label>

                {!sameBilling && (
                  <div className="space-y-2">
                    <h4 className="font-black text-[11px] uppercase text-slate-900 tracking-wider">Billing address</h4>
                    {renderAddressFields(editBilling, setEditBilling, 'bill')}
                  </div>
                )}

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg font-bold disabled:opacity-60"
                  >
                    {savingEdit ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-black text-xs uppercase text-slate-900 tracking-wider">
              Historical Order Items (Snapshot)
            </h3>
            <div className="divide-y divide-slate-100">
              {selectedOrder.items?.map((item: any) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {item.imageSnapshotUrl && (
                      <img
                        src={item.imageSnapshotUrl}
                        alt=""
                        className="w-10 h-10 object-contain rounded border bg-slate-50"
                      />
                    )}
                    <div>
                      <p className="font-bold text-slate-900">{item.productName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">SKU: {item.productSku}</p>
                      {item.variantName && (
                        <p className="text-[10px] text-teal-600 font-medium">{item.variantName}</p>
                      )}
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

            <div className="border-t border-slate-200 pt-4 space-y-1.5 text-xs text-right">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">
                  £{(selectedOrder.subtotalPence / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Discount:</span>
                <span className="font-bold text-teal-600">
                  -£{(selectedOrder.discountPence / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Shipping:</span>
                <span className="font-bold text-slate-900">
                  £{(selectedOrder.shippingPence / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-100">
                <span>Total:</span>
                <span className="text-teal-600">£{(selectedOrder.totalPence / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-black text-xs uppercase text-slate-900 tracking-wider mb-2">Customer Info</h4>
                <p className="font-bold text-slate-900">
                  {selectedOrder.user
                    ? `${selectedOrder.user.firstName} ${selectedOrder.user.lastName}`
                    : 'Guest User'}
                </p>
                <p className="text-slate-500 font-mono">
                  {selectedOrder.guestEmail || selectedOrder.user?.email}
                </p>
              </div>
              <button
                onClick={openEditModal}
                className="text-[10px] font-bold text-teal-700 hover:text-teal-800 cursor-pointer"
              >
                Edit
              </button>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <h4 className="font-black text-xs uppercase text-slate-900 tracking-wider mb-2">Shipping Address</h4>
              <p className="font-bold text-slate-800">{shippingAddr.recipient}</p>
              <p className="text-slate-600">{shippingAddr.line1}</p>
              {shippingAddr.line2 && <p className="text-slate-600">{shippingAddr.line2}</p>}
              <p className="text-slate-600">
                {shippingAddr.city}, {shippingAddr.postcode}
              </p>
              <p className="text-slate-500 font-bold uppercase">{shippingAddr.country}</p>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <h4 className="font-black text-xs uppercase text-slate-900 tracking-wider mb-2">Billing Address</h4>
              <p className="font-bold text-slate-800">{billingAddr.recipient}</p>
              <p className="text-slate-600">{billingAddr.line1}</p>
              {billingAddr.line2 && <p className="text-slate-600">{billingAddr.line2}</p>}
              <p className="text-slate-600">
                {billingAddr.city}, {billingAddr.postcode}
              </p>
              <p className="text-slate-500 font-bold uppercase">{billingAddr.country}</p>
            </div>

            {selectedOrder.shipments?.[0] && (
              <div className="border-t border-slate-100 pt-3">
                <h4 className="font-black text-xs uppercase text-slate-900 tracking-wider mb-2">Shipment Tracking</h4>
                <p className="font-bold text-slate-800">{selectedOrder.shipments[0].provider}</p>
                <p className="font-mono text-teal-600 font-bold uppercase">
                  {selectedOrder.shipments[0].trackingNumber}
                </p>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Order Fulfillment Queue</h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage pending customer orders, payment state, and dispatch.
          </p>
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

          <div className="flex items-center gap-2 text-xs font-bold w-full sm:w-auto flex-wrap">
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
              <option value="REFUNDED">Refunded</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="border border-slate-200 rounded-xl bg-slate-50 p-2 outline-none"
            >
              <option value="">All Payment Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="AWAITING_TRANSFER">Awaiting Transfer</option>
              <option value="PAID">Paid</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400 font-medium">
                    Loading orders…
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400 font-medium">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
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
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          o.paymentStatus === 'PAID'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          o.status === 'SHIPPED'
                            ? 'bg-blue-100 text-blue-800'
                            : o.status === 'DELIVERED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : o.status === 'CANCELLED'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                        }`}
                      >
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
