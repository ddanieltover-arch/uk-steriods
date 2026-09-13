import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { AppLink } from '../navigation/AppLink';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface CatalogueBreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
}

export const CatalogueBreadcrumbs: React.FC<CatalogueBreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs font-medium text-slate-500">
        <li>
          <AppLink
            href="/"
            navigate={onNavigate}
            className="flex items-center gap-1 hover:text-teal-600 transition-colors cursor-pointer"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span className="sr-only">Home</span>
          </AppLink>
        </li>

        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            {item.active || !item.href ? (
              <span className="font-bold text-slate-900 truncate max-w-[200px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <AppLink
                href={item.href}
                navigate={onNavigate}
                className="hover:text-teal-600 transition-colors cursor-pointer truncate max-w-[180px]"
              >
                {item.label}
              </AppLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
