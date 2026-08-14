import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, ImageOff } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  labTested?: boolean;
  sizeChips?: string[];
  inStock?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  labTested = false,
  sizeChips = [],
  inStock = true,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Safe fallback if images array is empty or undefined
  const hasImages = Array.isArray(images) && images.length > 0;
  const currentImageUrl = hasImages ? images[selectedIndex] || images[0] : null;

  // Handle ESC key for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && hasImages) {
        setSelectedIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && hasImages) {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, images, hasImages]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!hasImages) return;
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!hasImages) return;
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Primary Display Card */}
      <div className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs group aspect-square flex items-center justify-center">
        {currentImageUrl ? (
          <img
            src={currentImageUrl}
            alt={`${productName} image ${selectedIndex + 1}`}
            width={800}
            height={800}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 p-8 text-slate-300">
            <ImageOff className="w-16 h-16" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              No Product Image
            </span>
          </div>
        )}

        {labTested && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-teal-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
            Lab Test
          </div>
        )}

        {(sizeChips.length > 0 || inStock) && (
          <div className="absolute bottom-3 left-3 right-14 z-10 flex flex-wrap gap-1.5">
            {sizeChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-sm"
              >
                {chip}
              </span>
            ))}
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm ${
                inStock ? 'bg-emerald-600 text-white' : 'bg-slate-500 text-white'
              }`}
            >
              {inStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>
        )}

        {/* Zoom Lightbox Trigger Button */}
        {hasImages && (
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md backdrop-blur-xs transition-all cursor-pointer z-10"
            aria-label="Enlarge image preview"
            title="Enlarge product image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Prev / Next Arrows on Primary Display */}
        {hasImages && images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Index Counter Badge */}
        {hasImages && images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/70 text-white text-[11px] font-bold backdrop-blur-xs select-none">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {hasImages && images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-100 ${
                  isSelected
                    ? 'border-teal-600 ring-2 ring-teal-600/30 shadow-md scale-102'
                    : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                }`}
                aria-label={`Select product thumbnail ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && currentImageUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full screen preview of ${productName}`}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Lightbox Header */}
          <div className="w-full flex items-center justify-between text-white max-w-6xl z-10">
            <div className="text-xs font-bold text-slate-300">
              {productName} — Image {selectedIndex + 1} of {images.length}
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close full screen view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Image & Navigation */}
          <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center my-auto">
            <img
              src={currentImageUrl}
              alt={`${productName} full view ${selectedIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all shadow-lg cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all shadow-lg cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto p-2 bg-slate-900/60 rounded-2xl backdrop-blur-xs max-w-full">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === selectedIndex ? 'border-teal-400 ring-2 ring-teal-400/50' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
