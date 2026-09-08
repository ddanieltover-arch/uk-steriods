import React from 'react';
import { ProductCard, ProductCardData } from './ProductCard';
import { cn } from '../../lib/utils';

interface ProductGridProps {
  products: ProductCardData[];
  wishlistIds?: string[];
  onAddToCart?: (product: ProductCardData) => void;
  onQuickBuy?: (product: ProductCardData) => void;
  onQuickView?: (product: ProductCardData) => void;
  onToggleWishlist?: (productId: string) => void;
  columns?: 2 | 3 | 4;
  viewMode?: 'grid' | 'list';
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlistIds = [],
  onAddToCart,
  onQuickBuy,
  onQuickView,
  onToggleWishlist,
  columns = 4,
  viewMode = 'grid',
  className,
}) => {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  if (viewMode === 'list') {
    return (
      <div className={cn('space-y-4', className)}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode="list"
            isWishlisted={wishlistIds.includes(product.id)}
            onAddToCart={onAddToCart}
            onQuickBuy={onQuickBuy}
            onQuickView={onQuickView}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 md:gap-6', columnClasses, className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode="grid"
          isWishlisted={wishlistIds.includes(product.id)}
          onAddToCart={onAddToCart}
          onQuickBuy={onQuickBuy}
          onQuickView={onQuickView}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
};
