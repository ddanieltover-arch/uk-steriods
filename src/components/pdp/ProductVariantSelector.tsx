import React from 'react';
import { ProductVariant } from '../../types';
import { formatGbp } from '../../types';
import { Check, AlertCircle } from 'lucide-react';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
  basePriceGbp: number;
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
  basePriceGbp,
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <span>Format / Variant Option:</span>
          {selectedVariant && (
            <span className="text-teal-700 font-bold normal-case text-xs bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
              {selectedVariant.name}
            </span>
          )}
        </label>
        <span className="text-[11px] font-bold text-slate-400">
          {variants.filter((v) => v.stockQuantity > 0).length} option(s) available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {variants.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;
          const isOutOfStock = variant.stockQuantity <= 0;
          const priceDiff = variant.priceGbp - basePriceGbp;

          return (
            <button
              key={variant.id}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectVariant(variant)}
              className={`relative flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/20 shadow-2xs'
                  : isOutOfStock
                  ? 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-extrabold ${
                      isSelected ? 'text-teal-900' : isOutOfStock ? 'text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {variant.name}
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 font-medium flex items-center gap-2">
                  <span>SKU: {variant.sku}</span>
                  {variant.stockQuantity > 0 && variant.stockQuantity <= 5 && (
                    <span className="text-amber-600 font-bold">Only {variant.stockQuantity} left</span>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0 ml-2">
                <div className="text-xs font-black text-slate-900">
                  {formatGbp(variant.priceGbp, false)}
                </div>

                {priceDiff !== 0 && (
                  <div
                    className={`text-[10px] font-bold ${
                      priceDiff > 0 ? 'text-slate-500' : 'text-emerald-600'
                    }`}
                  >
                    {priceDiff > 0 ? `+${formatGbp(priceDiff, false)}` : formatGbp(priceDiff, false)}
                  </div>
                )}

                {isOutOfStock && (
                  <div className="text-[10px] font-bold text-red-600 flex items-center gap-0.5">
                    <AlertCircle className="w-3 h-3" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
