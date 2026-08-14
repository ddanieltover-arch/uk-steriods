import React from 'react';
import { Product } from '../../types';

interface ProductSpecificationsProps {
  product: Product;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ product }) => {
  const customSpecs = product.specifications || [];

  // Base factual specifications
  const baseSpecs = [
    { label: 'Brand / Manufacturer', value: product.brandName },
    { label: 'Product SKU', value: product.sku },
    { label: 'Category', value: product.categoryName },
    { label: 'Country of Origin', value: 'United Kingdom' },
    { label: 'Storage Instructions', value: 'Store in a cool, dry place away from direct sunlight.' },
  ];

  // Merge custom specs with base specs without duplicates
  const allSpecs = [...baseSpecs];
  customSpecs.forEach((cs) => {
    if (!allSpecs.some((bs) => bs.label.toLowerCase() === cs.label.toLowerCase())) {
      allSpecs.push(cs);
    }
  });

  return (
    <div className="space-y-4">
      <h3 className="text-base font-black text-slate-900">Technical Specifications</h3>
      
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <dl className="divide-y divide-slate-100">
          {allSpecs.map((spec, index) => (
            <div
              key={spec.label}
              className={`grid grid-cols-1 sm:grid-cols-3 p-4 text-xs ${
                index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
              }`}
            >
              <dt className="font-bold text-slate-500 uppercase tracking-wider">{spec.label}</dt>
              <dd className="font-extrabold text-slate-900 sm:col-span-2 mt-1 sm:mt-0">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
