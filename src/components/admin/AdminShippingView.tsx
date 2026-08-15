import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Truck, Plus, Edit2, AlertCircle, X } from 'lucide-react';

export const AdminShippingView: React.FC = () => {
  const [configs, setConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConfig, setEditingBrand] = useState<any | null>(null);

  const [code, setCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [priceGbp, setPriceGbp] = useState('3.99');
  const [freeThresholdGbp, setFreeThresholdGbp] = useState('300.00');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadShippingConfigs = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/v1/admin/shipping', { headers });
      if (res.ok) {
        const data = await res.json();
        setConfigs(data.shippingConfigs || []);
      }
    } catch (err) {
      console.error('Error loading shipping configs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShippingConfigs();
  }, []);

  const handleOpenCreate = () => {
    setEditingBrand(null);
    setCode('express-next-day');
    setDisplayName('Express Next Day Tracked');
    setDescription('1 - 2 Working Days via Royal Mail');
    setPriceGbp('6.99');
    setFreeThresholdGbp('150.00');
    setIsActive(true);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: any) => {
    setEditingBrand(c);
    setCode(c.code);
    setDisplayName(c.displayName);
    setDescription(c.description || '');
    setPriceGbp((c.pricePence / 100).toFixed(2));
    setFreeThresholdGbp(c.freeThresholdPence ? (c.freeThresholdPence / 100).toFixed(2) : '');
    setIsActive(c.isActive);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const pricePence = Math.round(parseFloat(priceGbp) * 100);
    const freeThresholdPence = freeThresholdGbp ? Math.round(parseFloat(freeThresholdGbp) * 100) : null;

    const payload = {
      code,
      displayName,
      description,
      pricePence,
      freeThresholdPence,
      isActive,
    };

    try {
      const url = editingConfig ? `/api/v1/admin/shipping/${editingConfig.id}` : '/api/v1/admin/shipping';
      const method = editingConfig ? 'PATCH' : 'POST';

      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save shipping configuration.');
      }

      setIsModalOpen(false);
      loadShippingConfigs();
    } catch (err: any) {
      setError(err?.message || 'Save failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Shipping Method Configuration</h1>
          <p className="text-xs text-slate-500 font-medium">Manage rates, free delivery thresholds, and carrier options.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Shipping Method</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">
                {editingConfig ? 'Edit Shipping Method' : 'Create Shipping Method'}
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
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Code</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-mono text-[11px] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Price (£ GBP)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={priceGbp}
                  onChange={(e) => setPriceGbp(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Free Delivery Threshold (£ GBP)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Leave blank for no free shipping"
                  value={freeThresholdGbp}
                  onChange={(e) => setFreeThresholdGbp(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none"
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
                  <span>Active Shipping Method</span>
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
                  Save Shipping Config
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
                <th className="p-3">Method</th>
                <th className="p-3">Code</th>
                <th className="p-3">Price (£)</th>
                <th className="p-3">Free Threshold</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {configs.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{c.displayName}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-400">{c.code}</td>
                  <td className="p-3 font-black text-slate-900">£{(c.pricePence / 100).toFixed(2)}</td>
                  <td className="p-3 font-bold text-teal-600">
                    {c.freeThresholdPence ? `£${(c.freeThresholdPence / 100).toFixed(2)}+` : 'None'}
                  </td>
                  <td className="p-3">
                    {c.isActive ? (
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
                      onClick={() => handleOpenEdit(c)}
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
