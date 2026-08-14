import React, { useState, useEffect } from 'react';
import { Product, ProductVariant, Brand, Category, formatGbp } from '../../types';
import { CatalogueService } from '../../lib/services/catalogue.service';
import { StorageService } from '../../services/storage';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { ProductGallery } from './ProductGallery';
import { ProductVariantSelector } from './ProductVariantSelector';
import { ProductQuantitySelector } from './ProductQuantitySelector';
import { ProductHighlights } from './ProductHighlights';
import { ProductSpecifications } from './ProductSpecifications';
import { ProductReviews } from './ProductReviews';
import { ProductShareAndTrust } from './ProductShareAndTrust';
import { ProductCard, ProductCardData } from '../commerce/ProductCard';
import { PriceDisplay } from '../commerce/PriceDisplay';
import { StockIndicator } from '../commerce/StockIndicator';
import { WishlistButton } from '../commerce/WishlistButton';
import { StockStatus } from '@prisma/client';
import {
  ChevronRight,
  Home,
  Star,
  ShoppingBag,
  ArrowLeft,
  Search,
  Check,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME, sanitizeMetaText } from '../../lib/seo/site';
import { breadcrumbJsonLd, productJsonLd } from '../../lib/seo/structured-data';
import { useToast } from '../feedback/ToastProvider';

