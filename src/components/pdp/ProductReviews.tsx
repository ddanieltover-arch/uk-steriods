import React, { useState } from 'react';
import { Review } from '../../types';
import { StorageService } from '../../services/storage';
import { Star, CheckCircle, MessageSquarePlus, X, ThumbsUp } from 'lucide-react';
import { useToast } from '../feedback/ToastProvider';

interface ProductReviewsProps {
  productId: string;
  productName: string;
  initialRatingAvg: number;
  initialReviewCount: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productName,
  initialRatingAvg,
  initialReviewCount,
}) => {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(() => {
    const all = StorageService.getReviews();
    return all.filter((r) => r.productId === productId);
  });

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');

  // Calculate current rating stats based on local reviews
  const currentCount = reviews.length;
  const currentAvg =
    currentCount > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / currentCount
      : initialRatingAvg;

  // Rating distribution counts (5 star to 1 star)
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = currentCount > 0 ? Math.round((count / currentCount) * 100) : 0;
    return { stars, count, percentage };
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formComment.trim()) {
      showToast('Form Incomplete', 'Please fill out all review fields.', 'error');
      return;
    }

    const newRev = StorageService.addReview({
      productId,
      userName: formName.trim(),
      verifiedPurchase: false,
      rating: formRating,
      title: formTitle.trim(),
      comment: formComment.trim(),
    });

    setReviews([newRev, ...reviews]);
    setIsWriteModalOpen(false);
    setFormName('');
    setFormTitle('');
    setFormComment('');
    showToast('Review Published', 'Thank you for your feedback!', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header & Stats Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <h3 className="text-xl font-black text-slate-900">Customer Reviews</h3>
          <p className="text-xs text-slate-500 mt-1">
            Verified customer experiences for {productName}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsWriteModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Review Breakdown Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left: Score Card */}
        <div className="text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
          <div className="text-4xl font-black text-slate-900">{currentAvg.toFixed(1)}</div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-5 h-5 ${
                  s <= Math.round(currentAvg) ? 'fill-current' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <div className="text-xs font-bold text-slate-500">
            Based on {currentCount} verified customer review{currentCount !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Center: Rating Distribution Bars */}
        <div className="md:col-span-2 space-y-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3 text-xs">
              <span className="font-extrabold text-slate-700 w-12 flex items-center gap-1">
                <span>{stars}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>

              <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="font-bold text-slate-500 w-12 text-right">
                {percentage}% ({count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List or Empty State */}
      {reviews.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Star className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-800">No Reviews Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Be the first customer to share your experience with {productName}.
          </p>
          <button
            type="button"
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Leave First Review
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900">{rev.userName}</span>
                  {rev.verifiedPurchase && (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Purchase</span>
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-slate-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= rev.rating ? 'fill-current' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <h4 className="text-xs font-black text-slate-900">{rev.title}</h4>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                <button
                  type="button"
                  onClick={() => showToast('Thank you', 'Marked as helpful.', 'info')}
                  className="hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Write a Review</h3>
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormRating(s)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${s <= formRating ? 'fill-current' : 'text-slate-200'}`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-extrabold text-slate-700 ml-2">
                    {formRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Your Name & City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex M., London"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              {/* Review Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional Quality & Fast Shipping"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              {/* Comment */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Detailed Review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about flavor, solubility, endurance performance, or delivery speed..."
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
