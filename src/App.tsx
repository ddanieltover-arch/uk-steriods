import React, { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { ToastProvider, useToast } from './components/feedback/ToastProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductQuickViewModal } from './components/storefront/ProductQuickViewModal';
import { Homepage } from './components/storefront/Homepage';
import { ShopPage } from './components/storefront/ShopPage';
import { ManufacturersPage } from './components/storefront/ManufacturersPage';
import { ProductDetailPage } from './components/pdp/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { AuthModal } from './components/account/AuthModal';
import { StorageService } from './services/storage';
import { Category, Brand, Product, CartItem, User as UserType, FilterState, Order } from './types';
import { ProductCardData } from './components/commerce/ProductCard';
import { SeoHead } from './components/seo/SeoHead';
import { SITE_NAME } from './lib/seo/site';
import { shouldNoIndexPath } from './lib/seo/site';
import { apiFetch } from './lib/api/client';
import { isResourcePath } from './data/resources';
import { trackAddToCart, trackPageView } from './lib/analytics/gtag';

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
const BlogIndexPage = lazy(() =>
  import('./components/blog/BlogIndexPage').then((m) => ({ default: m.BlogIndexPage }))
);
const BlogArticlePage = lazy(() =>
  import('./components/blog/BlogArticlePage').then((m) => ({ default: m.BlogArticlePage }))
);
const CustomerAuthPage = lazy(() =>
  import('./components/account/CustomerAuthPage').then((m) => ({ default: m.CustomerAuthPage }))
);
const ResourceRouter = lazy(() =>
  import('./components/resources/ResourceRouter').then((m) => ({ default: m.ResourceRouter }))
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
  const [currentPath, setCurrentPath] = useState<string>(
    () => `${window.location.pathname}${window.location.search}`
  );

  // Sync URL history state
  useEffect(() => {
    const handlePopState = () => setCurrentPath(`${window.location.pathname}${window.location.search}`);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Legacy /brands → /manufacturers; /category/pct-health → /category/pct
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/brands' || path.startsWith('/brands/')) {
      window.history.replaceState({}, '', '/manufacturers');
      setCurrentPath('/manufacturers');
      return;
    }
    if (path === '/category/pct-health' || path.startsWith('/category/pct-health/')) {
      window.history.replaceState({}, '', '/category/pct');
      setCurrentPath('/category/pct');
    }
  }, [currentPath]);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(`${window.location.pathname}${window.location.search}`);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPath]);

  // SPA page views for GA4 (initial config already sends the first hit).
  useEffect(() => {
    trackPageView(currentPath);
  }, [currentPath]);

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
            return;
          }
        }
        setCurrentUser(null);
        StorageService.setCurrentUser(null);
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

  const addProductLine = (
    current: CartItem[],
    p: Product,
    variant?: any,
    qty: number = 1
  ): CartItem[] => {
    const unitPrice = variant?.priceGbp || p.salePriceGbp || p.priceGbp;
    const existingIndex = current.findIndex(
      (i) => i.productId === p.id && (!variant || i.variantName === variant.name)
    );

    if (existingIndex >= 0) {
      return current.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + qty } : item
      );
    }

    return [
      ...current,
      {
        id: `c_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        productId: p.id,
        productName: p.name,
        variantName: variant?.name,
        unitPricePence: Math.round(unitPrice * 100),
        quantity: qty,
        productImageUrl: p.images[0],
        product: p,
      },
    ];
  };

  const handleAddToCart = (productData: ProductCardData) => {
    const fullProduct = products.find((p) => p.id === productData.id);
    if (!fullProduct) return;
    setCartItems((prev) => {
      const next = addProductLine(prev, fullProduct, undefined, 1);
      StorageService.saveCart(next);
      return next;
    });
    const unit = fullProduct.salePriceGbp || fullProduct.priceGbp || 0;
    trackAddToCart({
      item_id: fullProduct.sku || fullProduct.id,
      item_name: fullProduct.name,
      item_brand: fullProduct.brandName,
      item_category: fullProduct.categoryName,
      price: unit,
      quantity: 1,
    });
    showToast('Added to Basket', `${productData.name} added to cart!`, 'success');
  };

  const handleAddFullProductToCart = (
    p: Product,
    variant?: any,
    qty: number = 1,
    silent = false
  ) => {
    setCartItems((prev) => {
      const next = addProductLine(prev, p, variant, qty);
      StorageService.saveCart(next);
      return next;
    });
    const unit = variant?.priceGbp || p.salePriceGbp || p.priceGbp || 0;
    trackAddToCart({
      item_id: variant?.sku || p.sku || p.id,
      item_name: p.name,
      item_brand: p.brandName,
      item_category: p.categoryName,
      item_variant: variant?.name,
      price: unit,
      quantity: qty,
    });
    if (!silent) {
      showToast('Added to Basket', `${p.name} added to cart!`, 'success');
    }
  };

  const handleQuickBuy = (p: Product) => {
    handleAddFullProductToCart(p, undefined, 1, true);
    navigateTo('/checkout');
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
          onUserChanged={(u) => {
            setCurrentUser(u);
            StorageService.setCurrentUser(u);
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
    const isLoginRoute = currentPath === '/login' || currentPath === '/account/login';
    const isRegisterRoute = currentPath === '/register' || currentPath === '/account/register';
    const isBlogIndexRoute = currentPath === '/blog' || currentPath.startsWith('/blog?');
    const isBlogArticleRoute = currentPath.startsWith('/blog/') && !currentPath.startsWith('/blog?');
    const isResourceRoute = isResourcePath(currentPath);
    const blogSlugFromPath = isBlogArticleRoute ? currentPath.replace('/blog/', '').split('?')[0] : undefined;

    // Extract params
    const isCategoryRoute = currentPath.startsWith('/category/');
    const isBrandRoute = currentPath.startsWith('/brand/');
    const isManufacturersRoute =
      currentPath === '/manufacturers' ||
      currentPath.startsWith('/manufacturers?') ||
      currentPath === '/brands' ||
      currentPath.startsWith('/brands?');
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
      <div className="bg-slate-50 min-h-screen flex flex-col font-sans pb-24 lg:pb-0">
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
          onGoHome={() => navigateTo('/')}
          currentPath={currentPath}
          searchQuery={filters.searchQuery}
          onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
          onSearchSubmit={(q) => {
            const term = q.trim();
            navigateTo(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop');
          }}
          cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          cartTotalPence={cartItems.reduce((sum, i) => {
            const unit =
              i.unitPricePence ??
              Math.round((i.product?.salePriceGbp ?? i.product?.priceGbp ?? 0) * 100);
            return sum + unit * i.quantity;
          }, 0)}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => navigateTo('/wishlist')}
          onOpenOrderTracking={() => navigateTo('/track-order')}
          onOpenAccount={() => {
            if (currentUser) navigateTo('/account');
            else navigateTo('/login');
          }}
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
        ) : isLoginRoute || isRegisterRoute ? (
          <CustomerAuthPage
            mode={isRegisterRoute ? 'register' : 'login'}
            currentUser={currentUser}
            onAuthenticated={(u) => {
              setCurrentUser(u);
              StorageService.setCurrentUser(u);
            }}
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
        ) : isResourceRoute ? (
          <ResourceRouter path={currentPath.split('?')[0]} onNavigate={(path) => navigateTo(path)} />
        ) : isBlogIndexRoute ? (
          <BlogIndexPage path={currentPath} onNavigate={(path) => navigateTo(path)} />
        ) : isBlogArticleRoute && blogSlugFromPath ? (
          <BlogArticlePage slug={blogSlugFromPath} onNavigate={(path) => navigateTo(path)} />
        ) : isManufacturersRoute ? (
          <ManufacturersPage
            brands={brands}
            onSelectBrand={(brandSlug) => navigateTo(`/brand/${brandSlug}`)}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isProductRoute && productSlugFromPath ? (
          <ProductDetailPage
            slug={productSlugFromPath}
            customProducts={products}
            wishlistIds={wishlistIds}
            onAddToCart={(p, v, q, silent) => handleAddFullProductToCart(p, v, q, silent)}
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
            onQuickBuy={handleQuickBuy}
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
            onNavigate={(path) => navigateTo(path)}
            onAddToCart={(p) => handleAddFullProductToCart(p)}
            onQuickBuy={handleQuickBuy}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* Global Shell Footer */}
        <Footer />
        <WhatsAppFloat />

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
          onNavigate={(path) => navigateTo(path)}
        />
      </div>
    );
  };

  return (
    <div>
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
