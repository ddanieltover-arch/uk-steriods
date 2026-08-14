import React from 'react';
import { Product, formatGbp } from '../../types';
import { displayProductTitle } from '../../lib/pdp/pdp-content';

interface CompanionSlot {
  title: string;
  body: string;
  product?: Product;
}

interface ProductCycleCompanionsProps {
  slots: CompanionSlot[];
  onNavigate: (path: string) => void;
}

export const ProductCycleCompanions: React.FC<ProductCycleCompanionsProps> = ({ slots, onNavigate }) => {
  const visible = slots.filter((slot) => slot.product);
  if (visible.length === 0) return null;

  return (
    <div className="space-y-6">
      {visible.map((slot) => (
        <div key={slot.title}>
          <h3 className="text-sm font-black text-slate-900">{slot.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">{slot.body}</p>
          {slot.product && (
            <button
              type="button"
              onClick={() => onNavigate(`/product/${slot.product!.slug}`)}
              className="mt-3 flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left hover:border-teal-600 cursor-pointer"
            >
              {slot.product.images[0] && (
                <img src={slot.product.images[0]} alt="" className="h-14 w-14 rounded-lg object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-extrabold text-slate-900">
                  {displayProductTitle(slot.product)}
                </p>
                <p className="text-xs font-black text-teal-700">
                  {formatGbp(slot.product.salePriceGbp || slot.product.priceGbp, false)}
                </p>
              </div>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
