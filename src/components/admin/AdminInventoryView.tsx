import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Search, Plus, RefreshCw, AlertCircle, History, X, SlidersHorizontal } from 'lucide-react';

export const AdminInventoryView: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'history'>('inventory');

  // Adjust Modal
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [adjustTarget, setAdjustTarget] = useState<any | null>(null);
  const [adjustmentInput, setAdjustmentInput] = useState('10');
  const [reasonInput, setReasonInput] = useState('RESTOCK');
  const [referenceInput, setReferenceInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadData = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (statusFilter) query.set('status', statusFilter);

      const [resInv, resHist] = await Promise.all([
        apiFetch(`/api/v1/admin/inventory?${query.toString()}`, { headers }),
        apiFetch('/api/v1/admin/inventory/history', { headers }),
      ]);

      if (resInv.ok) {
        const d = await resInv.json();
        setInventory(d.inventory || []);
      }
      if (resHist.ok) {
        const d = await resHist.json();
        setHistory(d.history || []);
      }
    } catch (err) {
      console.error('Error loading inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, statusFilter]);

  const handleOpenAdjust = (item: any) => {
    setAdjustTarget(item);
    setAdjustmentInput('10');
    setReasonInput('RESTOCK');
    setReferenceInput('');
    setError(null);
    setIsAdjustOpen(true);
  };

  const handleSaveAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const adj = parseInt(adjustmentInput, 10);
    if (isNaN(adj) || adj === 0) {
      setError('Adjustment amount must be a non-zero integer (positive to add, negative to remove).');
      return;
    }

    const payload = {
      productId: adjustTarget.productId || undefined,
      variantId: adjustTarget.variantId || undefined,
      adjustment: adj,
      reason: reasonInput,
      reference: referenceInput || 'Admin Manual Adjustment',
    };

    try {
      const res = await apiFetch('/api/v1/admin/inventory/adjust', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to adjust stock.');
      }

      setIsAdjustOpen(false);
      loadData();
    } catch (err: any) {
      setError(err?.message || 'Adjustment failed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Single-Source Inventory Operations</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time stock levels, reservations, and auditable manual adjustments.</p>
        </div>

        <div className="flex border border-slate-200 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'inventory' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Live Stock Table
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Adjustment Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Adjust Modal */}
      {isAdjustOpen && adjustTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">
                Adjust Inventory: {adjustTarget.productName} {adjustTarget.variantName ? `(${adjustTarget.variantName})` : ''}
              </h3>
              <button onClick={() => setIsAdjustOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-700">SKU: <span className="font-mono">{adjustTarget.sku}</span></p>
              <p className="text-slate-500">Current Total Stock: <span className="font-black text-slate-900">{adjustTarget.quantity} units</span></p>
              <p className="text-slate-500">Reserved for Pending Orders: <span className="font-black text-amber-600">{adjustTarget.reservedQuantity} units</span></p>
              <p className="text-slate-500">Available Stock: <span className="font-black text-teal-600">{adjustTarget.availableQuantity} units</span></p>
            </div>

            <form onSubmit={handleSaveAdjustment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                  Adjustment Quantity (+ to add, - to remove)
                </label>
                <input
                  type="number"
                  required
                  value={adjustmentInput}
                  onChange={(e) => setAdjustmentInput(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-bold outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Reason for Adjustment</label>
                <select
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-bold outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="RESTOCK">RESTOCK - New shipment received</option>
                  <option value="CORRECTION">CORRECTION - Cycle count inventory check</option>
                  <option value="DAMAGE">DAMAGE - Damaged or expired stock removed</option>
                  <option value="RETURN">RETURN - Customer order return</option>
                  <option value="OTHER">OTHER - Miscellaneous note</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Reference / Audit Note</label>
                <input
                  type="text"
                  placeholder="e.g. Supplier Batch #9102 or Damage Report #14"
                  value={referenceInput}
                  onChange={(e) => setReferenceInput(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdjustOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg font-bold">
                  Record Stock Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main View Area */}
      {activeTab === 'inventory' ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search SKU, product title, or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-teal-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-bold w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-slate-200 rounded-xl bg-slate-50 p-2 outline-none"
              >
                <option value="">All Stock Statuses</option>
                <option value="IN_STOCK">In Stock</option>
                <option value="LOW_STOCK">Low Stock Warning</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
                <option value="DISCONTINUED">Discontinued</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Product / Variant</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Total Qty</th>
                  <th className="p-3">Reserved Qty</th>
                  <th className="p-3">Available Qty</th>
                  <th className="p-3">Stock Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{item.sku}</td>
                    <td className="p-3">
                      <p className="font-bold text-slate-900">{item.productName}</p>
                      {item.variantName && <p className="text-[10px] text-teal-600 font-medium">{item.variantName}</p>}
                    </td>
                    <td className="p-3 text-slate-500 font-medium">{item.brandName}</td>
                    <td className="p-3 font-black text-slate-900">{item.quantity}</td>
                    <td className="p-3 font-bold text-amber-600">{item.reservedQuantity}</td>
                    <td className="p-3 font-black text-teal-600">{item.availableQuantity}</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        item.stockStatus === 'IN_STOCK'
                          ? 'bg-teal-100 text-teal-800'
                          : item.stockStatus === 'LOW_STOCK'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.stockStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleOpenAdjust(item)}
                        className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* History View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 space-y-4">
          <h3 className="font-black text-xs uppercase text-slate-900 tracking-wider">Historical Stock Adjustments</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Administrator</th>
                  <th className="p-3">Previous</th>
                  <th className="p-3">Adjustment</th>
                  <th className="p-3">Resulting</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-[10px] text-slate-500">
                      {new Date(h.createdAt).toLocaleString('en-GB')}
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      {h.user ? `${h.user.firstName} ${h.user.lastName}` : 'System / Auto'}
                    </td>
                    <td className="p-3 font-medium text-slate-600">{h.previousQuantity}</td>
                    <td className={`p-3 font-black ${h.adjustment > 0 ? 'text-teal-600' : 'text-red-600'}`}>
                      {h.adjustment > 0 ? `+${h.adjustment}` : h.adjustment}
                    </td>
                    <td className="p-3 font-black text-slate-900">{h.resultingQuantity}</td>
                    <td className="p-3 font-bold uppercase text-[10px] text-slate-700">{h.reason}</td>
                    <td className="p-3 text-slate-500 italic">{h.reference || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
