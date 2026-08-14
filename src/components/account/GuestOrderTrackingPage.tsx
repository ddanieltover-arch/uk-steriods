import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, Package, Truck, MapPin, Calendar, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface GuestOrderTrackingPageProps {
  onNavigate: (path: string) => void;
}

export const GuestOrderTrackingPage: React.FC<GuestOrderTrackingPageProps> = ({
  onNavigate,
}) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingToken, setTrackingToken] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read query parameters from URL e.g. /track-order?orderNumber=UKP-2026-12345&token=track_xyz
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlOrderNum = params.get('orderNumber') || params.get('order');
    const urlToken = params.get('token') || params.get('trackingToken');

    if (urlOrderNum && urlToken) {
      setOrderNumber(urlOrderNum);
      setTrackingToken(urlToken);
      fetchTrackingInfo(urlOrderNum, urlToken);
    }
  }, []);

  const fetchTrackingInfo = async (num: string, token: string) => {
    setLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const res = await fetch(`/api/v1/orders/${encodeURIComponent(num.trim())}/track?token=${encodeURIComponent(token.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Access denied. Please check order number and tracking token.');
      }

      setTrackingData(data.tracking);
    } catch (err: any) {
      setError(err.message || 'Error looking up tracking details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !trackingToken) {
      setError('Both Order Number and Secure Tracking Token are required.');
      return;
    }
    fetchTrackingInfo(orderNumber, trackingToken);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Secure Guest Order Portal</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Track Your Shipment
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            To protect customer privacy, guest tracking requires both your Order Number and unique Tracking Token from your confirmation email.
          </p>
        </div>

        {/* Tracking Lookup Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Order Reference Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UKP-2026-89104"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Guest Tracking Token *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. track_8f3a..."
                    value={trackingToken}
                    onChange={(e) => setTrackingToken(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl py-3 pl-9 pr-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 font-mono"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-xs transition-colors uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Searching Tracking Record...' : 'Verify & Track Order'}</span>
            </button>
          </form>
        </div>

        {/* Tracking Details Results */}
        {trackingData && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6 animate-fade-in">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verified Order</span>
                <h2 className="text-xl font-black text-slate-900">{trackingData.orderNumber}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    trackingData.status === 'DELIVERED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : trackingData.status === 'CANCELLED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {trackingData.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    trackingData.paymentStatus === 'PAID'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {trackingData.paymentStatus}
                </span>
              </div>
            </div>

            {/* Shipment Tracking Info */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-teal-700 font-extrabold uppercase tracking-wider text-[11px]">
                <Truck className="w-4 h-4" />
                <span>Shipment Status</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Courier / Method</span>
                  <p className="font-bold">{trackingData.shipment?.provider || 'Royal Mail UK'}</p>
                  <p className="text-[11px] text-slate-500">{trackingData.shipment?.shippingMethod || 'Standard Tracked'}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tracking Number</span>
                  {trackingData.shipment?.trackingNumber ? (
                    <p className="font-mono font-black text-teal-800">{trackingData.shipment.trackingNumber}</p>
                  ) : (
                    <p className="text-slate-400 italic">Dispatched after payment verification</p>
                  )}
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Delivery</span>
                  <p className="font-bold">
                    {trackingData.shipment?.estimatedDeliveryAt
                      ? new Date(trackingData.shipment.estimatedDeliveryAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '2–3 Business Days'}
                  </p>
                </div>
              </div>
            </div>

            {/* Masked Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white border border-slate-100 p-4 rounded-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Customer (Masked)</span>
                <p className="font-bold text-slate-800">{trackingData.customer.maskedName}</p>
                <p className="text-slate-500 font-mono">{trackingData.customer.maskedEmail}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Destination</span>
                <p className="font-bold text-slate-800">{trackingData.customer.city}, {trackingData.customer.country}</p>
                <p className="text-slate-500 font-mono">{trackingData.customer.maskedPostcode}</p>
              </div>
            </div>

            {/* Item Summaries */}
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Order Items ({trackingData.items?.length || 0})
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {trackingData.items?.map((item: any) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {item.imageSnapshotUrl ? (
                        <img src={item.imageSnapshotUrl} alt={item.productName} className="w-12 h-12 object-cover rounded-lg border border-slate-100 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900">{item.productName}</p>
                        {item.variantName && <p className="text-[11px] text-slate-500">{item.variantName}</p>}
                      </div>
                    </div>
                    <div className="text-right font-bold text-slate-900 shrink-0">
                      <span>Qty: {item.quantity}</span>
                      <span className="block text-[11px] text-slate-500 font-mono">
                        £{(item.subtotalPence / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
