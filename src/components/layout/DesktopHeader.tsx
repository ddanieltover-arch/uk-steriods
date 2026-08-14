import React from 'react';
import { ShoppingCart, Heart, User } from 'lucide-react';
import { SearchInput } from '../forms/SearchInput';
import { NavigationMenu } from '../navigation/NavigationMenu';
import { BrandMark } from '../brand/BrandMark';
import { Category, Brand, User as UserType, formatGbp } from '../../types';

interface DesktopHeaderProps {
  categories: Category[];
  brands: Brand[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  onSelectBrand?: (brandSlug: string) => void;
  onGoHome?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  cartCount: number;
  cartTotalPence?: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrderTracking: () => void;
  onOpenAccount: () => void;
  currentUser: UserType | null;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  categories,
  brands,
  selectedCategorySlug,
  onSelectCategory,
  onSelectBrand,
  onGoHome,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  cartCount,
  cartTotalPence = 0,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  currentUser,
}) => {
  return (
    <div className="hidden lg:block">
      <div className="brand-header-bg">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center gap-4">
          <BrandMark onClick={() => (onGoHome ? onGoHome() : onSelectCategory(''))} />

          <div className="flex-1 min-w-0 max-w-2xl">
            <SearchInput
              variant="brand"
              placeholder="Search products..."
              value={searchQuery}
              onChange={onSearchChange}
              onSearchSubmit={onSearchSubmit}
            />
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button
              type="button"
              onClick={onOpenAccount}
              className="flex items-center gap-1.5 rounded-full glass-box hover:bg-white/15 text-white px-2.5 py-1 cursor-pointer"
              title={currentUser ? `Logged in as ${currentUser.firstName}` : 'Account'}
            >
              <User className="w-4 h-4" />
              <span className="text-left leading-none">
                <span className="block text-[8px] font-bold uppercase tracking-widest text-white/80">Hello</span>
                <span className="block text-xs font-black mt-0.5">
                  {currentUser ? currentUser.firstName : 'Sign In'}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative h-8 w-8 rounded-full glass-box hover:bg-white/15 text-white flex items-center justify-center cursor-pointer"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative bg-white hover:bg-slate-100 text-[#003d30] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-black text-[11px] cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wide">Cart</span>
              <span>{formatGbp(cartTotalPence)}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white px-8 py-0 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-center">
          <NavigationMenu
            tone="light"
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
