import React from 'react';
import { Sheet } from '../overlay/Sheet';
import { Category, Brand, User as UserType } from '../../types';
import { SearchInput } from '../forms/SearchInput';
import { User, Package, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { SITE_NAME } from '../../lib/seo/site';
import { RESOURCE_LINKS } from '../../data/resources';
import { sortManufacturers } from '../../data/manufacturers';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  onSelectBrand?: (brandSlug: string) => void;
  onNavigate?: (path: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  onOpenOrderTracking: () => void;
  onOpenAccount: () => void;
  currentUser: UserType | null;
  autoFocusSearch?: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  categories,
  brands,
  selectedCategorySlug,
  onSelectCategory,
  onSelectBrand,
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenOrderTracking,
  onOpenAccount,
  currentUser,
  autoFocusSearch = false,
}) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      position="left"
      title={SITE_NAME}
      description="UK catalogue"
    >
      <div className="space-y-6 pt-2">
        {/* Search */}
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          onSearchSubmit={(q) => {
            onSearchSubmit?.(q);
            onClose();
          }}
          placeholder="Search catalog, SKU..."
          autoFocus={autoFocusSearch}
        />

        {/* Account Bar */}
        <div
          onClick={() => {
            onOpenAccount();
            onClose();
          }}
          className="flex items-center justify-between rounded-2xl bg-slate-100 p-3 text-slate-900 cursor-pointer hover:bg-slate-200 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white font-bold">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black">
                {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Customer Account'}
              </p>
              <p className="text-[10px] text-slate-500">
                {currentUser ? currentUser.email : 'Sign in or register'}
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </div>

        {/* Category Navigation */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">
            Product Categories
          </h4>
          <button
            onClick={() => {
              onSelectCategory('');
              onClose();
            }}
            className={`w-full text-left rounded-xl px-3.5 py-2.5 text-xs font-extrabold transition-colors flex items-center justify-between ${
              selectedCategorySlug === ''
                ? 'bg-teal-50 text-teal-700'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>All Catalog Items</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              window.history.pushState({}, '', '/blog');
              window.dispatchEvent(new Event('popstate'));
              onClose();
            }}
            className="w-full text-left rounded-xl px-3.5 py-2.5 text-xs font-extrabold transition-colors flex items-center justify-between text-slate-700 hover:bg-slate-50"
          >
            <span>Knowledge Hub / Blog</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 pt-3">
            Resources
          </h4>
          {RESOURCE_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => {
                window.history.pushState({}, '', link.href);
                window.dispatchEvent(new Event('popstate'));
                onClose();
              }}
              className="w-full text-left rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors flex items-center justify-between text-slate-700 hover:bg-slate-50"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.slug);
                onClose();
              }}
              className={`w-full text-left rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors flex items-center justify-between ${
                selectedCategorySlug === cat.slug
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{cat.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>

        {/* Manufacturers */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Manufacturers
            </h4>
            <button
              type="button"
              onClick={() => {
                onNavigate?.('/manufacturers');
                onClose();
              }}
              className="text-[10px] font-black uppercase tracking-wider text-teal-700 cursor-pointer"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {sortManufacturers(brands).slice(0, 8).map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => {
                  if (onSelectBrand) onSelectBrand(brand.slug);
                  else onNavigate?.(`/brand/${brand.slug}`);
                  onClose();
                }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-left text-xs font-bold text-slate-800 hover:border-teal-400 transition-colors cursor-pointer"
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Support & Tracking Links */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              onOpenOrderTracking();
              onClose();
            }}
            className="w-full text-left rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
          >
            <Package className="w-4 h-4 text-teal-600" />
            <span>Track Order Status</span>
          </button>
        </div>

        {/* Trust Badges Summary */}
        <div className="rounded-2xl bg-teal-50/70 p-4 border border-teal-100 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-teal-900">
            <Truck className="w-4 h-4 text-teal-600" />
            <span>Tracked UK Dispatch</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Secure Order Processing</span>
          </div>
        </div>
      </div>
    </Sheet>
  );
};
