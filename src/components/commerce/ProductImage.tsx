import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProductImageProps {
  src?: string | null;
  alt: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  aspectRatio = 'square',
  className,
  priority = false,
  width = 600,
  height = 600,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
  }[aspectRatio];

  return (
    <div className={cn('relative overflow-hidden bg-slate-100 rounded-xl', aspectClasses, className)}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-slate-200/80" />
      )}

      {hasError || !src ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
          <Package className="w-8 h-8 stroke-1 mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Image Unavailable
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={priority ? '(min-width: 1024px) 600px, 50vw' : '(min-width: 640px) 33vw, 50vw'}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={cn(
            'h-full w-full object-cover object-center transition-all duration-300',
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          )}
        />
      )}
    </div>
  );
};
