import React, { useState, useEffect } from 'react';
import { Product, ProductVariant, formatGbp } from '../../types';
import { CatalogueService } from '../../lib/services/catalogue.service';
import { StorageService } from '../../services/storage';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { ProductGallery } from './ProductGallery';
import { ProductVariantSelector } from './ProductVariantSelector';
import { ProductQuantitySelector } from './ProductQuantitySelector';
import { ProductSpecifications } from './ProductSpecifications';
import { ProductShareAndTrust } from './ProductShareAndTrust';
import { ProductPerformanceProfile } from './ProductPerformanceProfile';
import { ProductPdpAccordion } from './ProductPdpAccordion';
import { ProductStackDeal } from './ProductStackDeal';
import { ProductFaq } from './ProductFaq';
import { ProductCycleCompanions } from './ProductCycleCompanions';
import { ProductCard, ProductCardData } from '../commerce/ProductCard';
import { PriceDisplay } from '../commerce/PriceDisplay';
import { CryptoPriceBadge } from '../commerce/CryptoPriceBadge';
import { StockIndicator } from '../commerce/StockIndicator';
import { WishlistButton } from '../commerce/WishlistButton';
import {
  displayProductTitle,
  dosingCopyFor,
  faqsFor,
  findCompanions,
  inferGoalLabel,
  inferSizeChips,
  inferUsageLabel,
  performanceScoresFor,
  stackCandidates,
} from '../../lib/pdp/pdp-content';
import { normalizeProductText } from '../../lib/text/product-text';
import { StockStatus } from '../../types';
import { trackViewItem } from '../../lib/analytics/gtag';
import {
  ChevronRight,
  Star,
  ShoppingBag,
  ArrowLeft,
  Search,
  AlertTriangle,
  Info,
  Zap,
} from 'lucide-react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME, sanitizeMetaText } from '../../lib/seo/site';
import { breadcrumbJsonLd, productJsonLd } from '../../lib/seo/structured-data';
import { useToast } from '../feedback/ToastProvider';

