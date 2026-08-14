import React from 'react';
import { Star, Eye } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { PriceDisplay } from './PriceDisplay';
import { ProductBadge } from './ProductBadge';
import { StockIndicator } from './StockIndicator';
import { WishlistButton } from './WishlistButton';
import { AddToCartButton } from './AddToCartButton';
import { CryptoPriceBadge } from './CryptoPriceBadge';
import { StockStatus } from '../../types';
import { cn } from '../../lib/utils';

export interface ProductCardData {
  id: string;
  name: string;
  slug?: string;
  brandName?: string;
  sku?: string;
  imageUrl?: string | null;
  pricePence: number;
  compareAtPricePence?: number;
  ratingAvg?: number;
  reviewCount?: number;
  stockStatus: StockStatus;
  availableQuantity?: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
}

interface ProductCardProps {
  product: ProductCardData;
  isWishlisted?: boolean;
  onAddToCart?: (product: ProductCardData) => void;
  onQuickView?: (product: ProductCardData) => void;
  onToggleWishlist?: (productId: string) => void;
  onProductClick?: (product: ProductCardData) => void;
  viewMode?: 'grid' | 'list';
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted = false,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  onProductClick,
  viewMode = 'grid',
  className,
}) => {
  const handleProductNavigate = () => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      const targetSlug = product.slug || product.id;
      window.history.pushState({}, '', `/product/${targetSlug}`);
      window.dispatchEvent(new Event('popstate'));
    }
  };
  const isOutOfStock =
    product.stockStatus === StockStatus.OUT_OF_STOCK ||
    (product.availableQuantity !== undefined && product.availableQuantity <= 0);

  const isOnSale =
    product.isOnSale ||
    (product.compareAtPricePence !== undefined && product.compareAtPricePence > product.pricePence);

  if (viewMode === 'list') {
    return (
      <div
        className={cn(
          'group relative flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:border-slate-300 hover:shadow-md',
          className
        )}
      >
        {/* Thumbnail Image */}
        <div
          onClick={handleProductNavigate}
          className="relative w-full sm:w-48 shrink-0 overflow-hidden rounded-xl cursor-pointer"
        >
          <ProductImage
            src={product.imageUrl}
            alt={product.name}
            aspectRatio="square"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {isOnSale && <ProductBadge variant="sale" />}
            {product.isBestseller && <ProductBadge variant="bestseller" />}
          </div>

          {/* Wishlist Button */}
          {onToggleWishlist && (
            <div
              className="absolute top-2 right-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <WishlistButton
                isWishlisted={isWishlisted}
                onToggle={() => onToggleWishlist(product.id)}
                size="sm"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between w-full space-y-3">
          <div className="space-y-1.5">
            {product.brandName && (
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-600">
                {product.brandName}
              </span>
            )}

            <h3
              onClick={handleProductNavigate}
              className="font-extrabold text-base text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1 cursor-pointer"
            >
              {product.name}
            </h3>

            {/* Rating Stars */}
            {product.ratingAvg !== undefined && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-bold text-slate-800">{product.ratingAvg.toFixed(1)}</span>
                {product.reviewCount !== undefined && (
                  <span className="text-slate-400">({product.reviewCount} reviews)</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div>
              <PriceDisplay
                pricePence={product.pricePence}
                compareAtPricePence={product.compareAtPricePence}
                size="lg"
                showSavingsBadge
              />
              <CryptoPriceBadge pricePence={product.pricePence} className="mt-1.5" />
              <StockIndicator
                status={product.stockStatus}
                availableQuantity={product.availableQuantity}
                className="mt-1"
              />
            </div>

            <div className="flex items-center gap-2">
              {onQuickView && (
                <button
                  onClick={() => onQuickView(product)}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Quick View"
                  aria-label="Quick view product"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}

              {onAddToCart && (
                <AddToCartButton
                  onClick={() => onAddToCart(product)}
                  isOutOfStock={isOutOfStock}
                  className="w-auto px-5"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card View (Default)
  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-lg',
        className
      )}
    >
      <div>
        {/* Image Container with Badges & Wishlist */}
        <div
          onClick={handleProductNavigate}
          className="relative mb-3 overflow-hidden rounded-xl bg-slate-100 cursor-pointer"
        >
          <ProductImage
            src={product.imageUrl}
            alt={product.name}
            aspectRatio="square"
            className="group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {isOnSale && <ProductBadge variant="sale" />}
            {product.isBestseller && <ProductBadge variant="bestseller" />}
            {product.isNew && <ProductBadge variant="new" />}
          </div>

          {/* Wishlist Button */}
          {onToggleWishlist && (
            <div
              className="absolute top-2 right-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <WishlistButton
                isWishlisted={isWishlisted}
                onToggle={() => onToggleWishlist(product.id)}
                size="sm"
              />
            </div>
          )}

          {/* Desktop Hover Quick View Overlay */}
          {onQuickView && (
            <div className="absolute inset-x-0 bottom-2 px-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="w-full bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg backdrop-blur-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-1.5 px-1">
          {product.brandName && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 block">
              {product.brandName}
            </span>
          )}

          <h3
            onClick={handleProductNavigate}
            className="font-extrabold text-xs md:text-sm text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 h-9 leading-snug cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-between text-xs py-0.5">
            {product.ratingAvg !== undefined && product.ratingAvg > 0 ? (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800 text-[11px]">{product.ratingAvg.toFixed(1)}</span>
                {product.reviewCount !== undefined && (
                  <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
                )}
              </div>
            ) : (
              <span className="text-[10px] text-slate-400">Unrated</span>
            )}

            <StockIndicator
              status={product.stockStatus}
              availableQuantity={product.availableQuantity}
              showCount={false}
            />
          </div>
        </div>
      </div>

      {/* Footer / Price & Add to Cart */}
      <div className="pt-3 mt-2 border-t border-slate-100 space-y-2 px-1">
        <PriceDisplay
          pricePence={product.pricePence}
          compareAtPricePence={product.compareAtPricePence}
          size="default"
          showSavingsBadge
        />
        <CryptoPriceBadge pricePence={product.pricePence} />

        {onAddToCart && (
          <AddToCartButton
            onClick={() => onAddToCart(product)}
            isOutOfStock={isOutOfStock}
            size="sm"
          />
        )}
      </div>
    </div>
  );
};
