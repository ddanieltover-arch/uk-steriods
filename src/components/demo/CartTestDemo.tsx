import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { CartDrawer } from '../cart/CartDrawer';
import { Button } from '../ui/button';
import { CartItem } from '../../types';
import { ShoppingBag, Plus, Trash2 } from 'lucide-react';
import { useToast } from '../feedback/ToastProvider';

const INITIAL_CART: CartItem[] = [
  {
    id: 'item_1',
    productId: 'prod_1',
    productName: 'Northstar Peak Endurance Matrix (300g)',
    variantName: 'Unflavoured Powder',
    unitPricePence: 4495,
    quantity: 1,
    productImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop',
  },
  {
    id: 'item_2',
    productId: 'prod_2',
    productName: 'Vertex Iso-Recovery Whey Isolate (1kg)',
    variantName: 'Belgian Chocolate',
    unitPricePence: 3995,
    quantity: 1,
    productImageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop',
  },
];

export const CartTestDemo: React.FC = () => {
  const { showToast } = useToast();
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const [isCartOpen, setIsCartOpen] = useState(true);

  const handleUpdateQuantity = (id: string, q: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: q } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item Removed', 'Cart item removed', 'info');
  };

  const handleAddSampleItem = () => {
    const newItem: CartItem = {
      id: `item_${Date.now()}`,
      productId: 'prod_3',
      productName: 'UrbanForge Hydra-Electrolytes (60 Tabs)',
      variantName: 'Berry Twist',
      unitPricePence: 1895,
      quantity: 1,
      productImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&auto=format&fit=crop',
    };
    setItems([...items, newItem]);
    showToast('Item Added', 'Added Hydra-Electrolytes to basket!', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <Container>
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">CartDrawer & Threshold Engine Test</h1>
              <p className="text-xs text-slate-600 mt-1">
                Interactive drawer test simulating UK Royal Mail free shipping threshold calculations (£300 limit).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleAddSampleItem} variant="outline" size="sm">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add £18.95 Electrolytes
              </Button>

              <Button onClick={() => setIsCartOpen(true)} variant="default" size="sm">
                <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                Open Cart Drawer ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900">Basket Subtotal</span>
              <p className="text-xl font-black text-teal-700">
                £{(items.reduce((sum, i) => sum + i.unitPricePence * i.quantity, 0) / 100).toFixed(2)}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-slate-900">Free UK Shipping Eligibility</span>
              <p className="text-sm font-bold text-slate-800">
                {items.reduce((sum, i) => sum + i.unitPricePence * i.quantity, 0) >= 30000 ? (
                  <span className="text-emerald-700 font-black">Qualifies for FREE UK Tracked 48 Shipping!</span>
                ) : (
                  <span>
                    Need £
                    {(
                      (30000 - items.reduce((sum, i) => sum + i.unitPricePence * i.quantity, 0)) /
                      100
                    ).toFixed(2)}{' '}
                    more.
                  </span>
                )}
              </p>
            </div>
          </div>
        </Section>
      </Container>

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => showToast('Proceeding to Checkout', 'Redirecting to payment server...', 'success')}
      />
    </div>
  );
};
