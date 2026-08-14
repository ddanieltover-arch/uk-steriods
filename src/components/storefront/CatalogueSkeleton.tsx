import React from 'react';

interface CatalogueSkeletonProps {
  count?: number;
}

export const CatalogueSkeleton: React.FC<CatalogueSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs">
          <div className="w-full aspect-square bg-slate-100 rounded-xl" />
          <div className="h-3 bg-slate-200 rounded-full w-1/3" />
          <div className="h-4 bg-slate-200 rounded-full w-3/4" />
          <div className="h-3 bg-slate-100 rounded-full w-1/2" />
          <div className="pt-2 flex justify-between items-center border-t border-slate-100">
            <div className="h-5 bg-slate-200 rounded-full w-1/3" />
            <div className="h-8 bg-slate-200 rounded-xl w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};
