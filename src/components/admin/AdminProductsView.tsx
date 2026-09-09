import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Archive, Eye, RefreshCw, X, AlertCircle } from 'lucide-react';

interface AdminProductsViewProps {
  onNavigate: (route: string) => void;
  selectedProductId?: string;
  isNew?: boolean;
}

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({
  onNavigate,
  selectedProductId,
  isNew,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(isNew || !!selectedProductId);

  // Form State for Create / Edit
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    sku: '',
    description: '',
    shortDescription: '',
    basePriceGbp: '39.99',
    categoryId: '',
    brandId: '',
    isPublished: true,
    isFeatured: false,
    hasVariants: false,
    primaryImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    initialQuantity: '20',
    seoTitle: '',
    seoDescription: '',
  });

  const [formError, setFormDataError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadData = async () => {
    setLoading(true);
    try {
      const [resProd, resCat, resBrd] = await Promise.all([
        apiFetch(`/api/v1/admin/products?search=${encodeURIComponent(search)}&includeArchived=true`, { headers }),
        apiFetch('/api/v1/admin/categories', { headers }),
        apiFetch('/api/v1/admin/brands', { headers }),
      ]);

      if (resProd.ok) {
        const d = await resProd.json();
        setProducts(d.products || []);
      }
      if (resCat.ok) {
        const d = await resCat.json();
        setCategories(d.categories || []);
      }
      if (resBrd.ok) {
        const d = await resBrd.json();
        setBrands(d.brands || []);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search]);

  useEffect(() => {
    if (selectedProductId) {
      const p = products.find((prod) => prod.id === selectedProductId);
      if (p) {
        setFormData({
          id: p.id,
          name: p.name,
          slug: p.slug,
          sku: p.sku,
          description: p.description,
          shortDescription: p.shortDescription,
          basePriceGbp: (p.basePricePence / 100).toFixed(2),
          categoryId: p.categoryId,
          brandId: p.brandId,
          isPublished: p.isPublished,
          isFeatured: p.isFeatured,
          hasVariants: p.hasVariants,
          primaryImageUrl: p.images?.[0]?.url || '',
          initialQuantity: p.inventory?.quantity?.toString() || '0',
          seoTitle: p.seoTitle || '',
          seoDescription: p.seoDescription || '',
        });
        setIsEditing(true);
      }
    } else if (isNew) {
      setFormData({
        id: '',
        name: '',
        slug: '',
        sku: 'UKP-' + Math.floor(1000 + Math.random() * 9000),
        description: 'Pharmaceutical grade UK performance supplement engineered for optimal results.',
        shortDescription: 'Pharmaceutical grade UK performance supplement.',
        basePriceGbp: '39.99',
        categoryId: categories[0]?.id || '',
        brandId: brands[0]?.id || '',
        isPublished: true,
        isFeatured: true,
        hasVariants: false,
        primaryImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
        initialQuantity: '25',
        seoTitle: '',
        seoDescription: '',
      });
      setIsEditing(true);
    }
  }, [selectedProductId, isNew, products, categories, brands]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormDataError(null);
    setFormSuccess(null);

    const pricePence = Math.round(parseFloat(formData.basePriceGbp || '0') * 100);
    const generatedSlug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const payload = {
      name: formData.name,
      slug: generatedSlug,
      sku: formData.sku,
      description: formData.description,
      shortDescription: formData.shortDescription,
      seoTitle: formData.seoTitle.trim() || null,
      seoDescription: formData.seoDescription.trim() || null,
      basePricePence: pricePence,
      categoryId: formData.categoryId || categories[0]?.id,
      brandId: formData.brandId || brands[0]?.id,
      isPublished: formData.isPublished,
      isFeatured: formData.isFeatured,
      hasVariants: formData.hasVariants,
      images: [{ url: formData.primaryImageUrl, altText: formData.name, isPrimary: true, displayOrder: 0 }],
      initialQuantity: parseInt(formData.initialQuantity, 10) || 0,
    };

    try {
      const url = formData.id ? `/api/v1/admin/products/${formData.id}` : '/api/v1/admin/products';
      const method = formData.id ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product.');
      }

      setFormSuccess(`Product '${payload.name}' saved successfully.`);
      loadData();
      setTimeout(() => {
        setIsEditing(false);
        onNavigate('/admin/products');
      }, 1000);
    } catch (err: any) {
      setFormDataError(err?.message || 'Failed to save product.');
    }
  };

  const handleArchive = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to archive '${name}'? It will be removed from the public catalogue.`)) return;

    try {
      const res = await apiFetch(`/api/v1/admin/products/${id}/archive`, {
        method: 'POST',
        headers,
      });

      if (!res.ok) {
        throw new Error('Failed to archive product.');
      }

      loadData();
    } catch (err: any) {
      alert(err?.message || 'Archive failed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Product Catalogue Management</h1>
          <p className="text-xs text-slate-500 font-medium">Create, edit, price, publish, and archive catalogue items.</p>
        </div>
        <button
          onClick={() => onNavigate('/admin/products/new')}
          className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Product Form Modal / View */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">
                {formData.id ? 'Edit Product Item' : 'Add New Product to Catalogue'}
              </h3>
              <button
                onClick={() => {
                  setIsEditing(false);
                  onNavigate('/admin/products');
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 font-mono font-bold uppercase focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-teal-500 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Brand</label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-teal-500 outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Price (£ GBP)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.basePriceGbp}
                    onChange={(e) => setFormData({ ...formData, basePriceGbp: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 font-bold focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    value={formData.initialQuantity}
                    onChange={(e) => setFormData({ ...formData, initialQuantity: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 font-bold focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.primaryImageUrl}
                  onChange={(e) => setFormData({ ...formData, primaryImageUrl: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-teal-500 outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1 border-t border-slate-100">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">SEO overrides (optional)</p>
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">SEO title</label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="Defaults to product name"
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">SEO description</label>
                  <textarea
                    rows={2}
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    placeholder="Defaults to short description"
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-teal-500 outline-none resize-y"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span>Published to Storefront</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span>Featured Product</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    onNavigate('/admin/products');
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-teal-600 text-white rounded-lg font-bold">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search & Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by title, SKU, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-teal-500 font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Price (£)</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <img
                      src={p.images?.[0]?.url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'}
                      alt=""
                      className="w-8 h-8 object-contain rounded border bg-slate-50"
                    />
                    <div>
                      <p className="line-clamp-1">{p.name}</p>
                      <span className="text-[9px] text-slate-400 font-mono">SKU: {p.sku}</span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{p.category?.name}</td>
                  <td className="p-3 text-slate-600 font-medium">{p.brand?.name}</td>
                  <td className="p-3 font-black text-slate-900">£{(p.basePricePence / 100).toFixed(2)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-700">
                      {p.inventory?.quantity ?? 0} units
                    </span>
                  </td>
                  <td className="p-3">
                    {p.deletedAt ? (
                      <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Archived
                      </span>
                    ) : p.isPublished ? (
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => onNavigate(`/admin/products/${p.id}`)}
                      className="p-1.5 text-slate-500 hover:text-teal-600 rounded cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {!p.deletedAt && (
                      <button
                        onClick={() => handleArchive(p.id, p.name)}
                        className="p-1.5 text-slate-500 hover:text-red-600 rounded cursor-pointer"
                        title="Archive"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    )}
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
