import React, { useState } from 'react';
import { Headphones } from 'lucide-react';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileNavigation } from './MobileNavigation';
import { MobileBottomNav } from './MobileBottomNav';
import { PromoTicker } from './PromoTicker';
import { Sheet } from '../overlay/Sheet';
import { SocialProofToast } from '../feedback/SocialProofToast';
import { Category, Brand, User as UserType } from '../../types';
import { SITE_NAME } from '../../lib/seo/site';
import { SUPPORT_EMAIL } from '../../data/resources';
import { StorageService } from '../../services/storage';

interface HeaderProps {
  categories: Category[];
  brands: Brand[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  onSelectBrand?: (brandSlug: string) => void;
  onGoHome?: () => void;
  currentPath?: string;
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

export const Header: React.FC<HeaderProps> = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const openMenu = (focusSearch = false) => {
    setSearchFocus(focusSearch);
    setMobileMenuOpen(true);
  };

  const openProduct = (slug: string) => {
    window.history.pushState({}, '', `/product/${slug}`);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <header className="sticky top-0 z-40">
      <PromoTicker variant="top" />

      <DesktopHeader {...props} />

      <MobileHeader
        searchQuery={props.searchQuery}
        onSearchChange={props.onSearchChange}
        onSearchSubmit={props.onSearchSubmit}
        onOpenAccount={props.onOpenAccount}
        onSelectCategory={props.onSelectCategory}
        onGoHome={props.onGoHome}
      />

      <PromoTicker variant="mobile" />

      <div className="lg:hidden">
        <SocialProofToast products={StorageService.getProducts()} onOpenProduct={openProduct} />
      </div>

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => {
          setMobileMenuOpen(false);
          setSearchFocus(false);
        }}
        categories={props.categories}
        brands={props.brands}
        selectedCategorySlug={props.selectedCategorySlug}
        onSelectCategory={props.onSelectCategory}
        onSelectBrand={props.onSelectBrand}
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new Event('popstate'));
          setMobileMenuOpen(false);
        }}
        searchQuery={props.searchQuery}
        onSearchChange={props.onSearchChange}
        onSearchSubmit={props.onSearchSubmit}
        onOpenOrderTracking={props.onOpenOrderTracking}
        onOpenAccount={props.onOpenAccount}
        currentUser={props.currentUser}
        autoFocusSearch={searchFocus}
      />

      <Sheet
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        position="right"
        title="Chat"
        description="We're online"
      >
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-100 p-3">
            <div className="relative">
              <Headphones className="h-6 w-6 text-[#003d30]" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">{SITE_NAME} support</p>
              <p className="text-xs text-emerald-700 font-bold">Online now</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ask about stock, tracking, or your order. We typically reply during UK daytime hours.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="block w-full text-center rounded-xl bg-[#003d30] text-white font-black text-xs py-3"
          >
            Email support
          </a>
        </div>
      </Sheet>

      <div className="hidden lg:block fixed bottom-6 left-6 z-40">
        <SocialProofToast products={StorageService.getProducts()} onOpenProduct={openProduct} />
      </div>

      <MobileBottomNav
        currentPath={props.currentPath || '/'}
        cartCount={props.cartCount}
        onGoHome={() => props.onGoHome?.()}
        onOpenMenu={() => openMenu(false)}
        onOpenSearch={() => openMenu(true)}
        onOpenChat={() => setChatOpen(true)}
        onOpenCart={props.onOpenCart}
      />
    </header>
  );
};
