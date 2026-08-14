import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PdpFaqItem } from '../../lib/pdp/pdp-content';

interface ProductFaqProps {
  items: PdpFaqItem[];
}

export const ProductFaq: React.FC<ProductFaqProps> = ({ items }) => {
  const [open, setOpen] = useState(0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h2 className="mb-4 text-xl font-black text-slate-900">Frequently Asked Questions</h2>
      <div className="divide-y divide-slate-100">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left cursor-pointer"
              >
                <span className="text-sm font-extrabold text-slate-900">{item.question}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <p className="pb-4 text-sm leading-relaxed text-slate-600">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
};
