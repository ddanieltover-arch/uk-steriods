import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Tag, AlertCircle, X } from 'lucide-react';

export const AdminBrandsView: React.FC = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadBrands = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/v1/admin/brands', { headers });
      if (res.ok) {
        const data = await res.json();
        setBrands(data.brands || []);
      }
    } catch (err) {
      console.error('Error loading brands:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleOpenCreate = () => {
    setEditingBrand(null);
    setName('');
    setSlug('');
    setDescription('');
    setLogoUrl('');
    setIsFeatured(true);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: any) => {
    setEditingBrand(b);
    setName(b.name);
    setSlug(b.slug);
    setDescription(b.description || '');
    setLogoUrl(b.logoUrl || '');
    setIsFeatured(b.isFeatured);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      name,
      slug: generatedSlug,
      description,
      logoUrl,
      isFeatured,
    };

    try {
      const url = editingBrand ? `/api/v1/admin/brands/${editingBrand.id}` : '/api/v1/admin/brands';
      const method = editingBrand ? 'PATCH' : 'POST';

      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save brand.');
      }

      setIsModalOpen(false);
      loadBrands();
    } catch (err: any) {
      setError(err?.message || 'Save failed.');
    }
  };

  const handleDelete = async (id: string, brandName: string) => {
    if (!confirm(`Are you sure you want to delete brand '${brandName}'?`)) return;

    try {
      const res = await apiFetch(`/api/v1/admin/brands/${id}`, { method: 'DELETE', headers });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete brand.');
      }

      loadBrands();
    } catch (err: any) {
      alert(err?.message || 'Delete failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Brand Directory Management</h1>
          <p className="text-xs text-slate-500 font-medium">Manage manufacturer partners and featured brand identities.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Brand</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">
                {editingBrand ? 'Edit Brand' : 'Create Brand'}
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
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Auto-generated if left blank"
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-teal-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Logo URL</label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-teal-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span>Featured Brand on Homepage</span>
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
                  Save Brand
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
                <th className="p-3">Brand Name</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Products</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {brands.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    {b.logoUrl ? (
                      <img src={b.logoUrl} alt="" className="w-8 h-8 object-contain border rounded-lg bg-slate-50" />
                    ) : (
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-[10px]">
                        {b.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span>{b.name}</span>
                  </td>
                  <td className="p-3 font-mono text-[10px] text-slate-400">{b.slug}</td>
                  <td className="p-3">
                    {b.isFeatured ? (
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px] font-bold">Standard</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold text-[10px]">
                      {b.productCount ?? 0} products
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="p-1.5 text-slate-500 hover:text-teal-600 rounded cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id, b.name)}
                      className="p-1.5 text-slate-500 hover:text-red-600 rounded cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
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
