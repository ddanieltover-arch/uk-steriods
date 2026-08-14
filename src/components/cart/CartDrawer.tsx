import React, { useState } from 'react';
import { Sheet } from '../overlay/Sheet';
import { ShoppingBag, Trash2, ArrowRight, Truck, Tag, Check } from 'lucide-react';
import { ProductImage } from '../commerce/ProductImage';
import { QuantitySelector } from '../commerce/QuantitySelector';
import { PriceDisplay } from '../commerce/PriceDisplay';
import { Button } from '../ui/button';
import { formatGbp, CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onViewFullCart?: () => void;
}

const FREE_SHIPPING_THRESHOLD_PENCE = 10000; // £100.00

const getItemUnitPricePence = (item: any) => {
  if (item.unitPricePence !== undefined) return item.unitPricePence;
  if (item.product?.salePriceGbp) return Math.round(item.product.salePriceGbp * 100);
  if (item.product?.priceGbp) return Math.round(item.product.priceGbp * 100);
  return 0;
};

const getItemName = (item: any) => item.productName || item.product?.name || 'Product';
const getItemImage = (item: any) => item.productImageUrl || item.product?.images?.[0];
const getItemVariant = (item: any) => item.variantName || item.selectedVariant?.name;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onViewFullCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotalPence = items.reduce((sum, item) => sum + getItemUnitPricePence(item) * item.quantity, 0);
  const discountPence = appliedPromo === 'WELCOME10' ? Math.round(subtotalPence * 0.1) : 0;
  const finalSubtotalPence = Math.max(0, subtotalPence - discountPence);


  const remainingForFreeShippingPence = Math.max(0, FREE_SHIPPING_THRESHOLD_PENCE - subtotalPence);
  const freeShippingProgressPercent = Math.min(
    100,
    Math.round((subtotalPence / FREE_SHIPPING_THRESHOLD_PENCE) * 100)
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
    } else {
      alert('Invalid promo code. Try "WELCOME10" for 10% off.');
    }
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={`Your Shopping Basket (${items.reduce((acc, i) => acc + i.quantity, 0)})`}
      description="UK Royal Mail Tracked 24 Delivery"
      size="default"
    >
      <div className="flex flex-col h-full justify-between space-y-6 pb-6">
        {/* Free Shipping Progress Indicator */}
        <div className="rounded-2xl bg-teal-50/80 p-4 border border-teal-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-teal-900">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-teal-600" />
              {remainingForFreeShippingPence === 0 ? (
                <span className="text-emerald-700">You qualify for FREE UK Tracked 24 Shipping!</span>
              ) : (
                <span>
                  Add <strong className="text-teal-700">{formatGbp(remainingForFreeShippingPence)}</strong> for FREE Shipping
                </span>
              )}
            </span>
            <span className="text-[10px] font-black text-teal-700">{freeShippingProgressPercent}%</span>
          </div>

          <div className="h-2 w-full rounded-full bg-teal-200/60 overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">Your basket is empty</h3>
            <p className="text-xs text-slate-500 max-w-xs">
              Explore our performance catalog to add supplements and workout formulations.
            </p>
            <Button onClick={onClose} variant="default" size="sm" className="mt-2">
              Browse Catalog
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {items.map((item) => {
              const itemUnitPricePence = getItemUnitPricePence(item);
              const itemTotalPence = itemUnitPricePence * item.quantity;
              const name = getItemName(item);
              const image = getItemImage(item);
              const variant = getItemVariant(item);

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs transition-all hover:border-slate-300"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                    <ProductImage src={image} alt={name} aspectRatio="square" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-black text-slate-900 truncate">{name}</h4>
                    {variant && (
                      <p className="text-[10px] font-bold text-teal-700 bg-teal-50 inline-block px-1.5 py-0.5 rounded">
                        {variant}
                      </p>
                    )}


                    <div className="flex items-center justify-between gap-2 pt-1">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(q) => onUpdateQuantity(item.id, q)}
                        size="sm"
                      />

                      <div className="text-right">
                        <PriceDisplay pricePence={itemTotalPence} size="sm" />
                      </div>
                    </div>
                  </div>

                  {/* Remove Action */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Promo Code Input & Summary Footer */}
        {items.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200 bg-white">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Promo code (try WELCOME10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs font-bold uppercase text-slate-900 placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              <Button type="submit" variant="outline" size="sm" className="font-bold">
                Apply
              </Button>
            </form>

            {appliedPromo && (
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Code &quot;WELCOME10&quot; applied (10% off)
                </span>
                <span>-{formatGbp(discountPence)}</span>
              </div>
            )}

            {/* Subtotal Calculation */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatGbp(subtotalPence)}</span>
              </div>
              {discountPence > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-bold">-{formatGbp(discountPence)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated UK Shipping</span>
                <span className="font-bold text-slate-900">
                  {subtotalPence >= FREE_SHIPPING_THRESHOLD_PENCE ? 'FREE' : formatGbp(495)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Due</span>
                <span className="text-teal-700">{formatGbp(finalSubtotalPence + (subtotalPence >= FREE_SHIPPING_THRESHOLD_PENCE ? 0 : 495))}</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-2 pt-1">
              <Button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                variant="default"
                size="lg"
                className="w-full font-black text-xs uppercase tracking-wider py-3.5 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              {onViewFullCart && (
                <Button
                  onClick={() => {
                    onClose();
                    onViewFullCart();
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-bold"
                >
                  View Full Cart Page
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Sheet>
  );
};
