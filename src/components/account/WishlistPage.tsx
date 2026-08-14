import React, { useEffect } from 'react';
import { Container } from '../layout/Container';
import { PriceDisplay } from '../commerce/PriceDisplay';
import { ProductImage } from '../commerce/ProductImage';
import { useToast } from '../feedback/ToastProvider';
import { Product, formatGbp } from '../../types';
import {
  Home,
  ChevronRight,
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  Info,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface WishlistPageProps {
  wishlistIds: string[];
  products: Product[];
  currentUser: any | null;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number, selectedVariant?: any) => void;
  onNavigate: (path: string) => void;
  onOpenQuickView?: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistIds,
  products,
  currentUser,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
  onOpenQuickView,
}) => {
  const { showToast } = useToast();

  useEffect(() => {
    document.title = 'My Wishlist | UK Performance Labs';
  }, []);

  // Filter products present in wishlistIds
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (product: Product) => {
    // If product has multiple variants, open quick view or navigate to PDP so user selects variant
    if (product.variants && product.variants.length > 0) {
      if (onOpenQuickView) {
        onOpenQuickView(product);
      } else {
        onNavigate(`/product/${product.slug}`);
      }
      return;
    }

    // Direct add for single-variant products
    onAddToCart(product, 1);
    onToggleWishlist(product.id);
    showToast('Moved to Basket', `"${product.name}" added to your basket.`, 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <Container>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500 overflow-x-auto pb-1">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-teal-600 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-slate-900 truncate">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-black text-sm">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>My Saved Items</span>
                <span className="text-xs bg-slate-200 text-slate-700 font-extrabold px-2.5 py-0.5 rounded-full">
                  {wishlistedProducts.length}
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved supplements & formulations to review or purchase later.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/shop')}
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 hover:text-teal-700 cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </button>
        </div>

        {/* Guest Session Notice */}
        {!currentUser && wishlistedProducts.length > 0 && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs text-amber-900">
                <strong className="block font-extrabold">Guest Session Active</strong>
                <span>Your wishlist is currently saved in this browser. Sign in or create an account to sync across all your devices.</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/login?next=/wishlist')}
              className="bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
            >
              Sign In / Register
            </button>
          </div>
        )}

        {/* Empty State */}
        {wishlistedProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 sm:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-400 border border-rose-100 flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 stroke-1" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900">Your wishlist is empty</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Save items while browsing by clicking the heart icon on any product page or card.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl shadow-lg shadow-teal-600/20 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Discover Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => {
              const isOutOfStock = product.stockQuantity <= 0;
              const hasVariants = product.variants && product.variants.length > 0;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Thumbnail */}
                    <div
                      onClick={() => onNavigate(`/product/${product.slug}`)}
                      className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative cursor-pointer"
                    >
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        aspectRatio="square"
                      />

                      {/* Remove from wishlist top-right button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                          showToast('Removed', `"${product.name}" removed from wishlist.`, 'info');
                        }}
                        className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-slate-400 hover:text-red-600 hover:bg-white shadow-xs transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Brand & Category */}
                    <div>
                      {product.brandName && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 block">
                          {product.brandName}
                        </span>
                      )}
                      <h3
                        onClick={() => onNavigate(`/product/${product.slug}`)}
                        className="text-xs font-black text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                    </div>

                    {/* Stock status badge */}
                    <div className="flex items-center gap-2 text-[11px]">
                      {isOutOfStock ? (
                        <span className="text-red-600 font-extrabold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Out of Stock</span>
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>In Stock</span>
                        </span>
                      )}
                    </div>

                    {/* Price Display */}
                    <div>
                      <PriceDisplay
                        pricePence={Math.round((product.salePriceGbp || product.priceGbp) * 100)}
                        compareAtPricePence={
                          product.salePriceGbp ? Math.round(product.priceGbp * 100) : undefined
                        }
                        size="default"
                      />
                    </div>
                  </div>

                  {/* Move to Basket CTA */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => handleMoveToCart(product)}
                      className="w-full bg-slate-900 hover:bg-teal-600 active:scale-98 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{hasVariants ? 'Select Options' : 'Move to Basket'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};
