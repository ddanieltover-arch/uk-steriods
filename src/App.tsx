import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ToastProvider, useToast } from './components/feedback/ToastProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductQuickViewModal } from './components/storefront/ProductQuickViewModal';
import { Homepage } from './components/storefront/Homepage';
import { ShopPage } from './components/storefront/ShopPage';
import { ProductDetailPage } from './components/pdp/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { AuthModal } from './components/account/AuthModal';
import { StorageService } from './services/storage';
import { Category, Brand, Product, CartItem, User as UserType, FilterState, Order } from './types';
import { ProductCardData } from './components/commerce/ProductCard';
import { ShoppingBag, Grid, Settings, User as UserIcon, Search } from 'lucide-react';
import { SeoHead } from './components/seo/SeoHead';
import { SITE_NAME } from './lib/seo/site';
import { shouldNoIndexPath } from './lib/seo/site';
import { apiFetch } from './lib/api/client';

const DesignSystemDemo = lazy(() =>
  import('./components/demo/DesignSystemDemo').then((m) => ({ default: m.DesignSystemDemo }))
);
const HeaderTestDemo = lazy(() =>
  import('./components/demo/HeaderTestDemo').then((m) => ({ default: m.HeaderTestDemo }))
);
const ProductCardTestDemo = lazy(() =>
  import('./components/demo/ProductCardTestDemo').then((m) => ({ default: m.ProductCardTestDemo }))
);
const CartTestDemo = lazy(() =>
  import('./components/demo/CartTestDemo').then((m) => ({ default: m.CartTestDemo }))
);
const AdminDashboard = lazy(() =>
  import('./components/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const CheckoutPage = lazy(() =>
  import('./components/checkout/CheckoutPage').then((m) => ({ default: m.CheckoutPage }))
);
const OrderConfirmationPage = lazy(() =>
  import('./components/checkout/OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage }))
);
const AccountDashboardPage = lazy(() =>
  import('./components/account/AccountDashboardPage').then((m) => ({ default: m.AccountDashboardPage }))
);
const SavedAddressesPage = lazy(() =>
  import('./components/account/SavedAddressesPage').then((m) => ({ default: m.SavedAddressesPage }))
);
const OrderHistoryPage = lazy(() =>
  import('./components/account/OrderHistoryPage').then((m) => ({ default: m.OrderHistoryPage }))
);
const OrderDetailPage = lazy(() =>
  import('./components/account/OrderDetailPage').then((m) => ({ default: m.OrderDetailPage }))
);
const GuestOrderTrackingPage = lazy(() =>
  import('./components/account/GuestOrderTrackingPage').then((m) => ({ default: m.GuestOrderTrackingPage }))
);
const WishlistPage = lazy(() =>
  import('./components/account/WishlistPage').then((m) => ({ default: m.WishlistPage }))
);
const ResetPasswordPage = lazy(() =>
  import('./components/account/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage }))
);

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-xs font-bold uppercase tracking-wider text-slate-400">
      Loading…
    </div>
  );
}

function MainAppContent() {
  const { showToast } = useToast();
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  // Sync URL history state
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Persistent State from StorageService
  const [categories, setCategories] = useState<Category[]>(() => StorageService.getCategories());
  const [brands, setBrands] = useState<Brand[]>(() => StorageService.getBrands());
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => StorageService.getCurrentUser());

  // Check authenticated session with backend API on mount
  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        const res = await apiFetch('/api/v1/auth/me', {
          headers: {},
});
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setCurrentUser(data.user);
            StorageService.setCurrentUser(data.user);
          }
        }
      } catch (err) {
        console.error('Session verification error:', err);
      }
    };
    checkAuthSession();
  }, []);

  // Storefront Filter State
  const [filters, setFilters] = useState<FilterState>({
    categorySlug: '',
    brandIds: [],
    minPrice: 0,
    maxPrice: 200,
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: 'featured',
    searchQuery: '',
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => StorageService.getWishlist());
  const [cartItems, setCartItems] = useState<CartItem[]>(() => StorageService.getCart());

  // Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync cart and wishlist changes to StorageService
  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    StorageService.saveCart(newCart);
  };

  const handleAddToCart = (productData: ProductCardData) => {
    const fullProduct = products.find((p) => p.id === productData.id);
    const existingIndex = cartItems.findIndex((i) => i.productId === productData.id);

    if (existingIndex >= 0) {
      const updated = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCart(updated);
    } else {
      const newItem: CartItem = {
        id: `c_${Date.now()}`,
        productId: productData.id,
        productName: productData.name,
        unitPricePence: productData.pricePence,
        quantity: 1,
        productImageUrl: productData.imageUrl,
        product: fullProduct,
      };
      updateCart([...cartItems, newItem]);
    }
    showToast('Added to Basket', `${productData.name} added to cart!`, 'success');
  };

  const handleAddFullProductToCart = (p: Product, variant?: any, qty: number = 1) => {
    const unitPrice = variant?.priceGbp || p.salePriceGbp || p.priceGbp;
    const existingIndex = cartItems.findIndex(
      (i) => i.productId === p.id && (!variant || i.variantName === variant.name)
    );

    if (existingIndex >= 0) {
      const updated = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + qty } : item
      );
      updateCart(updated);
    } else {
      const newItem: CartItem = {
        id: `c_${Date.now()}`,
        productId: p.id,
        productName: p.name,
        variantName: variant?.name,
        unitPricePence: Math.round(unitPrice * 100),
        quantity: qty,
        productImageUrl: p.images[0],
        product: p,
      };
      updateCart([...cartItems, newItem]);
    }
    showToast('Added to Basket', `${p.name} added to cart!`, 'success');
  };

  const handleToggleWishlist = (productId: string) => {
    const updated = StorageService.toggleWishlist(productId);
    setWishlistIds(updated);
    if (updated.includes(productId)) {
      showToast('Wishlist Updated', 'Item saved to your wishlist!', 'success');
    } else {
      showToast('Wishlist Updated', 'Item removed from wishlist', 'info');
    }
  };

  const handleOrderCompleted = (newOrder: Order) => {
    updateCart([]);
    showToast('Order Received', `Order ${newOrder.orderNumber} confirmed!`, 'success');
  };

  // Route Dispatcher
  const renderRoute = () => {
    if (currentPath.startsWith('/admin')) {
      return (
        <Suspense fallback={<RouteFallback />}>
          <AdminDashboard
          currentUser={currentUser}
          currentPath={currentPath}
          onNavigate={(path) => navigateTo(path)}
          onBackToStorefront={() => {
            setProducts(StorageService.getProducts());
            setCategories(StorageService.getCategories());
            setBrands(StorageService.getBrands());
            navigateTo('/');
          }}
        />
        </Suspense>
      );
    }
    if (currentPath === '/design-system') {
      return <DesignSystemDemo />;
    }
    if (currentPath === '/header-test') {
      return <HeaderTestDemo />;
    }
    if (currentPath === '/product-card-test') {
      return <ProductCardTestDemo />;
    }
    if (currentPath === '/cart-test') {
      return <CartTestDemo />;
    }

    // Explicit Route Checks
    const isCartRoute = currentPath === '/cart';
    const isWishlistRoute = currentPath === '/wishlist' || currentPath === '/account/wishlist';
    const isCheckoutRoute = currentPath === '/checkout';
    const isOrderSuccessRoute = currentPath.startsWith('/checkout/success/');

    // Phase 09 Account Routes
    const isAccountDashboardRoute = currentPath === '/account';
    const isAccountOrdersRoute = currentPath === '/account/orders';
    const isAccountOrderDetailRoute = currentPath.startsWith('/account/orders/');
    const isAccountAddressesRoute = currentPath === '/account/addresses';
    const isGuestTrackRoute = currentPath.startsWith('/track-order') || currentPath.startsWith('/orders/track');
    const isResetPasswordRoute = currentPath === '/reset-password';

    // Extract params
    const isCategoryRoute = currentPath.startsWith('/category/');
    const isBrandRoute = currentPath.startsWith('/brand/');
    const isProductRoute = currentPath.startsWith('/product/');
    const isShopRoute = currentPath === '/shop' || currentPath.startsWith('/shop?');
    const categorySlugFromPath = isCategoryRoute ? currentPath.replace('/category/', '') : undefined;
    const brandSlugFromPath = isBrandRoute ? currentPath.replace('/brand/', '') : undefined;
    const productSlugFromPath = isProductRoute ? currentPath.replace('/product/', '').split('?')[0] : undefined;
    
    const orderNumberFromPath = isOrderSuccessRoute
      ? currentPath.replace('/checkout/success/', '').split('?')[0]
      : isAccountOrderDetailRoute
      ? currentPath.replace('/account/orders/', '').split('?')[0]
      : undefined;

    const trackingTokenFromPath = isOrderSuccessRoute ? new URLSearchParams(window.location.search).get('token') || undefined : undefined;

    const isCatalogView = isShopRoute || isCategoryRoute || isBrandRoute;

    // Default Main Storefront Shell
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
        {/* Global Shell Header */}
        <Header
          categories={categories}
          brands={brands}
          selectedCategorySlug={categorySlugFromPath || filters.categorySlug}
          onSelectCategory={(slug) => {
            if (slug) navigateTo(`/category/${slug}`);
            else navigateTo('/shop');
          }}
          onSelectBrand={(brandSlug) => {
            if (brandSlug) navigateTo(`/brand/${brandSlug}`);
            else navigateTo('/shop');
          }}
          searchQuery={filters.searchQuery}
          onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
          onSearchSubmit={(q) => {
            const term = q.trim();
            navigateTo(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop');
          }}
          cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => navigateTo('/wishlist')}
          onOpenOrderTracking={() => navigateTo('/track-order')}
          onOpenAccount={() => {
            if (currentUser) navigateTo('/account');
            else setIsAuthModalOpen(true);
          }}
          onOpenAdmin={() => navigateTo('/admin')}
          currentUser={currentUser}
        />

        {/* Storefront Page Content */}
        {isCheckoutRoute ? (
          <CheckoutPage
            cartItems={cartItems}
            currentUser={currentUser}
            onClearCart={() => updateCart([])}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isOrderSuccessRoute && orderNumberFromPath ? (
          <OrderConfirmationPage
            orderNumber={orderNumberFromPath}
            trackingToken={trackingTokenFromPath}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isAccountDashboardRoute ? (
          <AccountDashboardPage
            currentUser={currentUser}
            onUserChanged={(u) => {
              setCurrentUser(u);
              StorageService.setCurrentUser(u);
            }}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isAccountOrdersRoute ? (
          <OrderHistoryPage
            currentUser={currentUser}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isAccountOrderDetailRoute && orderNumberFromPath ? (
          <OrderDetailPage
            orderNumber={orderNumberFromPath}
            currentUser={currentUser}
            onNavigate={(path) => navigateTo(path)}
            onAddToCart={(item) => handleAddToCart(item)}
          />
        ) : isAccountAddressesRoute ? (
          <SavedAddressesPage
            currentUser={currentUser}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isGuestTrackRoute ? (
          <GuestOrderTrackingPage
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isResetPasswordRoute ? (
          <ResetPasswordPage onNavigate={(path) => navigateTo(path)} />
        ) : isCartRoute ? (
          <CartPage
            items={cartItems}
            customProducts={products}
            wishlistIds={wishlistIds}
            onUpdateQuantity={(id, q) => {
              const updated = cartItems.map((item) => (item.id === id ? { ...item, quantity: q } : item));
              updateCart(updated);
            }}
            onRemoveItem={(id) => {
              const updated = cartItems.filter((i) => i.id !== id);
              updateCart(updated);
              showToast('Item Removed', 'Basket updated', 'info');
            }}
            onToggleWishlist={handleToggleWishlist}
            onProceedToCheckout={() => navigateTo('/checkout')}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isWishlistRoute ? (
          <WishlistPage
            wishlistIds={wishlistIds}
            products={products}
            currentUser={currentUser}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p, q, v) => handleAddFullProductToCart(p, v, q)}
            onNavigate={(path) => navigateTo(path)}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
          />
        ) : isProductRoute && productSlugFromPath ? (
          <ProductDetailPage
            slug={productSlugFromPath}
            customProducts={products}
            wishlistIds={wishlistIds}
            onAddToCart={(p, v, q) => handleAddFullProductToCart(p, v, q)}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={(path) => navigateTo(path)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ) : isCatalogView ? (
          <ShopPage
            categories={categories}
            brands={brands}
            products={products}
            wishlist={wishlistIds}
            initialCategorySlug={categorySlugFromPath}
            initialBrandSlug={brandSlugFromPath}
            onAddToCart={(p, v, q) => handleAddFullProductToCart(p, v, q)}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : (
          <Homepage
            categories={categories}
            brands={brands}
            products={products}
            wishlist={wishlistIds}
            onSelectCategory={(slug) => {
              if (slug) navigateTo(`/category/${slug}`);
              else navigateTo('/shop');
            }}
            onSelectBrand={(brandSlug) => {
              if (brandSlug) navigateTo(`/brand/${brandSlug}`);
              else navigateTo('/shop');
            }}
            onAddToCart={(p) => handleAddFullProductToCart(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* Global Shell Footer */}
        <Footer />

        {/* Global Cart Drawer Panel */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={(id, q) => {
            const updated = cartItems.map((item) => (item.id === id ? { ...item, quantity: q } : item));
            updateCart(updated);
          }}
          onRemoveItem={(id) => {
            const updated = cartItems.filter((i) => i.id !== id);
            updateCart(updated);
            showToast('Item Removed', 'Basket updated', 'info');
          }}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            navigateTo('/checkout');
          }}
          onViewFullCart={() => navigateTo('/cart')}
        />

        {/* Product Quick View Modal */}
        <ProductQuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p, v, q) => handleAddFullProductToCart(p, v, q)}
          isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
          onToggleWishlist={(id) => handleToggleWishlist(id)}
        />

        {/* Auth Modal for Sign In / Registration */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          currentUser={currentUser}
          onUserChanged={(u) => {
            setCurrentUser(u);
            StorageService.setCurrentUser(u);
          }}
          onNavigateToAccount={() => navigateTo('/account')}
        />
      </div>
    );
  };

  return (
    <div>
      {/* Top Navigation Bar Control */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto whitespace-nowrap scrollbar-none text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-extrabold uppercase tracking-wider text-[11px] text-teal-400">
              UK Performance Storefront:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('/')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currentPath === '/' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              / Home
            </button>

            <button
              onClick={() => navigateTo('/shop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currentPath.startsWith('/shop') || currentPath.startsWith('/category/') || currentPath.startsWith('/brand/')
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>/shop Catalog</span>
            </button>

            <button
              onClick={() => {
                if (currentUser) navigateTo('/account');
                else setIsAuthModalOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currentPath.startsWith('/account') ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>{currentUser ? `/account (${currentUser.firstName})` : '/account (Login)'}</span>
            </button>

            <button
              onClick={() => navigateTo('/account/orders')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currentPath === '/account/orders' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>/account/orders</span>
            </button>

            <button
              onClick={() => navigateTo('/track-order')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currentPath.startsWith('/track-order') ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>/track-order</span>
            </button>

            <button
              onClick={() => navigateTo('/cart')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currentPath === '/cart' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>/cart</span>
            </button>

            <button
              onClick={() => navigateTo('/admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currentPath === '/admin' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>/admin</span>
            </button>
          </div>
        </div>
      </div>

      {shouldNoIndexPath(currentPath) && (
        <SeoHead
          title={`${SITE_NAME}`}
          description="This page is not indexed."
          robots="noindex,nofollow"
        />
      )}
      <Suspense fallback={<RouteFallback />}>{renderRoute()}</Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainAppContent />
    </ToastProvider>
  );
}
