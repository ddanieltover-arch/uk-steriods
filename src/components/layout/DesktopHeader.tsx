import React from 'react';
import { Truck, ShieldCheck, Package, ShoppingBag, Heart, User, LayoutDashboard } from 'lucide-react';
import { SearchInput } from '../forms/SearchInput';
import { NavigationMenu } from '../navigation/NavigationMenu';
import { Category, Brand, User as UserType } from '../../types';

interface DesktopHeaderProps {
  categories: Category[];
  brands: Brand[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  onSelectBrand?: (brandSlug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrderTracking: () => void;
  onOpenAccount: () => void;
  onOpenAdmin?: () => void;
  currentUser: UserType | null;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  categories,
  brands,
  selectedCategorySlug,
  onSelectCategory,
  onSelectBrand,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrderTracking,
  onOpenAccount,
  onOpenAdmin,
  currentUser,
}) => {

  return (
    <div className="hidden lg:block bg-white border-b border-slate-200">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-[11px] font-medium px-8 py-2 flex justify-between items-center tracking-wide uppercase">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-teal-400 font-bold">
            <Truck className="w-3.5 h-3.5" />
            Free UK Royal Mail Tracked 24 on orders over £100
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 inline" />
            Secure Bank Transfer & Faster Payments
          </span>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-300">
            <div className="w-4 h-3 bg-blue-700 flex flex-col rounded-[1px] overflow-hidden border border-white/20">
              <div className="h-1/3 bg-red-600"></div>
              <div className="h-1/3 bg-white"></div>
            </div>
            <span>UK (GBP £)</span>
          </div>

          <button
            onClick={onOpenOrderTracking}
            className="flex items-center gap-1 text-slate-300 hover:text-teal-400 transition-colors cursor-pointer"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer"
              title="Switch to Portal"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between gap-8">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectCategory('')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-black italic text-base shadow-sm group-hover:bg-teal-700 transition-colors">
            UKP
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
              UK PERFORMANCE
            </span>
            <span className="text-[10px] font-black text-teal-600 tracking-widest uppercase mt-0.5">
              Supplements & Performance
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md w-full">
          <SearchInput value={searchQuery} onChange={onSearchChange} onSearchSubmit={onSearchSubmit} />
        </div>

        {/* User Action Controls */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-700 hover:text-teal-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Saved Items"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 text-slate-700 hover:text-teal-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title={currentUser ? `Logged in as ${currentUser.firstName}` : 'Account'}
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2.5 font-extrabold text-xs shadow-sm transition-all cursor-pointer hover:shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-md font-black">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Menu */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-8 py-2">
        <div className="max-w-7xl mx-auto">
          <NavigationMenu
            categories={categories}
            brands={brands}
            selectedCategorySlug={selectedCategorySlug}
            onSelectCategory={onSelectCategory}
            onSelectBrand={onSelectBrand}
          />
        </div>
      </div>
    </div>
  );
};
