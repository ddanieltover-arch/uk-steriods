import React from 'react';

export interface BlogPostCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string | null;
  authorName: string;
  publishedAt: string | null;
  readingMinutes: number;
  featured?: boolean;
  categories: { name: string; slug: string }[];
}

function Cover({ src, alt, className }: { src?: string | null; alt: string; className?: string }) {
  if (!src) {
    return <div className={`bg-gradient-to-br from-[#003d30] to-emerald-800 ${className || ''}`} aria-hidden />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}

export const BlogCard: React.FC<{
  post: BlogPostCard;
  featured?: boolean;
  onNavigate: (path: string) => void;
}> = ({ post, featured, onNavigate }) => {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

  const open = () => onNavigate(`/blog/${post.slug}`);

  if (featured) {
    return (
      <article className="rounded-2xl border border-emerald-100 bg-white overflow-hidden shadow-sm">
        <button type="button" onClick={open} className="block w-full cursor-pointer">
          <Cover src={post.coverImageUrl} alt="" className="w-full h-56 md:h-72 object-cover" />
        </button>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((c) => (
              <span key={c.slug} className="text-[10px] font-black uppercase tracking-wider text-[#157a62] bg-emerald-50 px-2 py-0.5 rounded">
                {c.name}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            <button type="button" className="text-left hover:text-[#157a62] cursor-pointer" onClick={open}>
              {post.title}
            </button>
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">{post.excerpt}</p>
          <Meta post={post} date={date} onOpen={open} />
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <button type="button" onClick={open} className="sm:w-52 shrink-0 cursor-pointer">
          <Cover src={post.coverImageUrl} alt="" className="w-full h-40 sm:h-full object-cover min-h-[8rem]" />
        </button>
        <div className="p-5 min-w-0">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((c) => (
              <span key={c.slug} className="text-[10px] font-black uppercase tracking-wider text-[#157a62] bg-emerald-50 px-2 py-0.5 rounded">
                {c.name}
              </span>
            ))}
          </div>
          <h2 className="text-lg font-black text-slate-900">
            <button type="button" className="text-left hover:text-[#157a62] cursor-pointer" onClick={open}>
              {post.title}
            </button>
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">{post.excerpt}</p>
          <Meta post={post} date={date} onOpen={open} />
        </div>
      </div>
    </article>
  );
};

function Meta({
  post,
  date,
  onOpen,
}: {
  post: BlogPostCard;
  date: string;
  onOpen: () => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500">
      <span>{post.authorName}</span>
      <span>{date}</span>
      <span>{post.readingMinutes} min read</span>
      <button type="button" onClick={onOpen} className="text-[#157a62] uppercase tracking-wider cursor-pointer">
        Read article
      </button>
    </div>
  );
}
