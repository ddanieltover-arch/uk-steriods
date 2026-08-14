import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CataloguePaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const CataloguePagination: React.FC<CataloguePaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  limit,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  // Generate page numbers array
  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="pt-8 pb-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Items count summary */}
      <p className="text-xs text-slate-500 font-medium">
        Showing <span className="font-extrabold text-slate-900">{startItem}</span> to{' '}
        <span className="font-extrabold text-slate-900">{endItem}</span> of{' '}
        <span className="font-extrabold text-slate-900">{totalCount}</span> products
      </p>

      {/* Pagination Controls */}
      <nav aria-label="Catalogue Pagination" className="flex items-center gap-1.5">
        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Buttons */}
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-2 text-slate-400 text-xs font-bold select-none">
                ...
              </span>
            );
          }

          const pageNum = p as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
};