interface ProductDetailPageProps {
  slug: string;
  customProducts?: Product[];
  wishlistIds: string[];
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number, silent?: boolean) => void;
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

  useEffect(() => {
    if (!product) return;
    const price = selectedVariant?.priceGbp || product.salePriceGbp || product.priceGbp || 0;
    trackViewItem({
      item_id: selectedVariant?.sku || product.sku || product.id,
      item_name: product.name,
      item_brand: product.brandName,
      item_category: product.categoryName,
      item_variant: selectedVariant?.name,
      price,
      quantity: 1,
    });
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    if (slug === product.slug) return;
    const nextPath = `/product/${product.slug}`;
    window.history.replaceState({}, '', nextPath);
  }, [product, slug]);

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

  const catalogue = customProducts || StorageService.getProducts();
  const title = displayProductTitle(product);
  const brandPath = `/brand/${product.brandSlug || product.brandId}`;
  const seoTitle = product.seoTitle || `${product.name} | ${SITE_NAME}`;
  const seoDescription = sanitizeMetaText(
    product.seoDescription || product.shortDescription || product.description,
    160
  );
  const sizeChips = inferSizeChips(product);
  const usageLabel = inferUsageLabel(product);
  const goalLabel = inferGoalLabel(product);
  const companions = findCompanions(product, catalogue);
  const stackItems = stackCandidates(product, catalogue);
  const moreFromLab = catalogue
    .filter((p) => p.id !== product.id && p.isPublished !== false && p.brandId === product.brandId)
    .slice(0, 8);

  const activePriceGbp = selectedVariant?.priceGbp || product.salePriceGbp || product.priceGbp;
  const compareAtPriceGbp = product.salePriceGbp ? product.priceGbp : undefined;
  const activePricePence = Math.round(activePriceGbp * 100);
  const compareAtPricePence = compareAtPriceGbp ? Math.round(compareAtPriceGbp * 100) : undefined;
  const activeStock = selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity;
  const isOutOfStock = activeStock <= 0;
  const isWishlisted = wishlistIds.includes(product.id);

  const computedStockStatus: StockStatus =
    activeStock <= 0
      ? StockStatus.OUT_OF_STOCK
      : activeStock <= 5
      ? StockStatus.LOW_STOCK
      : StockStatus.IN_STOCK;

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

  const handleQuickBuyClick = () => {
    if (isOutOfStock) {
      showToast('Out of Stock', 'This formulation variant is currently unavailable.', 'error');
      return;
    }
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      showToast('Option Required', 'Please select a variant option before buying.', 'error');
      return;
    }

    onAddToCart(product, selectedVariant || undefined, quantity, true);
    onNavigate('/checkout');
  };

  // Convert Product to ProductCardData format helper
  const mapToCardData = (p: Product): ProductCardData => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
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
        title={seoTitle}
        description={seoDescription}
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
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500 overflow-x-auto pb-1">
          <button onClick={() => onNavigate('/shop')} className="hover:text-teal-600 shrink-0 cursor-pointer">
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <button
            onClick={() => onNavigate(brandPath)}
            className="hover:text-teal-600 shrink-0 cursor-pointer"
          >
            {product.brandName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-slate-900 truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              images={product.images}
              productName={title}
              labTested={Boolean(product.purityScore)}
              sizeChips={sizeChips}
              inStock={!isOutOfStock}
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <button
              onClick={() => onNavigate(brandPath)}
              className="text-xs font-black uppercase tracking-widest text-teal-600 hover:underline cursor-pointer"
            >
              {product.brandName}
            </button>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{title}</h1>
              {sizeChips.length > 0 && (
                <p className="text-sm font-bold text-slate-500">{sizeChips.join(' · ')}</p>
              )}
              {product.shortDescription && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {normalizeProductText(product.shortDescription)}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <StockIndicator status={computedStockStatus} availableQuantity={activeStock} />
              {product.ratingAvg > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Star className="w-4 h-4 fill-current text-amber-400" />
                  <span className="font-extrabold text-slate-900">{product.ratingAvg.toFixed(1)}</span>
                  <span className="text-slate-400">({product.reviewCount})</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <PriceDisplay
                pricePence={activePricePence}
                compareAtPricePence={compareAtPricePence}
                size="xl"
                showSavingsBadge
              />
              <CryptoPriceBadge pricePence={activePricePence} />
            </div>

            {product.variants && product.variants.length > 0 && (
              <ProductVariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={(v) => {
                  setSelectedVariant(v);
                  setQuantity(1);
                }}
                basePriceGbp={product.priceGbp}
              />
            )}

            <div className="flex items-end gap-3">
              <ProductQuantitySelector
                quantity={quantity}
                maxStock={activeStock}
                onChange={setQuantity}
                disabled={isOutOfStock}
              />
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleQuickBuyClick}
                className={`shrink-0 h-[3.25rem] w-[3.25rem] rounded-2xl border flex items-center justify-center transition-colors cursor-pointer ${
                  isOutOfStock
                    ? 'border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50'
                }`}
                title="Quick Buy"
                aria-label="Quick buy — add to bag and checkout"
              >
                <Zap className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCartClick}
                className={`flex-1 font-black text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                  isOutOfStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isOutOfStock ? 'Out of Stock' : `Add to bag · ${formatGbp(activePriceGbp * quantity, false)}`}
                </span>
              </button>
              <WishlistButton
                isWishlisted={isWishlisted}
                onToggle={() => onToggleWishlist(product.id)}
                size="default"
              />
            </div>

            {activeStock > 0 && activeStock <= 5 && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Low stock: only {activeStock} unit(s) remaining.</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">{goalLabel}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">
                Usage {usageLabel}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-mono font-bold text-slate-500">
                SKU {selectedVariant?.sku || product.sku}
              </span>
            </div>

            <ProductPerformanceProfile scores={performanceScoresFor(product)} />

            <ProductPdpAccordion
              sections={[
                {
                  id: 'description',
                  title: 'Description',
                  content: (
                    <div className="whitespace-pre-line space-y-3 text-sm text-slate-600 leading-relaxed">
                      <p>{normalizeProductText(product.description || product.shortDescription)}</p>
                    </div>
                  ),
                },
                {
                  id: 'dosing',
                  title: 'Dosing',
                  content: <p>{dosingCopyFor(product)}</p>,
                },
                {
                  id: 'shipping',
                  title: 'Shipping & Returns',
                  content: (
                    <p>
                      UK dispatch on Royal Mail Tracked 24. Orders typically land in 1–2 working days. Packaging is
                      plain with a neutral sender name. Unused, sealed items can be returned within 30 days.
                    </p>
                  ),
                },
                {
                  id: 'specs',
                  title: 'Specifications',
                  content: <ProductSpecifications product={product} />,
                },
              ]}
            />

            <ProductCycleCompanions
              onNavigate={onNavigate}
              slots={[
                {
                  title: 'Must take with this cycle',
                  body: 'Support products commonly paired to manage on-cycle oestrogen and lipid stress.',
                  product: companions.mustTake,
                },
                {
                  title: 'Often added to this cycle',
                  body: 'Frequently stacked from the same category or brand.',
                  product: companions.oftenAdded,
                },
                {
                  title: 'Post cycle therapy (required)',
                  body: 'PCT listings from the catalogue to support recovery after a cycle. Catalogue information only.',
                  product: companions.pct,
                },
              ]}
            />

            <ProductShareAndTrust productName={product.name} />
          </div>
        </div>

        <div className="mt-12 space-y-12 pb-24 lg:pb-12">
          <ProductStackDeal
            product={product}
            companions={stackItems}
            unitPriceGbp={activePriceGbp}
            onAddBundle={(items) => {
              items.forEach((item) => {
                const variant =
                  item.product.id === product.id ? selectedVariant || undefined : undefined;
                onAddToCart(item.product, variant, item.quantity, true);
              });
              showToast('Stack added', `${items.length} item(s) added to bag.`, 'success');
            }}
          />

          {moreFromLab.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">More from this lab</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Curated picks from {product.brandName}.</p>
                </div>
                <button
                  onClick={() => onNavigate(brandPath)}
                  className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                >
                  See all
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {moreFromLab.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={mapToCardData(p)}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onAddToCart={() => onAddToCart(p)}
                    onQuickView={() => onQuickView && onQuickView(p)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            </div>
          )}

          <ProductFaq items={faqsFor(product)} />

          {relatedProducts.length > 0 && moreFromLab.length === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900">You may also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={mapToCardData(p)}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onAddToCart={() => onAddToCart(p)}
                    onQuickView={() => onQuickView && onQuickView(p)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            </div>
          )}

          {recentlyViewedProducts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900">Recently Viewed</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentlyViewedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={mapToCardData(p)}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onAddToCart={() => onAddToCart(p)}
                    onQuickView={() => onQuickView && onQuickView(p)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Mobile Floating Purchase Bar (scrolled past main card) */}
      <div className="lg:hidden fixed bottom-20 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 z-40 shadow-2xl flex items-center justify-between gap-4">
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
