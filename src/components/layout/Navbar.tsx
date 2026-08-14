import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, ShieldCheck, Truck, Package, SlidersHorizontal, Menu, X } from 'lucide-react';
import { Category, User as UserType } from '../../types';

interface NavbarProps {
  categories: Category[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrderTracking: () => void;
  onOpenAccount: () => void;
  currentUser: UserType | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategorySlug,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrderTracking,
  onOpenAccount,
  currentUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Top Professional Announcement Bar */}
      <div className="bg-[#0f172a] text-white text-[11px] font-medium px-4 md:px-8 py-2 flex justify-between items-center tracking-wide uppercase">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="flex items-center gap-1.5 text-teal-400 font-bold">
            <Truck className="w-3.5 h-3.5" />
            Free UK Next-Day Delivery on orders over £100
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 inline" />
            Secure Bank Transfer & Crypto Payments
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <div className="w-4 h-3 bg-blue-700 flex flex-col rounded-[1px] overflow-hidden border border-white/20">
              <div className="h-1/3 bg-red-600"></div>
              <div className="h-1/3 bg-white"></div>
            </div>
            <span>United Kingdom (GBP £)</span>
          </div>

          <button
            onClick={onOpenOrderTracking}
            className="flex items-center gap-1 text-slate-300 hover:text-teal-400 transition-colors cursor-pointer"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:gap-8">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div
            onClick={() => onSelectCategory('')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center text-white font-extrabold italic shadow-sm group-hover:bg-teal-700 transition-colors">
              UKP
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-tighter text-[#0f172a] leading-none">
                UK PERFORMANCE
              </span>
              <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">
                Pharma Grade Catalog
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-[12px] font-bold text-slate-600 uppercase tracking-wider">
          <button
            onClick={() => onSelectCategory('')}
            className={`pb-1 transition-all ${
              selectedCategorySlug === ''
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'hover:text-teal-600'
            }`}
          >
            All Products
          </button>
          {categories.slice(0, 5).map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`pb-1 transition-all ${
                selectedCategorySlug === cat.slug
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'hover:text-teal-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search Box */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search catalog, SKU, compound..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-full py-1.5 pl-4 pr-10 text-xs w-48 md:w-64 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
            />
            <Search className="w-4 h-4 absolute right-3.5 top-2 text-slate-400" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 border-l border-slate-200 pl-3 md:pl-5">
            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-full transition-colors"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account / Login */}
            <button
              onClick={onOpenAccount}
              className="p-2 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-full transition-colors"
              title={currentUser ? `Logged in as ${currentUser.firstName}` : 'Account Login'}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-lg flex items-center gap-2 font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline">Cart</span>
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-md font-extrabold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Mobile Search Bar & Menu Drawer */}
      <div className="sm:hidden px-4 py-2 bg-slate-50 border-t border-slate-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-3 pr-9 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 animate-fade-in">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Categories
          </div>
          <button
            onClick={() => { onSelectCategory(''); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-1.5 px-3 rounded text-xs font-bold ${
              selectedCategorySlug === '' ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { onSelectCategory(cat.slug); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-1.5 px-3 rounded text-xs font-bold ${
                selectedCategorySlug === cat.slug ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.name} ({cat.productCount})
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
