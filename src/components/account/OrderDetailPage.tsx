import { apiFetch } from '../../lib/api/client';
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { Package, Clock, CheckCircle2, AlertCircle, RefreshCw, XCircle, ChevronLeft, MapPin, CreditCard, Truck, ExternalLink } from 'lucide-react';
import { CryptoPaymentDetails } from '../commerce/CryptoPaymentDetails';

interface OrderDetailPageProps {
  orderNumber: string;
  currentUser: User | null;
  onNavigate: (path: string) => void;
  onAddToCart?: (item: any) => void;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({
  orderNumber,
  currentUser,
  onNavigate,
  onAddToCart,
}) => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      onNavigate('/');
      return;
    }
    fetchOrderDetail();
  }, [orderNumber, currentUser]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(`/api/v1/account/orders/${orderNumber}`, {
        headers: {},
});

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to load order details.');
      }

      const data = await res.json();
      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || 'Error fetching order detail.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!confirm(`Are you sure you want to cancel Order #${orderNumber}? This action cannot be undone.`)) return;

    setCancelling(true);
    setCancelMessage(null);

    try {
      const res = await apiFetch(`/api/v1/account/orders/${orderNumber}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to cancel order.');

      setCancelMessage('Order has been successfully cancelled.');
      fetchOrderDetail();
    } catch (err: any) {
      alert(err.message || 'Failed to cancel order.');
    } finally {
      setCancelling(false);
    }
  };

  const handleReorder = () => {
    if (!order || !order.items || !onAddToCart) return;
    for (const item of order.items) {
      if (item.productId) {
        onAddToCart({
          productId: item.productId,
          variantId: item.variantId || undefined,
          quantity: item.quantity,
          product: {
            id: item.productId,
            name: item.productName,
            sku: item.productSku,
            basePricePence: item.unitPricePence,
            images: item.imageSnapshotUrl ? [{ url: item.imageSnapshotUrl, isPrimary: true }] : [],
          },
        });
      }
    }
    onNavigate('/cart');
  };

  if (!currentUser) return null;

  // Timeline Step Calculations
  const getTimelineSteps = () => {
    if (!order) return [];

    const isCancelled = order.status === 'CANCELLED';
    const isPaid = order.paymentStatus === 'PAID';
    const isProcessing = ['PROCESSING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'].includes(order.status);
    const isShipped = ['SHIPPED', 'DELIVERED'].includes(order.status);
    const isDelivered = order.status === 'DELIVERED';

    return [
      { id: 'placed', label: 'Order Placed', completed: true, active: order.status === 'PENDING' },
      { id: 'payment', label: 'Payment Confirmed', completed: isPaid, active: order.paymentStatus === 'AWAITING_TRANSFER' && !isCancelled },
      { id: 'processing', label: 'Processing Order', completed: isProcessing, active: order.status === 'CONFIRMED' || order.status === 'PROCESSING' },
      { id: 'dispatched', label: 'Dispatched', completed: isShipped, active: order.status === 'SHIPPED' },
      { id: 'delivered', label: 'Delivered', completed: isDelivered, active: false },
    ];
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <button
              onClick={() => onNavigate('/account/orders')}
              className="text-xs font-bold text-teal-600 hover:underline inline-flex items-center gap-1 mb-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Order History</span>
            </button>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>Order #{orderNumber}</span>
              {order && (
                <span
                  className={`text-xs px-3 py-1 rounded-full font-extrabold uppercase ${
                    order.status === 'DELIVERED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'CANCELLED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.status}
                </span>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {order?.status === 'PENDING' && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
              >
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            )}
            <button
              onClick={handleReorder}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reorder Items</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading order details...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-800 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchOrderDetail} className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-xs cursor-pointer">
              Retry
            </button>
          </div>
        ) : !order ? null : (
          <>
            {cancelMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{cancelMessage}</span>
              </div>
            )}

            {/* Visual Order Timeline */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Fulfillment Timeline
              </h3>

              {order.status === 'CANCELLED' ? (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <p className="font-bold">This order was cancelled.</p>
                    <p className="text-slate-600 text-[11px]">Reserved inventory has been released back to stock.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                  {getTimelineSteps().map((step, idx) => (
                    <div key={step.id} className="relative flex flex-col items-center text-center space-y-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          step.completed
                            ? 'bg-teal-600 text-white'
                            : step.active
                            ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {step.completed ? '✓' : idx + 1}
                      </div>
                      <span className={`text-[11px] font-bold ${step.completed || step.active ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Historical Item Snapshots Table */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900">
                  Items Purchased (Historical Snapshot)
                </h3>
                <span className="text-xs text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {order.items.map((item: any) => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {item.imageSnapshotUrl ? (
                        <img
                          src={item.imageSnapshotUrl}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-100 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                          <Package className="w-6 h-6" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-slate-900 text-sm">{item.productName}</h4>
                        {item.variantName && (
                          <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {item.variantName}
                          </span>
                        )}
                        <p className="text-[11px] font-mono text-slate-400">SKU: {item.productSku}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-black text-slate-900 text-sm">£{(item.subtotalPence / 100).toFixed(2)}</p>
                      <p className="text-slate-500 text-[11px]">{item.quantity} × £{(item.unitPricePence / 100).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 max-w-xs ml-auto">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono">£{(order.subtotalPence / 100).toFixed(2)}</span>
                </div>
                {order.discountPence > 0 && (
                  <div className="flex justify-between text-teal-700 font-bold">
                    <span>Discount</span>
                    <span className="font-mono">-£{(order.discountPence / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-mono">
                    {order.shippingPence === 0 ? 'FREE' : `£${(order.shippingPence / 100).toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                  <span>Total Paid</span>
                  <span className="font-mono">£{(order.totalPence / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Shipping Address & Shipment Details */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Shipping & Delivery
                  </h3>
                </div>

                <div className="text-slate-600 space-y-1">
                  <p className="font-bold text-slate-900">{order.shippingAddress?.recipient}</p>
                  <p>{order.shippingAddress?.line1}</p>
                  {order.shippingAddress?.line2 && <p>{order.shippingAddress.line2}</p>}
                  <p>{order.shippingAddress?.city}, {order.shippingAddress?.postcode}</p>
                  <p className="text-slate-400">{order.shippingAddress?.country || 'UK'}</p>
                </div>

                {order.shipments && order.shipments.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 pt-2">
                    <p className="font-bold text-slate-900">Carrier: {order.shipments[0].provider}</p>
                    <p className="text-slate-500">Method: {order.shipments[0].shippingMethod}</p>
                    {order.shipments[0].trackingNumber ? (
                      <p className="font-mono font-bold text-teal-700">
                        Tracking #: {order.shipments[0].trackingNumber}
                      </p>
                    ) : (
                      <p className="text-slate-400 italic">Tracking number pending dispatch</p>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Details & Bank Instructions */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CreditCard className="w-4 h-4 text-teal-600" />
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Payment Status
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Payment Method:</span>
                    <span className="font-bold text-slate-900 uppercase">{order.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        order.paymentStatus === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.paymentStatus === 'FAILED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {order.paymentStatus === 'AWAITING_TRANSFER' && order.payments?.[0]?.instructions && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2 text-[11px] text-amber-900">
                    <p className="font-bold uppercase tracking-wider text-[10px] text-amber-800">
                      {String(order.paymentMethod) === 'CRYPTO'
                        ? 'Crypto Payment Instructions'
                        : 'Bank Transfer Instructions'}
                    </p>
                    {String(order.paymentMethod) === 'CRYPTO' ? (
                      <CryptoPaymentDetails
                        tone="amber"
                        wallets={order.payments[0].instructions}
                        referenceCode={
                          order.payments[0].instructions.referenceCode || order.orderNumber
                        }
                        formattedTotal={
                          order.payments[0].instructions.formattedTotal ||
                          `£${((order.totalPence || 0) / 100).toFixed(2)}`
                        }
                        note={order.payments[0].instructions.note}
                      />
                    ) : (
                      <>
                        <div className="font-mono space-y-0.5 bg-white p-2 rounded border border-amber-200">
                          <p className="font-bold text-amber-900">Reference Code: {order.orderNumber}</p>
                          <p className="text-[10px] text-amber-700 normal-case font-sans">
                            Contact admin for bank transfer details quoting this reference.
                          </p>
                        </div>
                        <p className="text-[10px] text-amber-700">
                          Please quote reference <strong>{order.orderNumber}</strong> when requesting payment details.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
