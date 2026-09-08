import React, { useEffect } from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { Category } from '../../types';
import { CatalogueQuery } from '../../lib/validation';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  draftQuery: CatalogueQuery;
  onUpdateDraft: (updated: CatalogueQuery) => void;
  onApply: () => void;
  onClearAll: () => void;
  totalMatchesCount?: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  categories,
  draftQuery,
  onUpdateDraft,
  onApply,
  onClearAll,
  totalMatchesCount,
}) => {
  // ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
        className="relative bg-white w-full sm:max-w-md sm:mx-4 max-h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-extrabold text-slate-900">Filters</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-red-600 hover:underline px-2 py-1 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-slate-800 flex-1">
          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block">
              Category
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => onUpdateDraft({ ...draftQuery, category: '', page: 1 })}
                className={`flex justify-between items-center px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                  !draftQuery.category
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>All Categories</span>
                {!draftQuery.category && <Check className="w-4 h-4" />}
              </button>

              {categories.map((cat) => {
                const isSelected = draftQuery.category === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onUpdateDraft({ ...draftQuery, category: isSelected ? '' : cat.slug, page: 1 })}
                    className={`flex justify-between items-center px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-teal-700 text-teal-100' : 'bg-slate-200 text-slate-600'}`}>
                      {cat.productCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block">
              Availability
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  onUpdateDraft({
                    ...draftQuery,
                    availability: draftQuery.availability === 'in_stock' ? 'all' : 'in_stock',
                    page: 1,
                  })
                }
                className={`p-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
                  draftQuery.availability === 'in_stock'
                    ? 'bg-teal-50 border-teal-500 text-teal-800 ring-2 ring-teal-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                In Stock Only
              </button>

              <button
                type="button"
                onClick={() =>
                  onUpdateDraft({
                    ...draftQuery,
                    availability: draftQuery.availability === 'on_sale' ? 'all' : 'on_sale',
                    page: 1,
                  })
                }
                className={`p-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
                  draftQuery.availability === 'on_sale'
                    ? 'bg-teal-50 border-teal-500 text-teal-800 ring-2 ring-teal-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                On Sale Only
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="uppercase text-slate-400 tracking-wider">Max Price</span>
              <span className="text-teal-600 font-black text-sm">
                £{draftQuery.maxPrice >= 1000 ? '200+' : draftQuery.maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={draftQuery.maxPrice >= 1000 ? 200 : draftQuery.maxPrice}
              onChange={(e) =>
                onUpdateDraft({ ...draftQuery, maxPrice: Number(e.target.value), page: 1 })
              }
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex gap-3">
          <button
            type="button"
            onClick={onClearAll}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-3.5 rounded-xl transition-colors cursor-pointer text-center"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={() => {
              onApply();
              onClose();
            }}
            className="flex-2 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-colors cursor-pointer text-center uppercase tracking-wider"
          >
            Show Results {totalMatchesCount !== undefined ? `(${totalMatchesCount})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
