import React from 'react';
import { Share2, Truck, ShieldCheck, Lock, RefreshCw } from 'lucide-react';
import { useToast } from '../feedback/ToastProvider';

interface ProductShareAndTrustProps {
  productName: string;
}

export const ProductShareAndTrust: React.FC<ProductShareAndTrustProps> = ({ productName }) => {
  const { showToast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} on UK Performance Labs`,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed fallback
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast('Link Copied', 'Product link copied to clipboard!', 'success');
      } catch (err) {
        showToast('Error', 'Unable to copy link.', 'error');
      }
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-slate-100">
      {/* Share Action Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleShare}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Share Product</span>
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-2 text-slate-700">
          <Truck className="w-4 h-4 text-teal-600 shrink-0" />
          <div className="text-[11px]">
            <span className="font-extrabold block text-slate-900">Standard Delivery</span>
            <span className="text-slate-500 text-[10px]">Tracked Dispatch</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="text-[11px]">
            <span className="font-extrabold block text-slate-900">Direct Dispatch</span>
            <span className="text-slate-500 text-[10px]">Fresh Formulation</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <Lock className="w-4 h-4 text-teal-600 shrink-0" />
          <div className="text-[11px]">
            <span className="font-extrabold block text-slate-900">Secure Checkout</span>
            <span className="text-slate-500 text-[10px]">SSL Encrypted</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <RefreshCw className="w-4 h-4 text-teal-600 shrink-0" />
          <div className="text-[11px]">
            <span className="font-extrabold block text-slate-900">30-Day Guarantee</span>
            <span className="text-slate-500 text-[10px]">Easy Return Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
