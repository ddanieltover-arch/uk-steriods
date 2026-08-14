import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Plus, Search, RefreshCw, X } from 'lucide-react';

interface AdminBlogViewProps {
  onNavigate: (route: string) => void;
  selectedId?: string;
  isNew?: boolean;
}

const emptyForm = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  bodyMarkdown: '',
  coverImageUrl: '',
  authorName: 'Editorial Team',
  authorBio: '',
  status: 'DRAFT',
  featured: false,
  seoTitle: '',
  seoDescription: '',
  categoryIds: [] as string[],
  productIds: [] as string[],
  faq: [{ question: '', answer: '' }],
};

export const AdminBlogView: React.FC<AdminBlogViewProps> = ({ onNavigate, selectedId, isNew }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(isNew || !!selectedId);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [productHits, setProductHits] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    const [pRes, cRes] = await Promise.all([
      apiFetch(`/api/v1/admin/blog?search=${encodeURIComponent(search)}`),
      apiFetch('/api/v1/admin/blog/categories'),
    ]);
    if (pRes.ok) {
      const d = await pRes.json();
      setPosts(d.posts || []);
    }
    if (cRes.ok) {
      const d = await cRes.json();
      setCategories(d.categories || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [search]);

  useEffect(() => {
    if (!selectedId) return;
    (async () => {
      const res = await apiFetch(`/api/v1/admin/blog/${selectedId}`);
      if (!res.ok) return;
      const d = await res.json();
      const p = d.post;
      setForm({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        bodyMarkdown: p.bodyMarkdown,
        coverImageUrl: p.coverImageUrl || '',
        authorName: p.authorName,
        authorBio: p.authorBio || '',
        status: p.status,
        featured: p.featured,
        seoTitle: p.seoTitle || '',
        seoDescription: p.seoDescription || '',
        categoryIds: (p.categories || []).map((c: any) => c.categoryId),
        productIds: (p.products || []).map((x: any) => x.productId),
        faq: Array.isArray(p.faqJson) && p.faqJson.length ? p.faqJson : [{ question: '', answer: '' }],
      });
      setIsEditing(true);
    })();
  }, [selectedId]);

  const searchProducts = async (q: string) => {
    setProductSearch(q);
    if (q.trim().length < 2) {
      setProductHits([]);
      return;
    }
    const res = await apiFetch(`/api/v1/admin/products?search=${encodeURIComponent(q)}&limit=8`);
    if (res.ok) {
      const d = await res.json();
      setProductHits(d.products || []);
    }
  };

  const save = async () => {
    setError(null);
    setSuccess(null);
    const payload = {
      ...form,
      coverImageUrl: form.coverImageUrl || null,
      faq: form.faq.filter((f) => f.question.trim() && f.answer.trim()),
    };
    const res = await apiFetch(form.id ? `/api/v1/admin/blog/${form.id}` : '/api/v1/admin/blog', {
      method: form.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const d = await res.json();
    if (!res.ok) {
      setError(d.error || 'Save failed');
      return;
    }
    setSuccess('Saved');
    setIsEditing(false);
    onNavigate('/admin/blog');
    load();
  };

  const archive = async (id: string) => {
    await apiFetch(`/api/v1/admin/blog/${id}`, { method: 'DELETE' });
    load();
  };

  if (isEditing) {
    return (
      <div className="p-6 max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black">{form.id ? 'Edit article' : 'New article'}</h1>
          <button type="button" onClick={() => { setIsEditing(false); onNavigate('/admin/blog'); }} className="text-xs font-bold flex items-center gap-1">
            <X className="w-4 h-4" /> Close
          </button>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        {success && <p className="text-xs text-emerald-700">{success}</p>}
        <input className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <textarea className="w-full border rounded-xl px-3 py-2 text-sm" rows={3} placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <textarea className="w-full border rounded-xl px-3 py-2 text-sm font-mono" rows={14} placeholder="Markdown body" value={form.bodyMarkdown} onChange={(e) => setForm({ ...form, bodyMarkdown: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Author" value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} />
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Cover image URL" value={form.coverImageUrl} onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })} />
        </div>
        {form.coverImageUrl ? (
          <img src={form.coverImageUrl} alt="" className="w-full max-h-48 object-cover rounded-xl border" />
        ) : null}
        <textarea className="w-full border rounded-xl px-3 py-2 text-sm" rows={2} placeholder="Author bio" value={form.authorBio} onChange={(e) => setForm({ ...form, authorBio: e.target.value })} />
        <div className="flex gap-4 text-xs font-bold">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
          </label>
          <select className="border rounded-lg px-2 py-1" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <div>
          <p className="text-[11px] font-black uppercase mb-2">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <label key={c.id} className="text-xs font-bold flex items-center gap-1 border rounded-full px-2 py-1">
                <input
                  type="checkbox"
                  checked={form.categoryIds.includes(c.id)}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      categoryIds: e.target.checked
                        ? [...form.categoryIds, c.id]
                        : form.categoryIds.filter((id) => id !== c.id),
                    });
                  }}
                />
                {c.name}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-black uppercase mb-2">Related products</p>
          <input className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Search catalogue…" value={productSearch} onChange={(e) => searchProducts(e.target.value)} />
          <ul className="mt-2 space-y-1">
            {productHits.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="text-xs font-bold text-teal-700"
                  onClick={() => setForm({ ...form, productIds: [...new Set([...form.productIds, p.id])] })}
                >
                  + {p.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-slate-500 mt-1">{form.productIds.length} linked</p>
        </div>
        <div>
          <p className="text-[11px] font-black uppercase mb-2">FAQ</p>
          {form.faq.map((item, i) => (
            <div key={i} className="grid grid-cols-1 gap-1 mb-2">
              <input className="border rounded-lg px-2 py-1 text-xs" placeholder="Question" value={item.question} onChange={(e) => {
                const faq = [...form.faq];
                faq[i] = { ...faq[i], question: e.target.value };
                setForm({ ...form, faq });
              }} />
              <input className="border rounded-lg px-2 py-1 text-xs" placeholder="Answer" value={item.answer} onChange={(e) => {
                const faq = [...form.faq];
                faq[i] = { ...faq[i], answer: e.target.value };
                setForm({ ...form, faq });
              }} />
            </div>
          ))}
          <button type="button" className="text-xs font-bold" onClick={() => setForm({ ...form, faq: [...form.faq, { question: '', answer: '' }] })}>
            Add FAQ row
          </button>
        </div>
        <input className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="SEO title" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
        <input className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="SEO description" value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
        <button type="button" onClick={save} className="bg-teal-600 text-white text-xs font-black px-4 py-2 rounded-xl">
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-black">Blog</h1>
        <button
          type="button"
          onClick={() => {
            setForm(emptyForm);
            setIsEditing(true);
            onNavigate('/admin/blog/new');
          }}
          className="bg-teal-600 text-white text-xs font-black px-3 py-2 rounded-xl flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> New article
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input className="w-full border rounded-xl pl-9 pr-3 py-2 text-sm" placeholder="Search posts" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button type="button" onClick={load} className="border rounded-xl px-3"><RefreshCw className="w-4 h-4" /></button>
      </div>
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="bg-white rounded-2xl border divide-y">
          {posts.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between gap-4">
              {p.coverImageUrl ? (
                <img src={p.coverImageUrl} alt="" className="w-16 h-12 object-cover rounded-lg border shrink-0" />
              ) : (
                <div className="w-16 h-12 rounded-lg bg-slate-100 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black">{p.title}</p>
                <p className="text-[11px] text-slate-500">
                  {p.status} · /{p.slug} · {p.readingMinutes} min
                </p>
              </div>
              <div className="flex gap-2 text-xs font-bold">
                <button type="button" onClick={() => onNavigate(`/admin/blog/${p.id}`)}>Edit</button>
                <button type="button" className="text-red-600" onClick={() => archive(p.id)}>Archive</button>
              </div>
            </div>
          ))}
          {!posts.length && <p className="p-4 text-sm text-slate-500">No posts yet.</p>}
        </div>
      )}
    </div>
  );
};
