import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center justify-center space-x-1.5 py-4', className)}>
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2.5 h-8 text-xs font-bold"
      >
        <ChevronLeft className="w-3.5 h-3.5 mr-1" />
        <span>Prev</span>
      </Button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onPageChange(page)}
          className="w-8 h-8 p-0 text-xs font-bold"
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2.5 h-8 text-xs font-bold"
      >
        <span>Next</span>
        <ChevronRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
};
