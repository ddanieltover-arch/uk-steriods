import React, { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import { PriceDisplay } from '../commerce/PriceDisplay';
import { QuantitySelector } from '../commerce/QuantitySelector';
import { ProductImage } from '../commerce/ProductImage';
import { Button } from '../ui/button';
import { useToast } from '../feedback/ToastProvider';
import { formatGbp, CartItem, Product } from '../../types';
import { CartCalculatorService, CartCalculationResult, ReconciledCartItem } from '../../lib/services/cart-calculator.service';
import {
  Home,
  ChevronRight,
  ShoppingBag,
  Trash2,
  Heart,
  Tag,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Check,
  X,
} from 'lucide-react';

interface CartPageProps {
  items: CartItem[];
  customProducts?: Product[];
  wishlistIds: string[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onProceedToCheckout: () => void;
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  customProducts,
  wishlistIds,
  onUpdateQuantity,
  onRemoveItem,
  onToggleWishlist,
  onProceedToCheckout,
  onNavigate,
}) => {
  const { showToast } = useToast();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [calcResult, setCalcResult] = useState<CartCalculationResult | null>(null);
  const [isValidatingCode, setIsValidatingCode] = useState(false);

  // Set document title & SEO metadata
  useEffect(() => {
    document.title = 'Your Shopping Basket | UK Performance Labs';
  }, []);

  // Recalculate cart totals server-side / authoritative service whenever items, discount, or shipping changes
  useEffect(() => {
    let isMounted = true;

    async function runCalculation() {
      // Prepare raw input for CartCalculatorService
      const calcInput = {
        items: items.map((i) => ({
          id: i.id,
          productId: i.productId,
          variantId: i.selectedVariant?.id,
          quantity: i.quantity,
          unitPricePence: i.unitPricePence,
        })),
        discountCode: appliedCode || undefined,
        customProducts,
      };

      const result = await CartCalculatorService.calculate(calcInput);

      if (isMounted) {
        setCalcResult(result);
      }
    }

    runCalculation();

    return () => {
      isMounted = false;
    };
  }, [items, appliedCode, customProducts]);

  const handleApplyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;

    setIsValidatingCode(true);
    const codeToTest = promoCodeInput.trim().toUpperCase();

    // Use current subtotal for discount validation
    const subtotal = calcResult ? calcResult.subtotalPence : 0;

    try {
      const response = await fetch('/api/v1/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToTest, subtotalPence: subtotal }),
      });

      const data = await response.json();

      if (data.isValid) {
        setAppliedCode(data.code);
        showToast('Promo Code Applied', data.message || 'Discount applied to basket.', 'success');
      } else {
        showToast('Invalid Code', data.message || 'Promotion code cannot be applied.', 'error');
      }
    } catch {
      showToast('Validation Error', 'Unable to validate promotional code. Please try again.', 'error');
    } finally {
      setIsValidatingCode(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedCode(null);
    setPromoCodeInput('');
    showToast('Code Removed', 'Promotional discount removed.', 'info');
  };

  const handleMoveToWishlist = (item: ReconciledCartItem) => {
    if (!wishlistIds.includes(item.productId)) {
      onToggleWishlist(item.productId);
    }
    onRemoveItem(item.id);
    showToast('Moved to Wishlist', `"${item.productName}" saved to your wishlist.`, 'success');
  };

  // Reconciled list & totals
  const reconciledItems = calcResult ? calcResult.items : [];
  const subtotalPence = calcResult ? calcResult.subtotalPence : 0;
  const discountPence = calcResult ? calcResult.discountPence : 0;
  const merchandiseTotalPence = Math.max(0, subtotalPence - discountPence);
  const reconciliationNotes = calcResult ? calcResult.reconciliationNotes : [];

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
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
          <span className="text-slate-900 truncate">Shopping Basket</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Your Shopping Basket
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review items, adjust quantities, and enter promotional codes before checkout.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/shop')}
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 hover:text-teal-700 cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Empty State */}
        {reconciledItems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 sm:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10 stroke-1" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900">Your basket is empty</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                You have no supplements or workout formulations in your basket yet. Explore our performance catalogue to discover products.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl shadow-lg shadow-teal-600/20 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Reconciliation Warnings Banner */}
              {reconciliationNotes.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5">
                  <div className="flex items-center gap-2 font-extrabold text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Basket Updates & Stock Reconciliation</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                    {reconciliationNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-4">
                {reconciledItems.map((item) => {
                  const isWishlisted = wishlistIds.includes(item.productId);

                  return (
                    <div
                      key={item.id}
                      className={`bg-white border rounded-2xl p-4 sm:p-5 shadow-2xs transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                        item.isOutOfStock
                          ? 'border-red-200 bg-red-50/20'
                          : item.priceChanged
                          ? 'border-amber-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Product Image */}
                      <div
                        onClick={() => onNavigate(`/product/${item.productSlug}`)}
                        className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 cursor-pointer"
                      >
                        <ProductImage
                          src={item.productImageUrl}
                          alt={item.productName}
                          aspectRatio="square"
                        />
                      </div>

                      {/* Product Main Details */}
                      <div className="flex-1 min-w-0 space-y-1.5 w-full">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            {item.brandName && (
                              <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 block">
                                {item.brandName}
                              </span>
                            )}
                            <h3
                              onClick={() => onNavigate(`/product/${item.productSlug}`)}
                              className="text-sm font-black text-slate-900 hover:text-teal-600 transition-colors cursor-pointer truncate"
                            >
                              {item.productName}
                            </h3>
                          </div>

                          {/* Line Price Display */}
                          <div className="text-right shrink-0">
                            <PriceDisplay pricePence={item.lineTotalPence} size="default" />
                            {item.quantity > 1 && (
                              <span className="text-[10px] text-slate-400 font-medium block">
                                ({formatGbp(item.unitPricePence)} each)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Variant & SKU */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {item.selectedVariantName && (
                            <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
                              Option: {item.selectedVariantName}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-400">SKU: {item.sku}</span>
                        </div>

                        {/* Out of stock or price change notice */}
                        {item.isOutOfStock && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                            <X className="w-3 h-3" />
                            Currently Unavailable
                          </span>
                        )}

                        {/* Quantity & Action Controls */}
                        <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 mt-2">
                          <QuantitySelector
                            quantity={item.quantity}
                            onQuantityChange={(q) => onUpdateQuantity(item.id, q)}
                            max={item.availableStock}
                            disabled={item.isOutOfStock}
                            size="sm"
                          />

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleMoveToWishlist(item)}
                              className={`text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                                isWishlisted
                                  ? 'text-rose-600'
                                  : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                              <span className="hidden sm:inline">Save for Later</span>
                            </button>

                            <span className="text-slate-200">|</span>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-xs font-bold text-slate-400 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Order Summary Card (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-lg font-black text-slate-900 pb-4 border-b border-slate-100">
                  Order Summary
                </h2>

                {/* Promotional Discount Code Form */}
                <form onSubmit={handleApplyPromoCode} className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Promotional Code</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Enter code (e.g. WELCOME10)"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isValidatingCode || !promoCodeInput.trim()}
                      variant="outline"
                      size="sm"
                      className="font-bold shrink-0"
                    >
                      {isValidatingCode ? 'Checking...' : 'Apply'}
                    </Button>
                  </div>

                  {appliedCode && (
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mt-2">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Code "{appliedCode}" Applied
                      </span>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="p-1 hover:bg-emerald-100 rounded text-slate-500 hover:text-slate-800 cursor-pointer"
                        title="Remove code"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </form>

                {/* Financial Totals Table */}
                <div className="space-y-3 pt-2 text-xs font-medium text-slate-600 divide-y divide-slate-100">
                  <div className="flex justify-between pt-2">
                    <span>Subtotal</span>
                    <span className="font-extrabold text-slate-900">{formatGbp(subtotalPence)}</span>
                  </div>

                  {discountPence > 0 && (
                    <div className="flex justify-between pt-3 text-emerald-600 font-extrabold">
                      <span>Discount ({appliedCode})</span>
                      <span>-{formatGbp(discountPence)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-4 text-base font-black text-slate-900">
                    <span>Basket total</span>
                    <div className="text-right">
                      <span className="text-xl text-teal-700 font-black">{formatGbp(merchandiseTotalPence)}</span>
                      <span className="block text-[10px] text-slate-400 font-normal">Shipping calculated at checkout</span>
                    </div>
                  </div>
                </div>

                {/* Primary Checkout Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={reconciledItems.length === 0 || merchandiseTotalPence <= 0}
                    onClick={onProceedToCheckout}
                    className="w-full bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-black text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-600/20 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Security Trust Micro-Badges */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-teal-600" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>UK Registered Business</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
