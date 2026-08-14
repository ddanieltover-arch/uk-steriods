import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { ProductCard, ProductCardData } from '../commerce/ProductCard';
import { ProductGrid } from '../commerce/ProductGrid';
import { Button } from '../ui/button';
import { StockStatus } from '@prisma/client';
import { LayoutGrid, List } from 'lucide-react';
import { useToast } from '../feedback/ToastProvider';

const SAMPLE_PRODUCTS: ProductCardData[] = [
  {
    id: 'p_1',
    name: 'Northstar Peak Endurance Matrix (300g)',
    brandName: 'Northstar Peak',
    sku: 'NSP-END-300',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop',
    pricePence: 4495,
    compareAtPricePence: 5995,
    ratingAvg: 4.9,
    reviewCount: 128,
    stockStatus: StockStatus.IN_STOCK,
    availableQuantity: 45,
    isOnSale: true,
    isBestseller: true,
  },
  {
    id: 'p_2',
    name: 'Vertex Iso-Recovery Whey Isolate (1kg)',
    brandName: 'Vertex Iso',
    sku: 'VTX-ISO-1KG',
    imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop',
    pricePence: 3995,
    ratingAvg: 4.8,
    reviewCount: 94,
    stockStatus: StockStatus.LOW_STOCK,
    availableQuantity: 4,
    isNew: true,
  },
  {
    id: 'p_3',
    name: 'UrbanForge Hydra-Electrolytes (60 Tabs)',
    brandName: 'UrbanForge',
    sku: 'UFB-ELC-60',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop',
    pricePence: 1895,
    compareAtPricePence: 2495,
    ratingAvg: 4.7,
    reviewCount: 52,
    stockStatus: StockStatus.IN_STOCK,
    availableQuantity: 80,
    isOnSale: true,
  },
  {
    id: 'p_4',
    name: 'Apex Pure Omega-3 Gold (120 Softgels)',
    brandName: 'Apex Formulations',
    sku: 'APX-OMG-120',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&auto=format&fit=crop',
    pricePence: 2495,
    ratingAvg: 5.0,
    reviewCount: 31,
    stockStatus: StockStatus.OUT_OF_STOCK,
    availableQuantity: 0,
  },
];

export const ProductCardTestDemo: React.FC = () => {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p_1']);
  const [selectedQuickView, setSelectedQuickView] = useState<ProductCardData | null>(null);

  const toggleWishlist = (id: string) => {
    if (wishlistIds.includes(id)) {
      setWishlistIds(wishlistIds.filter((w) => w !== id));
      showToast('Wishlist Updated', 'Item removed from saved wishlist', 'info');
    } else {
      setWishlistIds([...wishlistIds, id]);
      showToast('Wishlist Updated', 'Item saved to your wishlist!', 'success');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-10">
      <Container>
        {/* Controls Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">ProductCard & ProductGrid Showcase</h1>
            <p className="text-xs text-slate-600 mt-1">
              Test high-conversion e-commerce product cards with ratio lock, stock status, and mobile tap targets.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Grid View</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span>List View</span>
            </button>
          </div>
        </div>

        {/* Product Grid Container */}
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 my-8">
          <ProductGrid
            products={SAMPLE_PRODUCTS}
            wishlistIds={wishlistIds}
            viewMode={viewMode}
            onAddToCart={(p) => showToast('Added to Basket', `${p.name} added to cart`, 'success')}
            onQuickView={(p) => setSelectedQuickView(p)}
            onToggleWishlist={toggleWishlist}
          />
        </Section>
      </Container>

      {/* Quick View Dialog Modal */}
      {selectedQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase text-teal-600 tracking-wider">
                  {selectedQuickView.brandName}
                </span>
                <h3 className="text-lg font-black text-slate-900">{selectedQuickView.name}</h3>
              </div>
              <Button onClick={() => setSelectedQuickView(null)} variant="ghost" size="sm">
                Close
              </Button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Full HPLC lab-verified formulation details, batch certificates, and nutritional breakdown.
            </p>

            <Button
              onClick={() => {
                showToast('Added to Basket', `${selectedQuickView.name} added!`, 'success');
                setSelectedQuickView(null);
              }}
              className="w-full"
            >
              Add to Basket ({selectedQuickView.pricePence / 100} GBP)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
