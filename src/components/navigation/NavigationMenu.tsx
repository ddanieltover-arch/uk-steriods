import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Category, Brand } from '../../types';
import { cn } from '../../lib/utils';

interface NavigationMenuProps {
  categories: Category[];
  brands: Brand[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  onSelectBrand?: (brandSlug: string) => void;
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  categories,
  brands,
  selectedCategorySlug,
  onSelectCategory,
  onSelectBrand,
  className,
}) => {

  const [openDropdown, setOpenDropdown] = useState<'categories' | 'brands' | null>(null);

  return (
    <nav className={cn('flex items-center gap-6 text-xs font-extrabold uppercase tracking-wider text-slate-700', className)}>
      {/* All Products */}
      <button
        onClick={() => {
          onSelectCategory('');
          setOpenDropdown(null);
        }}
        className={cn(
          'py-2 transition-colors hover:text-teal-600 cursor-pointer',
          selectedCategorySlug === '' && 'text-teal-600 border-b-2 border-teal-600'
        )}
      >
        All Catalog
      </button>

      {/* Categories Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown('categories')}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          className={cn(
            'flex items-center gap-1 py-2 transition-colors hover:text-teal-600 cursor-pointer',
            selectedCategorySlug !== '' && 'text-teal-600 font-black'
          )}
        >
          <span>Categories</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {openDropdown === 'categories' && (
          <div className="absolute top-full left-0 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl animate-fade-in space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  setOpenDropdown(null);
                }}
                className={cn(
                  'w-full text-left rounded-xl px-3 py-2 text-xs font-bold transition-colors hover:bg-teal-50 hover:text-teal-700 cursor-pointer flex items-center justify-between',
                  selectedCategorySlug === cat.slug ? 'bg-teal-50 text-teal-700' : 'text-slate-800'
                )}
              >
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span className="text-[10px] text-slate-400 font-semibold">{cat.productCount}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured Brands Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown('brands')}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button className="flex items-center gap-1 py-2 transition-colors hover:text-teal-600 cursor-pointer">
          <span>Brands</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {openDropdown === 'brands' && (
          <div className="absolute top-full left-0 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl animate-fade-in space-y-1">
            <div className="px-3 py-1 text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Featured Formulators
            </div>
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => {
                  if (onSelectBrand) {
                    onSelectBrand(brand.slug);
                  } else {
                    onSelectCategory('');
                  }
                  setOpenDropdown(null);
                }}
                className="w-full text-left rounded-xl px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-between"
              >

                <span>{brand.name}</span>
                {brand.isFeatured && (
                  <span className="bg-teal-100 text-teal-800 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                    Featured
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quality Standards */}
      <div className="flex items-center gap-1.5 text-teal-700 font-extrabold normal-case bg-teal-50 px-2.5 py-1 rounded-full text-[11px]">
        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
        <span>100% Verified Quality</span>
      </div>
    </nav>
  );
};
