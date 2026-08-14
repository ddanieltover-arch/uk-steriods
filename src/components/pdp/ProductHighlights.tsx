import React from 'react';
import { Product } from '../../types';
import { ShieldCheck, Award, Zap, Package, Tag, CheckCircle2 } from 'lucide-react';

interface ProductHighlightsProps {
  product: Product;
}

export const ProductHighlights: React.FC<ProductHighlightsProps> = ({ product }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
        <Zap className="w-4 h-4 text-teal-600" />
        <span>Formulation Highlights</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {product.brandName && (
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <span>Manufacturer</span>
            </div>
            <div className="text-xs font-extrabold text-slate-900 truncate">
              {product.brandName}
            </div>
          </div>
        )}

        {product.categoryName && (
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5 text-teal-600" />
              <span>Category</span>
            </div>
            <div className="text-xs font-extrabold text-slate-900 truncate">
              {product.categoryName}
            </div>
          </div>
        )}

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Product SKU</span>
          </div>
          <div className="text-xs font-mono font-bold text-slate-800 truncate">
            {product.sku}
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1 col-span-2 sm:col-span-2">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            <span>Formulation Tags</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {product.tags && product.tags.length > 0 ? (
              product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-slate-400">Standard Supplement</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
