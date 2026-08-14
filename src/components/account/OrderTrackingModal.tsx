import React, { useState } from 'react';
import { Order } from '../../types';
import { StorageService } from '../../services/storage';
import { X, Search, Package, CheckCircle2, Clock, Truck, MapPin, Building2 } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUser = StorageService.getCurrentUser();
  const [searchNum, setSearchNum] = useState('');
  const [searchEmail, setSearchEmail] = useState(currentUser?.email || '');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!searchNum.trim() || !searchEmail.trim()) {
      setErrorMessage('Please provide both Order Reference and your Email Address for security verification.');
      return;
    }

    const result = StorageService.getOrderByNumberAndEmail(searchNum, searchEmail);
    if (result) {
      setFoundOrder(result);
    } else {
      setFoundOrder(null);
      setErrorMessage('No matching order found for the provided reference and email address.');
    }
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-teal-400" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider">UK Order Tracking Portal</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Order Ref (e.g. UKP-892104)"
                  value={searchNum}
                  onChange={(e) => setSearchNum(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs uppercase font-bold focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address (e.g. alex@example.co.uk)"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-[11px] font-bold text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer uppercase tracking-wider"
            >
              Verify & Track Order Status
            </button>
          </form>

          {/* Results */}
          {foundOrder ? (
            <div className="space-y-6">
              {/* Order Status Timeline Header */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Order Reference</span>
                  <span className="text-base font-black text-slate-900">{foundOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Placed On</span>
                  <span className="text-xs font-bold text-slate-700">
                    {new Date(foundOrder.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Status</span>
                  <span className="inline-block bg-teal-100 text-teal-800 text-xs font-extrabold px-2.5 py-0.5 rounded uppercase">
                    {foundOrder.status}
                  </span>
                </div>
              </div>

              {/* Status Step Visualization */}
              <div className="relative flex justify-between items-center px-4">
                <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-200 -z-10" />
                
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Order Placed</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    foundOrder.paymentStatus === 'paid' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Payment Verified</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    foundOrder.status === 'shipped' || foundOrder.status === 'delivered' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Dispatched</span>
                </div>
              </div>

              {/* Tracking Carrier & Number if Shipped */}
              {foundOrder.trackingNumber && (
                <div className="bg-teal-900 text-white p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-teal-300 font-bold uppercase block">Royal Mail UK Tracking Number</span>
                    <span className="font-mono font-black text-sm text-teal-100">{foundOrder.trackingNumber}</span>
                  </div>
                  <a
                    href={`https://www.royalmail.com/track-your-item#/${foundOrder.trackingNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-teal-900 font-bold text-xs px-3.5 py-1.5 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    Track on Royal Mail
                  </a>
                </div>
              )}

              {/* Order Items List */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Order Items</h4>
                <div className="space-y-2">
                  {foundOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{item.productName}</p>
                        <p className="text-[10px] text-slate-500">Qty: {item.quantity} • SKU: {item.productSku}</p>
                      </div>
                      <span className="font-bold text-slate-900">£{item.totalGbp.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : searched ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <p className="text-xs font-bold text-slate-700">No order found matching "{searchNum}".</p>
              <p className="text-[11px]">Please verify your reference number from your receipt email (e.g. UKP-892104).</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
