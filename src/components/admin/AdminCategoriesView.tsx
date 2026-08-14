import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, FolderTree, AlertCircle, X } from 'lucide-react';

export const AdminCategoriesView: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [parentId, setParentId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/v1/admin/categories', { headers });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80');
    setParentId('');
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: any) => {
    setEditingCategory(c);
    setName(c.name);
    setSlug(c.slug);
    setDescription(c.description || '');
    setImageUrl(c.imageUrl || '');
    setParentId(c.parentId || '');
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
      imageUrl,
      parentId: parentId || null,
    };

    try {
      const url = editingCategory ? `/api/v1/admin/categories/${editingCategory.id}` : '/api/v1/admin/categories';
      const method = editingCategory ? 'PATCH' : 'POST';

      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save category.');
      }

      setIsModalOpen(false);
      loadCategories();
    } catch (err: any) {
      setError(err?.message || 'Save failed.');
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete category '${catName}'?`)) return;

    try {
      const res = await apiFetch(`/api/v1/admin/categories/${id}`, { method: 'DELETE', headers });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete category.');
      }

      loadCategories();
    } catch (err: any) {
      alert(err?.message || 'Delete failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Category Hierarchy Management</h1>
          <p className="text-xs text-slate-500 font-medium">Structure storefront taxonomy and hierarchy safely.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">
                {editingCategory ? 'Edit Category' : 'Create Category'}
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
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Category Name</label>
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
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Parent Category</label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                >
                  <option value="">(None - Top Level)</option>
                  {categories
                    .filter((c) => !editingCategory || c.id !== editingCategory.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
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

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg font-bold">
                  Save Category
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
                <th className="p-3">Category</th>
                <th className="p-3">Parent</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Products</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    {c.imageUrl && (
                      <img src={c.imageUrl} alt="" className="w-8 h-8 object-cover rounded-lg border bg-slate-50" />
                    )}
                    <span>{c.name}</span>
                  </td>
                  <td className="p-3 text-slate-500 font-medium">{c.parent ? c.parent.name : '—'}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-400">{c.slug}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold text-[10px]">
                      {c.productCount ?? 0} items
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 text-slate-500 hover:text-teal-600 rounded cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
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