interface ProductDetailPageProps {
  slug: string;
  customProducts?: Product[];
  wishlistIds: string[];
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  onNavigate: (path: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  customProducts,
  wishlistIds,
  onAddToCart,
  onToggleWishlist,
  onNavigate,
  onQuickView,
}) => {
  const { showToast } = useToast();

  // 1. Retrieve product using CatalogueService (fallback) — hide if public API reports unpublished
  const localProduct = CatalogueService.getProductBySlug(slug, customProducts);

  // 2. Variant and Quantity Local State
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(() => {
    if (localProduct && localProduct.variants && localProduct.variants.length > 0) {
      const avail = localProduct.variants.find((v) => v.stockQuantity > 0);
      return avail || localProduct.variants[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [searchQuery404, setSearchQuery404] = useState('');
  const [unpublished, setUnpublished] = useState(false);
  const product = unpublished ? undefined : localProduct;

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/v1/catalogue/products/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!cancelled && res.status === 404) setUnpublished(true);
      })
      .catch(() => {
        /* fall back to local catalogue */
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      StorageService.addRecentlyViewedId(product.id);
    }
  }, [product]);

  // 404 Handling if product does not exist or is unpublished
  if (!product) {
    return (
      <Section className="py-20 bg-slate-50 min-h-[70vh] flex items-center">
        <SeoHead
          title={`Product not found | ${SITE_NAME}`}
          description="This product is unavailable."
          robots="noindex,follow"
        />
        <Container size="sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <Info className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900">Product Not Found</h1>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                The product you are looking for may have been updated, unpublished, or moved in our catalogue.
              </p>
            </div>

            {/* Quick Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery404.trim()) {
                  onNavigate(`/shop?q=${encodeURIComponent(searchQuery404.trim())}`);
                }
              }}
              className="flex items-center gap-2 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search sports nutrition & supplements..."
                  value={searchQuery404}
                  onChange={(e) => setSearchQuery404(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-teal-600"
                />
              </div>
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('/shop')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Catalogue</span>
              </button>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // Authoritative Price & Stock Calculations
  const activePriceGbp = selectedVariant?.priceGbp || product.salePriceGbp || product.priceGbp;
  const compareAtPriceGbp = product.salePriceGbp ? product.priceGbp : undefined;
  const activePricePence = Math.round(activePriceGbp * 100);
  const compareAtPricePence = compareAtPriceGbp ? Math.round(compareAtPriceGbp * 100) : undefined;

  const activeStock = selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity;
  const isOutOfStock = activeStock <= 0;
  const isWishlisted = wishlistIds.includes(product.id);

  // Compute stock status enum
  const computedStockStatus: StockStatus =
    activeStock <= 0
      ? StockStatus.OUT_OF_STOCK
      : activeStock <= 5
      ? StockStatus.LOW_STOCK
      : StockStatus.IN_STOCK;

  // Related & Recently Viewed Products
  const relatedProducts = CatalogueService.getRelatedProducts(product, 4, customProducts);
  const recentlyViewedProducts = CatalogueService.getRecentlyViewedProducts(product.id, customProducts);

  const handleAddToCartClick = () => {
    if (isOutOfStock) {
      showToast('Out of Stock', 'This formulation variant is currently unavailable.', 'error');
      return;
    }
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      showToast('Option Required', 'Please select a variant option before adding to basket.', 'error');
      return;
    }

    onAddToCart(product, selectedVariant || undefined, quantity);
  };

  // Convert Product to ProductCardData format helper
  const mapToCardData = (p: Product): ProductCardData => ({
    id: p.id,
    name: p.name,
    brandName: p.brandName,
    sku: p.sku,
    imageUrl: p.images[0],
    pricePence: Math.round((p.salePriceGbp || p.priceGbp) * 100),
    compareAtPricePence: p.salePriceGbp ? Math.round(p.priceGbp * 100) : undefined,
    ratingAvg: p.ratingAvg,
    reviewCount: p.reviewCount,
    stockStatus:
      p.stockQuantity <= 0
        ? StockStatus.OUT_OF_STOCK
        : p.stockQuantity <= 5
        ? StockStatus.LOW_STOCK
        : StockStatus.IN_STOCK,
    availableQuantity: p.stockQuantity,
    isBestseller: p.isBestseller,
    isOnSale: !!p.salePriceGbp,
  });

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <SeoHead
        title={`${product.name} | ${SITE_NAME}`}
        description={sanitizeMetaText(product.shortDescription || product.description, 160)}
        canonical={`${window.location.origin}/product/${product.slug}`}
        ogImage={product.images?.[0]}
        ogType="product"
        jsonLd={[
          productJsonLd({
            name: product.name,
            description: product.shortDescription || product.description,
            images: product.images || [],
            sku: selectedVariant?.sku || product.sku,
            brandName: product.brandName,
            priceGbp: selectedVariant?.priceGbp || product.salePriceGbp || product.priceGbp,
            availability: (selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity) > 0,
            slug: product.slug,
            ratingAvg: product.reviewCount > 0 ? product.ratingAvg : undefined,
            reviewCount: product.reviewCount > 0 ? product.reviewCount : undefined,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: product.categoryName, path: `/category/${product.categorySlug}` },
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ]}
      />
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500 overflow-x-auto pb-1">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-teal-600 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          <button
            onClick={() => onNavigate('/shop')}
            className="hover:text-teal-600 shrink-0 cursor-pointer"
          >
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          {product.categoryName && (
            <>
              <button
                onClick={() => onNavigate(`/category/${product.categorySlug}`)}
                className="hover:text-teal-600 shrink-0 cursor-pointer"
              >
                {product.categoryName}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            </>
          )}

          <span className="text-slate-900 truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Primary 2-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product Highlights Overview */}
            <ProductHighlights product={product} />
          </div>

          {/* Right Column: Purchase Controls Card (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              {/* Header: Brand, Title, Rating, SKU */}
              <div className="space-y-2.5 pb-5 border-b border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigate(`/brand/${product.brandId}`)}
                    className="text-xs font-black uppercase tracking-widest text-teal-600 hover:underline cursor-pointer"
                  >
                    {product.brandName}
                  </button>

                  <StockIndicator status={computedStockStatus} availableQuantity={activeStock} />
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h1>

                {/* Star Rating & Reviews Summary */}
                <div className="flex items-center gap-3 pt-1">
                  {product.ratingAvg > 0 ? (
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-teal-600 cursor-pointer"
                    >
                      <div className="flex text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                      <span className="font-extrabold text-slate-900">{product.ratingAvg.toFixed(1)}</span>
                      <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">No reviews yet</span>
                  )}

                  <span className="text-slate-200">|</span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    SKU: {selectedVariant?.sku || product.sku}
                  </span>
                </div>
              </div>

              {/* Price Display Block */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <PriceDisplay
                    pricePence={activePricePence}
                    compareAtPricePence={compareAtPricePence}
                    size="xl"
                    showSavingsBadge
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Taxes and delivery options calculated at checkout.
                </p>
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  {product.shortDescription}
                </p>
              )}

              {/* Variant Selector (if product has variants) */}
              {product.variants && product.variants.length > 0 && (
                <ProductVariantSelector
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onSelectVariant={(v) => {
                    setSelectedVariant(v);
                    setQuantity(1); // Reset quantity on variant switch
                  }}
                  basePriceGbp={product.priceGbp}
                />
              )}

              {/* Quantity & Actions Row */}
              <div className="space-y-4 pt-2">
                <div className="flex items-end gap-3">
                  <div className="shrink-0">
                    <ProductQuantitySelector
                      quantity={quantity}
                      maxStock={activeStock}
                      onChange={setQuantity}
                      disabled={isOutOfStock}
                    />
                  </div>

                  {/* Add to Basket CTA */}
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleAddToCartClick}
                    className={`flex-1 font-black text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                      isOutOfStock
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-teal-600 hover:bg-teal-700 active:scale-98 text-white shadow-teal-600/20'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isOutOfStock ? 'Out of Stock' : 'Add to Basket'}</span>
                  </button>

                  {/* Wishlist Button */}
                  <div className="shrink-0">
                    <WishlistButton
                      isWishlisted={isWishlisted}
                      onToggle={() => onToggleWishlist(product.id)}
                      size="default"
                    />
                  </div>
                </div>

                {/* Low Stock Warning */}
                {activeStock > 0 && activeStock <= 5 && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Low stock alert: Only {activeStock} unit(s) remaining in UK warehouse.</span>
                  </div>
                )}
              </div>

              {/* Share & Trust Badges */}
              <ProductShareAndTrust productName={product.name} />
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section: Description, Specs, Reviews */}
        <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 px-4 font-black text-xs uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === 'description'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Description & Overview
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 px-4 font-black text-xs uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Technical Specifications
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-4 font-black text-xs uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab 1: Full Description */}
          {activeTab === 'description' && (
            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <h3 className="text-lg font-black text-slate-900">About {product.name}</h3>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed">
                {product.description}
              </div>
            </div>
          )}

          {/* Tab 2: Specifications */}
          {activeTab === 'specs' && <ProductSpecifications product={product} />}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <ProductReviews
              productId={product.id}
              productName={product.name}
              initialRatingAvg={product.ratingAvg}
              initialReviewCount={product.reviewCount}
            />
          )}
        </div>

        {/* Related Products Carousel/Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Complementary Formulations</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Products frequently paired with {product.name}
                </p>
              </div>

              <button
                onClick={() => onNavigate('/shop')}
                className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
              >
                View Full Catalogue →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => {
                const cardData = mapToCardData(p);
                return (
                  <ProductCard
                    key={p.id}
                    product={cardData}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onAddToCart={() => onAddToCart(p)}
                    onQuickView={() => onQuickView && onQuickView(p)}
                    onToggleWishlist={onToggleWishlist}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewedProducts.length > 0 && (
          <div className="mt-16 space-y-6 pb-12">
            <h2 className="text-xl font-black text-slate-900">Recently Viewed</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewedProducts.map((p) => {
                const cardData = mapToCardData(p);
                return (
                  <ProductCard
                    key={p.id}
                    product={cardData}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onAddToCart={() => onAddToCart(p)}
                    onQuickView={() => onQuickView && onQuickView(p)}
                    onToggleWishlist={onToggleWishlist}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Container>

      {/* Mobile Floating Purchase Bar (scrolled past main card) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 z-40 shadow-2xl flex items-center justify-between gap-4">
        <div className="truncate">
          <div className="text-xs font-black text-slate-900 truncate">{product.name}</div>
          <div className="text-xs font-extrabold text-teal-700">
            {formatGbp(activePriceGbp, false)}
          </div>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCartClick}
          className={`font-black text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
            isOutOfStock
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isOutOfStock ? 'Out of Stock' : 'Add to Basket'}</span>
        </button>
      </div>
    </div>
  );
};
