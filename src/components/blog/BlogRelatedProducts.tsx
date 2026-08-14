import React from 'react';
import { ProductCard, ProductCardData } from '../commerce/ProductCard';
import { StockStatus } from '../../types';

export const BlogRelatedProducts: React.FC<{
  products: {
    id: string;
    name: string;
    slug: string;
    brandName?: string;
    imageUrl?: string | null;
    pricePence: number;
    stockStatus: string;
    availableQuantity?: number;
  }[];
}> = ({ products }) => {
  if (!products.length) return null;
  return (
    <section className="mt-12">
      <h2 className="text-lg font-black text-slate-900 mb-4">Shop related products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => {
          const card: ProductCardData = {
            id: p.id,
            name: p.name,
            slug: p.slug,
            brandName: p.brandName,
            imageUrl: p.imageUrl,
            pricePence: p.pricePence,
            stockStatus: (p.stockStatus as StockStatus) || StockStatus.IN_STOCK,
            availableQuantity: p.availableQuantity,
          };
          return <ProductCard key={p.id} product={card} />;
        })}
      </div>
    </section>
  );
};
