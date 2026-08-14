import React, { useMemo, useState } from 'react';
import { Product, formatGbp } from '../../types';
import { displayProductTitle } from '../../lib/pdp/pdp-content';

interface ProductStackDealProps {
  product: Product;
  companions: Product[];
  unitPriceGbp: number;
  onAddBundle: (items: { product: Product; quantity: number }[]) => void;
}

export const ProductStackDeal: React.FC<ProductStackDealProps> = ({
  product,
  companions,
  unitPriceGbp,
  onAddBundle,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => companions.map((p) => p.id));

  const rows = useMemo(
    () => [
      { product, price: unitPriceGbp, locked: true },
      ...companions.map((p) => ({ product: p, price: p.salePriceGbp || p.priceGbp, locked: false })),
    ],
    [companions, product, unitPriceGbp]
  );

  const selected = rows.filter((row) => row.locked || selectedIds.includes(row.product.id));
  const total = selected.reduce((sum, row) => sum + row.price, 0);
  const compare = selected.reduce((sum, row) => sum + row.product.priceGbp, 0);
  const savings = Math.max(0, compare - total);

  const toggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  if (companions.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-teal-600">Stack Deal</p>
          <h2 className="text-xl font-black text-slate-900">Often Bought Together</h2>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {rows.map((row, index) => (
          <label
            key={row.product.id}
            className="relative flex cursor-pointer flex-col rounded-2xl border border-slate-200 p-4"
          >
            <input
              type="checkbox"
              className="absolute right-3 top-3 h-4 w-4 accent-teal-600"
              checked={row.locked || selectedIds.includes(row.product.id)}
              disabled={row.locked}
              onChange={() => toggle(row.product.id)}
            />
            {row.product.images[0] && (
              <img
                src={row.product.images[0]}
                alt=""
                className="mb-3 h-28 w-full object-contain"
              />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {row.locked ? 'This item' : index === 1 ? '+' : '+'}
            </span>
            <span className="mt-1 text-xs font-extrabold text-slate-900">
              {displayProductTitle(row.product)}
            </span>
            <span className="mt-2 text-sm font-black text-slate-900">{formatGbp(row.price, false)}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">Bundle total · {selected.length} items</p>
          <p className="text-lg font-black text-slate-900">
            {formatGbp(total, false)}
            {savings > 0 && (
              <span className="ml-2 text-sm font-bold text-slate-400 line-through">{formatGbp(compare, false)}</span>
            )}
          </p>
          {savings > 0 && (
            <p className="text-xs font-bold text-emerald-700">You save {formatGbp(savings, false)}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            const bundle = [
              { product, quantity: 1 },
              ...companions
                .filter((p) => selectedIds.includes(p.id))
                .map((p) => ({ product: p, quantity: 1 })),
            ];
            onAddBundle(bundle);
          }}
          className="rounded-xl bg-teal-600 px-6 py-3 text-xs font-black text-white hover:bg-teal-700 cursor-pointer"
        >
          Add {selected.length} to bag
        </button>
      </div>
      <p className="mt-3 text-[11px] text-slate-400">Tick or untick items to customise your stack.</p>
    </section>
  );
};
