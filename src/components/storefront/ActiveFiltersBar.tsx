import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { CatalogueQuery } from '../../lib/validation';
import { Category, Brand } from '../../types';

interface ActiveFiltersBarProps {
  query: CatalogueQuery;
  categories: Category[];
  brands: Brand[];
  onRemoveFilter: (key: keyof CatalogueQuery, value?: any) => void;
  onClearAll: () => void;
}

export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  query,
  categories,
  brands,
  onRemoveFilter,
  onClearAll,
}) => {
  const chips: { key: keyof CatalogueQuery; label: string; value?: any }[] = [];

  // Search chip
  if (query.search) {
    chips.push({ key: 'search', label: `Search: "${query.search}"` });
  }

  // Category chip
  if (query.category) {
    const cat = categories.find((c) => c.slug === query.category);
    chips.push({
      key: 'category',
      label: `Category: ${cat ? cat.name : query.category}`,
    });
  }

  // Brand chip (single brand slug)
  if (query.brand) {
    const b = brands.find((br) => br.slug === query.brand || br.id === query.brand);
    chips.push({
      key: 'brand',
      label: `Brand: ${b ? b.name : query.brand}`,
    });
  }

  // Brand IDs array chips
  if (query.brandIds && query.brandIds.length > 0) {
    query.brandIds.forEach((bId) => {
      const b = brands.find((br) => br.id === bId);
      chips.push({
        key: 'brandIds',
        label: `Brand: ${b ? b.name : bId}`,
        value: bId,
      });
    });
  }

  // Availability chip
  if (query.availability === 'in_stock') {
    chips.push({ key: 'availability', label: 'In Stock Only' });
  } else if (query.availability === 'on_sale') {
    chips.push({ key: 'availability', label: 'On Sale / Special Offer' });
  }

  // Price range chips
  if (query.minPrice > 0 || (query.maxPrice < 1000 && query.maxPrice > 0)) {
    chips.push({
      key: 'minPrice',
      label: `Price: £${query.minPrice} - £${query.maxPrice >= 1000 ? '200+' : query.maxPrice}`,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-3">
      <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mr-1">
        Active Filters:
      </span>

      {chips.map((chip, idx) => (
        <span
          key={`${chip.key}-${idx}`}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs group transition-all"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveFilter(chip.key, chip.value)}
            className="p-0.5 rounded-full hover:bg-teal-200 text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <button
        onClick={onClearAll}
        className="inline-flex items-center gap-1 text-xs font-extrabold text-red-600 hover:text-red-700 hover:underline px-2 py-1 ml-1 cursor-pointer transition-colors"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear All</span>
      </button>
    </div>
  );
};
