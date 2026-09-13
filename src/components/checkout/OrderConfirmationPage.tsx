import React, { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import {
  CheckCircle2,
  Mail,
  Package,
  Truck,
  ShoppingBag,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { trackPurchase, penceToGbp } from '../../lib/analytics/gtag';
import { CryptoPaymentDetails } from '../commerce/CryptoPaymentDetails';
import { hasCryptoWallets } from '../../lib/commerce/crypto-wallets';

const SUPPORT_EMAIL = 'sales@uk-steroids.co.uk';

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
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!order?.orderNumber || !Array.isArray(order.items)) return;
    trackPurchase({
      transactionId: order.orderNumber,
      value: penceToGbp(order.totalPence),
      shipping: penceToGbp(order.shippingPence),
      tax: penceToGbp(order.taxPence),
      paymentType: order.paymentMethod ? String(order.paymentMethod) : undefined,
      items: order.items.map((item: any) => ({
        item_id: item.productSku || item.productId || item.id,
        item_name: item.productName || 'Item',
        item_variant: item.variantName,
        price: penceToGbp(item.unitPricePence),
        quantity: item.quantity || 1,
      })),
    });
  }, [order]);

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
  const isCrypto = String(order.paymentMethod) === 'CRYPTO';
  const paymentInstructions = order.payments?.[0]?.instructions || null;
  const showCryptoWallets = isCrypto && hasCryptoWallets(paymentInstructions);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
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
              We have recorded your order for <span className="font-bold text-slate-900">{order.guestEmail}</span>.
              {showCryptoWallets
                ? ' Send crypto to one of the wallets below, then email us the transaction hash.'
                : ' Contact our team for payment instructions and payment details before we can dispatch.'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white">Payment instructions</h2>
                  <p className="text-[11px] text-teal-200">
                    {isCrypto
                      ? showCryptoWallets
                        ? 'Crypto payment — BTC, ETH or BCH'
                        : 'Crypto payment — details from our team'
                      : 'Bank transfer — details provided by our team'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full shrink-0">
                Action Required
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3 text-sm leading-relaxed">
              {showCryptoWallets ? (
                <CryptoPaymentDetails
                  tone="dark"
                  wallets={paymentInstructions}
                  referenceCode={paymentInstructions?.referenceCode || order.orderNumber}
                  formattedTotal={paymentInstructions?.formattedTotal || formatGbp(order.totalPence)}
                  note={paymentInstructions?.note}
                />
              ) : (
                <>
                  <p className="text-teal-50">
                    Please contact our admin team after placing your order to receive payment instructions and payment details.
                    Do not send funds until you have those details from us.
                  </p>
                  <p className="text-teal-100/90 text-xs">
                    Quote your order number <span className="font-mono font-black text-white">{order.orderNumber}</span>
                    {' '}(total due <span className="font-mono font-bold text-white">{formatGbp(order.totalPence)}</span>) when you get in touch.
                  </p>
                </>
              )}
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Payment details for ${order.orderNumber}`)}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact {SUPPORT_EMAIL}
              </a>
            </div>

            <p className="text-[11px] text-teal-100/70 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-teal-400" />
              <span>
                Your order stays pending until payment is confirmed by our team. We will email you when payment is received and when your order ships.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
