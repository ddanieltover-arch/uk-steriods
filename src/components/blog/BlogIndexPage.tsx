import { SITE_NAME } from '../../lib/seo/site';
import { SeoHead } from '../seo/SeoHead';
import { Container } from '../layout/Container';
import { BlogSidebar } from './BlogSidebar';
import { BlogCard, BlogPostCard } from './BlogCard';
import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';

interface BlogIndexPageProps {
  path: string;
  onNavigate: (path: string) => void;
}

function pageNumbers(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  for (const n of sorted) {
    if (out.length && typeof out[out.length - 1] === 'number' && n - (out[out.length - 1] as number) > 1) {
      out.push('…');
    }
    out.push(n);
  }
  return out;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ path, onNavigate }) => {
  const query = path.includes('?') ? path.slice(path.indexOf('?') + 1) : '';
  const params = new URLSearchParams(query);
  const category = params.get('category') || '';
  const page = Number(params.get('page') || '1') || 1;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const qs = new URLSearchParams();
      qs.set('page', String(page));
      if (category) qs.set('category', category);
      const [listRes, catRes] = await Promise.all([
        apiFetch(`/api/v1/blog?${qs.toString()}`),
        apiFetch('/api/v1/blog/categories'),
      ]);
      if (cancelled) return;
      if (listRes.ok) setData(await listRes.json());
      if (catRes.ok) {
        const d = await catRes.json();
        setCategories(d.categories || []);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [category, page]);

  const go = (nextPage: number, nextCategory?: string) => {
    const q = new URLSearchParams();
    const cat = nextCategory === undefined ? category : nextCategory;
    if (cat) q.set('category', cat);
    if (nextPage > 1) q.set('page', String(nextPage));
    const suffix = q.toString();
    onNavigate(suffix ? `/blog?${suffix}` : '/blog');
  };

  const total = data?.totalCount || 0;

  return (
    <>
      <SeoHead
        title={`Knowledge Hub | ${SITE_NAME}`}
        description="Guides and research notes on compounds, PCT, and stacking — for educational context only."
        canonical={`${window.location.origin}/blog`}
      />
      <Container className="py-10">
        <div className="mb-8">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#157a62]">Resources</p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1">Knowledge Hub</h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            Expert-style guides for your catalogue research. Educational only — not medical advice.
          </p>
          <p className="text-xs font-bold text-slate-400 mt-2">{total} articles</p>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading articles…</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              {data?.featured && (
                <BlogCard post={data.featured as BlogPostCard} featured onNavigate={onNavigate} />
              )}
              {(data?.posts || []).map((post: BlogPostCard) => (
                <BlogCard key={post.id} post={post} onNavigate={onNavigate} />
              ))}
              {!data?.featured && !(data?.posts || []).length && (
                <p className="text-sm text-slate-500">No published articles in this category yet.</p>
              )}
              {data && data.totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => go(page - 1)}
                    className="px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg disabled:opacity-40 cursor-pointer"
                  >
                    Previous
                  </button>
                  {pageNumbers(page, data.totalPages).map((item, idx) =>
                    item === '…' ? (
                      <span key={`e${idx}`} className="text-xs text-slate-400 px-1">
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => go(item)}
                        className={`min-w-8 px-2 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
                          item === page
                            ? 'bg-[#003d30] text-white'
                            : 'border border-slate-300 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    disabled={page >= data.totalPages}
                    onClick={() => go(page + 1)}
                    className="px-3 py-1.5 text-xs font-bold border border-slate-800 rounded-lg disabled:opacity-40 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <div className="lg:col-span-4 lg:self-start lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <BlogSidebar
                categories={categories}
                recent={data?.recent || []}
                activeSlug={category}
                onSelectCategory={(slug) => go(1, slug)}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
