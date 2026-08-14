import React, { useState } from 'react';
import { Product, ProductVariant, Review } from '../../types';
import { X, ShieldCheck, Star, ShoppingBag, Truck, Lock, CheckCircle2, Heart } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { CryptoPriceBadge } from '../commerce/CryptoPriceBadge';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0] || '');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // New review state
  const [reviews, setReviews] = useState<Review[]>(StorageService.getReviews().filter(r => r.productId === product.id));
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const priceToDisplay = selectedVariant?.priceGbp || product.salePriceGbp || product.priceGbp;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev = StorageService.addReview({
      productId: product.id,
      userName: reviewName,
      verifiedPurchase: true,
      rating: reviewRating,
      title: reviewTitle || 'Great Product',
      comment: reviewComment,
    });

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600">
            <span>{product.categoryName}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{product.brandName}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                const targetSlug = product.slug || product.id;
                window.history.pushState({}, '', `/product/${targetSlug}`);
                window.dispatchEvent(new Event('popstate'));
              }}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 underline cursor-pointer"
            >
              Full Details →
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="h-72 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-6 relative">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="max-h-full object-contain mix-blend-multiply"
              />
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2 rounded-full border transition-all ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg border p-1 bg-slate-50 overflow-hidden shrink-0 transition-all ${
                      selectedImage === img ? 'border-teal-600 ring-2 ring-teal-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Standard Box */}
            {product.purityScore && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800">{product.purityScore}</p>
                  <p className="text-[10px] text-slate-500">Original manufacturer batch specification and standard assurance.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Details & Ordering */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">{product.name}</h2>
              <p className="text-xs text-slate-400 mt-1">SKU: {selectedVariant?.sku || product.sku}</p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between border-y border-slate-100 py-3">
              <div>
                <span className="text-2xl font-black text-slate-900">£{priceToDisplay.toFixed(2)}</span>
                {product.salePriceGbp && !selectedVariant && (
                  <span className="text-xs text-slate-400 line-through ml-2">£{product.priceGbp.toFixed(2)}</span>
                )}
                <p className="text-[10px] text-slate-400">Inclusive of VAT • GBP</p>
                <CryptoPriceBadge pricePence={Math.round(priceToDisplay * 100)} className="mt-1.5" />
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">{product.ratingAvg}</span>
                <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{product.shortDescription}</p>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Size / Package:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-lg border text-xs font-medium text-left flex justify-between items-center transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-teal-600 bg-teal-50/50 font-bold text-teal-900 ring-1 ring-teal-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{v.name}</span>
                      <span className="font-extrabold text-slate-900">£{v.priceGbp.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, selectedVariant, quantity);
                  onClose();
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • £{(priceToDisplay * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Shipping Info Pills */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-teal-600" />
                <span>Next-Day UK Royal Mail</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-teal-600" />
                <span>Plain Discreet Box</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Description / Specifications / Customer Reviews */}
        <div className="border-t border-slate-200 px-6 pt-4 pb-6">
          <div className="flex border-b border-slate-200 gap-6 text-xs font-bold uppercase tracking-wider mb-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'overview' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'specs' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'reviews' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="text-xs text-slate-600 leading-relaxed space-y-3">
              <p>{product.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {product.tags.map(t => (
                  <span key={t} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <tbody>
                  {product.specifications?.map((spec, i) => (
                    <tr key={i} className="border-b border-slate-200 last:border-b-0">
                      <td className="px-4 py-2.5 font-bold text-slate-700 bg-slate-100/50 w-1/3">{spec.label}</td>
                      <td className="px-4 py-2.5 text-slate-600">{spec.value}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2.5 font-bold text-slate-700 bg-slate-100/50">Manufacturer</td>
                    <td className="px-4 py-2.5 text-slate-600">{product.brandName}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-700 bg-slate-100/50">Country of Origin</td>
                    <td className="px-4 py-2.5 text-slate-600">United Kingdom (UK)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Existing Reviews List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {reviews.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No reviews yet for this product. Be the first to leave a review!</p>
                ) : (
                  reviews.map(r => (
                    <div key={r.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">{r.userName}</span>
                        <span className="text-[10px] text-slate-400">{r.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="font-bold text-slate-900 mt-1">{r.title}</p>
                      <p className="text-slate-600">{r.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Leave a Customer Review</h4>
                {reviewSubmitted ? (
                  <div className="bg-teal-50 border border-teal-200 text-teal-800 text-xs p-3 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Thank you! Your verified review has been published.</span>
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Your Name / City</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex M., Manchester"
                          value={reviewName}
                          onChange={e => setReviewName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Rating</label>
                        <select
                          value={reviewRating}
                          onChange={e => setReviewRating(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-teal-500 outline-none"
                        >
                          <option value="5">5 Stars - Excellent</option>
                          <option value="4">4 Stars - Very Good</option>
                          <option value="3">3 Stars - Average</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Review Headline"
                        value={reviewTitle}
                        onChange={e => setReviewTitle(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <textarea
                        required
                        rows={2}
                        placeholder="Write your feedback..."
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
