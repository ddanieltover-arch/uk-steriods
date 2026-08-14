import React from 'react';
import { Menu, Search, ShoppingBag, Heart } from 'lucide-react';
import { Category } from '../../types';

interface MobileHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (slug: string) => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onOpenMobileMenu,
  onOpenSearch,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
}) => {
  return (
    <div className="lg:hidden bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Menu Trigger */}
        <button
          onClick={onOpenMobileMenu}
          className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center: Brand Logo */}
        <div
          onClick={() => onSelectCategory('')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-black italic text-xs shadow-xs">
            UKP
          </div>
          <span className="text-base font-black tracking-tight text-slate-900">
            UK PERFORMANCE
          </span>
        </div>

        {/* Right Actions: Search, Wishlist, Cart */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 text-teal-700 bg-teal-50 rounded-xl transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
