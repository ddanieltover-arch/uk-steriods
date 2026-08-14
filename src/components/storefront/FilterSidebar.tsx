import React from 'react';
import { Category, Brand, FilterState } from '../../types';
import { ShieldCheck, Star, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const handleCategoryClick = (slug: string) => {
    onFilterChange({
      ...filters,
      categorySlug: filters.categorySlug === slug ? '' : slug,
    });
  };

  const handleBrandToggle = (brandId: string) => {
    const exists = filters.brandIds.includes(brandId);
    const updated = exists
      ? filters.brandIds.filter(id => id !== brandId)
      : [...filters.brandIds, brandId];
    onFilterChange({ ...filters, brandIds: updated });
  };

  return (
    <aside className="w-full lg:w-64 bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-6 shrink-0 shadow-sm">
      {/* Categories Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Catalog Categories
          </h3>
          {(filters.categorySlug || filters.brandIds.length > 0 || filters.inStockOnly) && (
            <button
              onClick={onResetFilters}
              className="text-[10px] font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        <ul className="space-y-2 text-[13px] font-medium text-slate-600">
          <li
            onClick={() => handleCategoryClick('')}
            className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
              filters.categorySlug === ''
                ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200'
                : 'hover:bg-slate-50 hover:text-teal-600'
            }`}
          >
            <span>All Products</span>
          </li>

          {categories.map(cat => (
            <li
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                filters.categorySlug === cat.slug
                  ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200'
                  : 'hover:bg-slate-50 hover:text-teal-600'
              }`}
            >
              <span className="truncate pr-2">{cat.name}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  filters.categorySlug === cat.slug
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.productCount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter by Brand */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
          Filter by Brand
        </h3>
        <div className="space-y-2">
          {brands.map(brand => {
            const isChecked = filters.brandIds.includes(brand.id);
            return (
              <label
                key={brand.id}
                className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-teal-600 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBrandToggle(brand.id)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                />
                <span className="flex-1 truncate">{brand.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filter Options */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Availability & Price
        </h3>

        <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
          />
          <span>In Stock Only</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) => onFilterChange({ ...filters, onSaleOnly: e.target.checked })}
            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
          />
          <span>Special Offers / On Sale</span>
        </label>

        {/* Price Range */}
        <div className="pt-2">
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>Max Price:</span>
            <span className="text-teal-600">£{filters.maxPrice}</span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Verified Merchant Trust Widget */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1.5 mb-1 text-teal-700">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Verified Merchant</span>
          </div>
          <div className="flex gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs font-bold text-slate-800">TrustScore 4.9/5</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Discreet UK Next-Day Shipping</p>
        </div>
      </div>
    </aside>
  );
};
