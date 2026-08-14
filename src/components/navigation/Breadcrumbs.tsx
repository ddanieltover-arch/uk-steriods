import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs font-semibold text-slate-500', className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => items[0]?.onClick?.()}
            className="flex items-center text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
              {isLast ? (
                <span className="font-extrabold text-teal-700" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-teal-600 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
