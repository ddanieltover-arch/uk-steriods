import React, { useState } from 'react';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileNavigation } from './MobileNavigation';
import { Category, Brand, User as UserType } from '../../types';

interface HeaderProps {
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

export const Header: React.FC<HeaderProps> = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      {/* Desktop Navigation */}
      <DesktopHeader {...props} />

      {/* Mobile Navigation */}
      <MobileHeader
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onOpenSearch={() => setMobileMenuOpen(true)}
        cartCount={props.cartCount}
        wishlistCount={props.wishlistCount}
        onOpenCart={props.onOpenCart}
        onOpenWishlist={props.onOpenWishlist}
        onSelectCategory={props.onSelectCategory}
      />

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={props.categories}
        brands={props.brands}
        selectedCategorySlug={props.selectedCategorySlug}
        onSelectCategory={props.onSelectCategory}
        searchQuery={props.searchQuery}
        onSearchChange={props.onSearchChange}
        onSearchSubmit={props.onSearchSubmit}
        onOpenOrderTracking={props.onOpenOrderTracking}
        onOpenAccount={props.onOpenAccount}
        currentUser={props.currentUser}
      />
    </header>
  );
};
