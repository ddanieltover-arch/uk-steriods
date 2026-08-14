import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ProductPdpAccordionProps {
  sections: AccordionSection[];
}

export const ProductPdpAccordion: React.FC<ProductPdpAccordionProps> = ({ sections }) => {
  const [openId, setOpenId] = useState(sections[0]?.id ?? '');

  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {sections.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? '' : section.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="text-sm font-black text-slate-900">{section.title}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-slate-700">{section.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
