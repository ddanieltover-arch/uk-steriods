import React, { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import {
  CheckCircle2,
  Building2,
  Copy,
  Check,
  Package,
  Truck,
  ArrowRight,
  ShoppingBag,
  Info,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '../feedback/ToastProvider';

interface OrderConfirmationPageProps {
  orderNumber: string;
  trackingToken?: string;
  onNavigate: (path: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderNumber,
  trackingToken,
  onNavigate,
}) => {
  const { showToast } = useToast();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const tokenQuery = trackingToken ? `?token=${encodeURIComponent(trackingToken)}` : '';
        const res = await fetch(`/api/v1/orders/${orderNumber}${tokenQuery}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        } else {
          const errData = await res.json();
          setError(errData.error || `Order #${orderNumber} could not be loaded.`);
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Network error loading order confirmation details.');
      } finally {
        setLoading(false);
      }
    };

    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber, trackingToken]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    showToast('Copied', 'Payment reference copied to clipboard.', 'info');
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const formatGbp = (pence: number) => `£${((pence || 0) / 100).toFixed(2)}`;

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-600">Retrieving order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-slate-50 min-h-screen py-20">
        <Container>
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4">
            <Info className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-lg font-black text-slate-900">Order Notice</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{error || 'Order details not found.'}</p>
            <button
              onClick={() => onNavigate('/')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Return to Storefront</span>
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const shippingAddr = order.shippingAddressSnapshot || {};
  const paymentRecord = order.payments && order.payments.length > 0 ? order.payments[0] : null;
  const paymentInstructions = paymentRecord?.instructions || {};
  const isCrypto = String(order.paymentMethod) === 'CRYPTO';

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Top Hero Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xs space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                Order Received
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Thank You For Your Order!
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Order Number: <span className="font-mono font-black text-slate-900">{order.orderNumber}</span>
              </p>
            </div>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              We have sent a confirmation details message to <span className="font-bold text-slate-900">{order.guestEmail}</span>.
              Please complete your {isCrypto ? 'crypto' : 'bank transfer'} payment below to dispatch your items.
            </p>
          </div>

          {/* BANK TRANSFER INSTRUCTION CARD */}
          <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white">
                    {isCrypto ? 'Crypto Payment Details' : 'Bank Transfer Details'}
                  </h2>
                  <p className="text-[11px] text-teal-200">
                    {isCrypto ? 'Bitcoin / USDT' : 'Faster Payments / Online Banking'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                Action Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {isCrypto ? (
                <>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1 sm:col-span-2">
                    <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-bold">Wallet / network</span>
                    <span className="font-bold text-white text-sm block break-all">
                      {paymentInstructions.accountName || paymentInstructions.note || 'Wallet details emailed after order'}
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                    <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-bold">Method</span>
                    <span className="font-bold text-white text-sm block">{paymentInstructions.bankName || 'Bitcoin / USDT'}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                    <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-bold">Amount due</span>
                    <span className="font-mono font-black text-white text-base tracking-wider block">{formatGbp(order.totalPence)}</span>
                  </div>
                </>
              ) : (
                <>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-bold">Account Beneficiary</span>
                <span className="font-bold text-white text-sm block">{paymentInstructions.beneficiary || 'UK PERFORMANCE LTD'}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-bold">Bank Name</span>
                <span className="font-bold text-white text-sm block">{paymentInstructions.bankName || 'Barclays Bank UK PLC'}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-bold">Sort Code</span>
                <span className="font-mono font-black text-white text-base tracking-wider block">{paymentInstructions.sortCode || '20-45-89'}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-bold">Account Number</span>
                <span className="font-mono font-black text-white text-base tracking-wider block">{paymentInstructions.accountNumber || '83920145'}</span>
              </div>
                </>
              )}
            </div>

            {/* Crucial Reference Box */}
            <div className="bg-amber-500/15 border-2 border-amber-400/50 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wider block">
                  Payment Reference (Must Include Exactly)
                </span>
                <span className="font-mono font-black text-amber-200 text-lg tracking-wider block">
                  {order.orderNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(order.orderNumber)}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                {copiedRef ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Reference</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-teal-100/80 leading-relaxed">
              Please send exactly <span className="font-mono font-bold text-white">{formatGbp(order.totalPence)}</span> to the account above using <span className="font-bold text-white">{order.orderNumber}</span> as the reference.
            </p>
          </div>

          {/* ORDER BREAKDOWN & ADDRESS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-100 pb-3">
                <Truck className="w-4 h-4 text-teal-600" />
                <span>Delivery Address</span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <p className="font-bold text-slate-900">{shippingAddr.recipient || 'Customer'}</p>
                <p>{shippingAddr.line1}</p>
                {shippingAddr.line2 && <p>{shippingAddr.line2}</p>}
                <p>{shippingAddr.city}{shippingAddr.county ? `, ${shippingAddr.county}` : ''}</p>
                <p className="font-mono font-bold uppercase">{shippingAddr.postcode}</p>
                <p className="text-slate-500 font-bold">{shippingAddr.country || 'UK'}</p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-100 pb-3">
                <Package className="w-4 h-4 text-teal-600" />
                <span>Financial Summary</span>
              </div>
              <div className="text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="font-mono font-bold">{formatGbp(order.subtotalPence)}</span>
                </div>
                {order.discountPence > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span className="font-mono">-{formatGbp(order.discountPence)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery</span>
                  <span className="font-mono font-bold">{formatGbp(order.shippingPence)}</span>
                </div>
                {order.taxPence > 0 && (
                  <div className="flex justify-between text-slate-500">
                    <span>VAT</span>
                    <span className="font-mono">{formatGbp(order.taxPence)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-base text-teal-700 font-black">{formatGbp(order.totalPence)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ITEMS LIST */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
              Ordered Items ({order.items.length})
            </h3>
            <div className="divide-y divide-slate-100">
              {order.items.map((item: any) => (
                <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    {item.imageSnapshotUrl && (
                      <img
                        src={item.imageSnapshotUrl}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                    )}
                    <div>
                      <span className="font-extrabold text-slate-900 block">{item.productName}</span>
                      <span className="text-[11px] text-slate-500 block">
                        SKU: {item.productSku} {item.variantName ? `• Option: ${item.variantName}` : ''}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Qty: {item.quantity} × {formatGbp(item.unitPricePence)}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-black text-slate-900">
                    {formatGbp(item.subtotalPence)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('/')}
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-extrabold text-xs rounded-2xl transition-all shadow-md shadow-teal-600/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
