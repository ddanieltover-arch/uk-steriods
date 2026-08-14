import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { MessageSquare, CheckCircle, XCircle, Trash2, Star } from 'lucide-react';

export const AdminReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const headers = { 'Content-Type': 'application/json' };

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/v1/admin/reviews', { headers });
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleModerate = async (id: string, isApproved: boolean) => {
    try {
      const res = await apiFetch(`/api/v1/admin/reviews/${id}/moderate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ isApproved }),
      });

      if (res.ok) {
        loadReviews();
      }
    } catch (err) {
      alert('Moderation action failed.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this review?')) return;
    try {
      const res = await apiFetch(`/api/v1/admin/reviews/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        loadReviews();
      }
    } catch (err) {
      alert('Delete failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Customer Review Moderation</h1>
          <p className="text-xs text-slate-500 font-medium">Approve, reject, or hide public product feedback.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6">
        {reviews.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 font-bold border border-dashed border-slate-200 rounded-xl">
            No product reviews found to moderate.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Rating & Title</th>
                  <th className="p-3">Comment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reviews.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{r.product?.name}</td>
                    <td className="p-3 font-medium text-slate-600">
                      {r.user ? `${r.user.firstName} ${r.user.lastName}` : 'Anonymous'}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-amber-500 font-black">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{r.rating}/5</span>
                      </div>
                      <p className="font-bold text-slate-900 line-clamp-1">{r.title}</p>
                    </td>
                    <td className="p-3 text-slate-600 max-w-xs truncate">{r.comment}</td>
                    <td className="p-3">
                      {r.isApproved ? (
                        <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          Approved
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          Pending Approval
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-1">
                      {!r.isApproved ? (
                        <button
                          onClick={() => handleModerate(r.id, true)}
                          className="px-2.5 py-1 bg-teal-600 text-white rounded text-[10px] font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleModerate(r.id, false)}
                          className="px-2.5 py-1 bg-amber-600 text-white rounded text-[10px] font-bold cursor-pointer"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
