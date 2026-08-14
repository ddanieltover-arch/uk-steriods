import React from 'react';

export const BlogSidebar: React.FC<{
  categories: { name: string; slug: string; postCount?: number }[];
  recent: { slug: string; title: string; publishedAt?: string | null }[];
  activeSlug?: string;
  onSelectCategory: (slug: string) => void;
  onNavigate: (path: string) => void;
}> = ({ categories, recent, activeSlug, onSelectCategory, onNavigate }) => {
  return (
    <aside className="space-y-8 lg:pb-4">
      <div>
        <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-3">Categories</h3>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              onClick={() => onSelectCategory('')}
              className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl cursor-pointer ${
                !activeSlug ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              All articles
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() => onSelectCategory(c.slug)}
                className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl cursor-pointer flex justify-between ${
                  activeSlug === c.slug ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{c.name}</span>
                {typeof c.postCount === 'number' && <span className="text-slate-400">{c.postCount}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-3">Recent posts</h3>
        <ul className="space-y-3">
          {recent.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => onNavigate(`/blog/${p.slug}`)}
                className="text-left text-xs font-bold text-slate-700 hover:text-[#157a62] cursor-pointer"
              >
                {p.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
