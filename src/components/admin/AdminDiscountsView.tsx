import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Percent, AlertCircle, X } from 'lucide-react';

export const AdminDiscountsView: React.FC = () => {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<any | null>(null);

  const [code, setCode] = useState('');
  const [type, setType] = useState<'PERCENTAGE' | 'FIXED_AMOUNT'>('PERCENTAGE');
  const [value, setValue] = useState('10');
  const [minOrderGbp, setMinOrderGbp] = useState('30.00');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadDiscounts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/v1/admin/discounts', { headers });
      if (res.ok) {
        const data = await res.json();
        setDiscounts(data.discounts || []);
      }
    } catch (err) {
      console.error('Error loading discounts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscounts();
  }, []);

  const handleOpenCreate = () => {
    setEditingDiscount(null);
    setCode('PROMO' + Math.floor(10 + Math.random() * 90));
    setType('PERCENTAGE');
    setValue('10');
    setMinOrderGbp('30.00');
    setIsActive(true);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d: any) => {
    setEditingDiscount(d);
    setCode(d.code);
    setType(d.type);
    setValue(d.type === 'PERCENTAGE' ? d.valuePenceOrPercent.toString() : (d.valuePenceOrPercent / 100).toFixed(2));
    setMinOrderGbp((d.minOrderPence / 100).toFixed(2));
    setIsActive(d.isActive);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numericValue = type === 'PERCENTAGE' ? parseInt(value, 10) : Math.round(parseFloat(value) * 100);
    const minOrderPence = Math.round(parseFloat(minOrderGbp) * 100);

    const payload = {
      code: code.toUpperCase(),
      type,
      valuePenceOrPercent: numericValue,
      minOrderPence,
      startsAt: new Date(),
      isActive,
    };

    try {
      const url = editingDiscount ? `/api/v1/admin/discounts/${editingDiscount.id}` : '/api/v1/admin/discounts';
      const method = editingDiscount ? 'PATCH' : 'POST';

      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save discount code.');
      }

      setIsModalOpen(false);
      loadDiscounts();
    } catch (err: any) {
      setError(err?.message || 'Save failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Promotional Discount Manager</h1>
          <p className="text-xs text-slate-500 font-medium">Create and govern coupon codes, percentage discounts, and order thresholds.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Discount Code</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">
                {editingDiscount ? 'Edit Discount Code' : 'Create New Discount Code'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Promo Code</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-mono font-bold uppercase focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Discount Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-bold outline-none"
                >
                  <option value="PERCENTAGE">PERCENTAGE (% Off Subtotal)</option>
                  <option value="FIXED_AMOUNT">FIXED AMOUNT (£ Off Subtotal)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                  {type === 'PERCENTAGE' ? 'Discount Percentage (%)' : 'Discount Amount (£ GBP)'}
                </label>
                <input
                  type="number"
                  step={type === 'PERCENTAGE' ? '1' : '0.01'}
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-bold outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Minimum Order Spend (£ GBP)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={minOrderGbp}
                  onChange={(e) => setMinOrderGbp(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-bold outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span>Active Code</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg font-bold">
                  Save Discount Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Type</th>
                <th className="p-3">Value</th>
                <th className="p-3">Min Order (£)</th>
                <th className="p-3">Uses</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {discounts.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-black text-teal-600">{d.code}</td>
                  <td className="p-3 uppercase text-[10px] font-bold text-slate-500">{d.type}</td>
                  <td className="p-3 font-black text-slate-900">
                    {d.type === 'PERCENTAGE' ? `${d.valuePenceOrPercent}% OFF` : `£${(d.valuePenceOrPercent / 100).toFixed(2)} OFF`}
                  </td>
                  <td className="p-3 font-bold text-slate-800">£{(d.minOrderPence / 100).toFixed(2)}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-500">{d.usedCount} times</td>
                  <td className="p-3">
                    {d.isActive ? (
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Active
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleOpenEdit(d)}
                      className="p-1.5 text-slate-500 hover:text-teal-600 rounded cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
