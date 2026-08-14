import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Category, Brand, User as UserType } from '../../types';
import { CartDrawer } from '../cart/CartDrawer';
import { useToast } from '../feedback/ToastProvider';

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Endurance & Stamina', slug: 'endurance-stamina', productCount: 14 },
  { id: 'cat_2', name: 'Protein Isolates & Recovery', slug: 'protein-isolates', productCount: 22 },
  { id: 'cat_3', name: 'Hydration & Electrolytes', slug: 'hydration-electrolytes', productCount: 9 },
  { id: 'cat_4', name: 'Vitamins & Micronutrients', slug: 'vitamins-micronutrients', productCount: 18 },
  { id: 'cat_5', name: 'Wellness & Joint Support', slug: 'wellness-joint-support', productCount: 11 },
];

const MOCK_BRANDS: Brand[] = [
  { id: 'b_1', name: 'Northstar Peak Labs', slug: 'northstar-peak-labs', productCount: 12, isFeatured: true },
  { id: 'b_2', name: 'Vertex Iso Formulations', slug: 'vertex-iso-formulations', productCount: 8, isFeatured: true },
  { id: 'b_3', name: 'UrbanForge Nutrition', slug: 'urbanforge-nutrition', productCount: 15, isFeatured: false },
];

const MOCK_USER: UserType = {
  id: 'usr_demo',
  email: 'alex.smith@example.co.uk',
  firstName: 'Alex',
  lastName: 'Smith',
  role: 'customer',
  createdAt: new Date().toISOString(),
};

export const HeaderTestDemo: React.FC = () => {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(3);

  const mockCartItems = [
    {
      id: 'cart_item_1',
      productId: 'prod_1',
      productName: 'Northstar Peak Endurance Matrix (300g)',
      variantName: 'Unflavoured Powder',
      unitPricePence: 4495,
      quantity: 1,
      productImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop',
    },
    {
      id: 'cart_item_2',
      productId: 'prod_2',
      productName: 'Vertex Iso-Recovery Whey Isolate (1kg)',
      variantName: 'Belgian Chocolate',
      unitPricePence: 3995,
      quantity: 1,
      productImageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Test Header Instance */}
      <Header
        categories={MOCK_CATEGORIES}
        brands={MOCK_BRANDS}
        selectedCategorySlug={selectedCategory}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          showToast('Category Selected', slug ? `Filtering by ${slug}` : 'Viewing All Catalog', 'info');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => showToast('Wishlist Opened', 'You have 3 saved items.', 'info')}
        onOpenOrderTracking={() => showToast('Order Tracking', 'Enter your Royal Mail tracking code.', 'info')}
        onOpenAccount={() => showToast('Account Portal', `Logged in as ${MOCK_USER.firstName}`, 'success')}
        onOpenAdmin={() => showToast('Admin Portal', 'Switching to management view...', 'info')}
        currentUser={MOCK_USER}
      />

      {/* Main Test Inspection Area */}
      <Container className="py-12">
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Header Component Integration Test</h1>
            <p className="text-xs text-slate-600">
              Test header responsiveness across mobile drawer and desktop mega menu layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 block">Selected Category</span>
              <p className="font-mono text-teal-700 font-bold">{selectedCategory || 'All Catalog'}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 block">Search Query State</span>
              <p className="font-mono text-teal-700 font-bold">{searchQuery || '(Empty)'}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900 block">Cart / Wishlist Counters</span>
              <p className="font-mono text-teal-700 font-bold">Cart: {cartCount} | Wishlist: {wishlistCount}</p>
            </div>
          </div>
        </Section>
      </Container>

      {/* Cart Drawer Test */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={mockCartItems}
        onUpdateQuantity={(id, q) => showToast('Quantity Updated', `Set item quantity to ${q}`)}
        onRemoveItem={(id) => showToast('Item Removed', 'Item removed from basket', 'info')}
        onProceedToCheckout={() => showToast('Checkout Triggered', 'Navigating to payment gateway...', 'success')}
      />
    </div>
  );
};
