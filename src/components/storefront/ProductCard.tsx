import React from 'react';
import { Product } from '../../types';
import { ShoppingBag, Eye, Heart, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  isWishlisted,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
}) => {
  const currentPrice = product.salePriceGbp || product.priceGbp;
  const originalPrice = product.salePriceGbp ? product.priceGbp : null;

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-teal-500 transition-all p-4 flex flex-col md:flex-row items-center gap-6 group">
        <div className="w-32 h-32 bg-slate-50 rounded-lg shrink-0 flex items-center justify-center relative p-3 border border-slate-100">
          {product.isLowStock && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
              Low Stock
            </span>
          )}
          {product.isBestseller && !product.isLowStock && (
            <span className="absolute top-2 left-2 bg-teal-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
              Bestseller
            </span>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="flex-1 space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold">
            <span className="text-teal-600 uppercase">{product.categoryName}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{product.brandName}</span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-base group-hover:text-teal-600 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl">{product.description}</p>

          {product.purityScore && (
            <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 mt-1">
              <ShieldCheck className="w-3 h-3 text-teal-600" />
              <span>{product.purityScore}</span>
            </div>
          )}
        </div>

        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">£{currentPrice.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xs text-slate-400 line-through">£{originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-[10px] text-slate-400">SKU: {product.sku}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-red-500'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group hover:border-teal-500 transition-all flex flex-col h-full">
      {/* Product Image Mockup Box */}
      <div className="h-48 bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden group">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isLowStock && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
              Low Stock
            </span>
          )}
          {product.isBestseller && !product.isLowStock && (
            <span className="bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
              Bestseller
            </span>
          )}
          {originalPrice && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-1.5 rounded-full z-10 transition-transform ${
            isWishlisted
              ? 'bg-red-50 text-red-500'
              : 'bg-white/80 text-slate-400 hover:text-red-500 hover:scale-110'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {/* Product Image or Graphic Box */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-36 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover Quick View Button */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white/95 text-slate-900 font-bold text-xs px-3.5 py-2 rounded-lg shadow-md hover:bg-teal-600 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[10px] font-bold text-teal-600 uppercase mb-1">
          <span>{product.categoryName}</span>
          <span className="text-slate-400 font-normal">{product.brandName}</span>
        </div>

        <h3
          onClick={() => onQuickView(product)}
          className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-teal-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {product.name}
        </h3>

        <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {product.purityScore && (
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 mb-4 w-max">
            <ShieldCheck className="w-3 h-3 text-teal-600" />
            <span>{product.purityScore}</span>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">£{currentPrice.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xs text-slate-400 line-through">£{originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-[9px] text-slate-400">Inclusive of VAT</p>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-teal-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm hover:bg-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
