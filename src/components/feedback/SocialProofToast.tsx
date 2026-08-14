import React, { useEffect, useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import { Product } from '../../types';
import { displayProductTitle } from '../../lib/pdp/pdp-content';
import { cn } from '../../lib/utils';

const NAMES = ['Hunter', 'James', 'Callum', 'Owen', 'Nate', 'Lewis', 'Alex', 'Ryan', 'Tom', 'Chris'];
const CITIES = ['Blackpool', 'Manchester', 'Leeds', 'Birmingham', 'Liverpool', 'Bristol', 'Glasgow', 'London', 'Newcastle', 'Sheffield'];
const VISIBLE_MS = 8000;
const GAP_MS = 30000;

interface ProofItem {
  name: string;
  city: string;
  minutesAgo: number;
  product: Product;
}

function buildQueue(products: Product[]): ProofItem[] {
  const pool = products.filter((p) => p.isPublished !== false && p.images?.[0]);
  if (pool.length === 0) return [];
  return Array.from({ length: 12 }, (_, i) => ({
    name: NAMES[i % NAMES.length],
    city: CITIES[i % CITIES.length],
    minutesAgo: 2 + ((i * 7) % 40),
    product: pool[i % pool.length],
  }));
}

interface SocialProofToastProps {
  products: Product[];
  onOpenProduct: (slug: string) => void;
  className?: string;
}

export const SocialProofToast: React.FC<SocialProofToastProps> = ({
  products,
  onOpenProduct,
  className,
}) => {
  const queue = useMemo(() => buildQueue(products), [products]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (queue.length === 0) return;
    if (visible) {
      const hide = window.setTimeout(() => setVisible(false), VISIBLE_MS);
      return () => window.clearTimeout(hide);
    }
    const showNext = window.setTimeout(() => {
      setIndex((i) => (i + 1) % queue.length);
      setTick((n) => n + 1);
      setVisible(true);
    }, GAP_MS);
    return () => window.clearTimeout(showNext);
  }, [visible, queue.length]);

  if (!visible || queue.length === 0) return null;

  const item = queue[index];
  const title = displayProductTitle(item.product);

  return (
    <div className={cn('relative px-3 py-2 lg:px-0 lg:py-0', className)}>
      <button
        type="button"
        onClick={() => onOpenProduct(item.product.slug)}
        className="relative w-full lg:w-[22rem] overflow-hidden rounded-full bg-slate-100 text-left shadow-lg ring-1 ring-slate-200/80 cursor-pointer"
      >
        <div className="flex items-center gap-2.5 pl-1.5 pr-8 py-1.5">
          <span className="relative shrink-0">
            <img
              src={item.product.images[0]}
              alt=""
              className="h-10 w-10 rounded-full object-cover bg-white"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-slate-100">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] text-slate-800 leading-tight truncate">
              <span className="font-extrabold">{item.name}</span>
              {' '}bought{' '}
              <span className="font-extrabold">{title}</span>
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {item.city} · {item.minutesAgo} min ago
            </span>
          </span>
        </div>
        <span
          key={tick}
          className="social-proof-progress absolute bottom-0 left-0 h-0.5 bg-emerald-500"
        />
      </button>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setVisible(false)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 p-1 text-slate-400 hover:text-slate-700 cursor-pointer lg:right-2"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
