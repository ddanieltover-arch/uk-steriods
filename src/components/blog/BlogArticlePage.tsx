import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api/client';
import { Container } from '../layout/Container';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { BlogRelatedProducts } from './BlogRelatedProducts';
import { BlogCard, BlogPostCard } from './BlogCard';

interface BlogArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ slug, onNavigate }) => {
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError(null);
      setPost(null);
      const res = await apiFetch(`/api/v1/blog/${encodeURIComponent(slug)}`);
      if (cancelled) return;
      if (!res.ok) {
        setError('Article not found.');
        return;
      }
      const d = await res.json();
      setPost(d.post);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <Container className="py-16">
        <p className="text-sm text-slate-600">{error}</p>
        <button type="button" className="mt-4 text-xs font-bold text-[#157a62]" onClick={() => onNavigate('/blog')}>
          Back to blog
        </button>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="py-16">
        <p className="text-sm text-slate-500">Loading article…</p>
      </Container>
    );
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

  return (
    <>
      <SeoHead
        title={post.seoTitle || `${post.title} | ${SITE_NAME}`}
        description={post.seoDescription || post.excerpt}
        canonical={`${window.location.origin}/blog/${post.slug}`}
        ogType="article"
        ogImage={post.coverImageUrl || undefined}
      />
      <Container className="py-10 max-w-4xl">
        <button type="button" onClick={() => onNavigate('/blog')} className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-6 cursor-pointer">
          Home / Blog
        </button>
        <div className="flex flex-wrap gap-2 mb-3">
          {(post.categories || []).map((c: { slug: string; name: string }) => (
            <span key={c.slug} className="text-[10px] font-black uppercase tracking-wider text-[#157a62] bg-emerald-50 px-2 py-0.5 rounded">
              {c.name}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">{post.title}</h1>
        <p className="mt-3 text-xs font-bold text-slate-500">
          {post.authorName} · {date} · {post.readingMinutes} min read
        </p>
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt=""
            className="mt-6 w-full rounded-2xl object-cover max-h-[420px] border border-slate-200"
          />
        )}
        <p className="mt-6 text-sm text-slate-500 border border-amber-100 bg-amber-50 rounded-xl px-4 py-3">
          Educational / research context only. Not medical advice. Products are not intended to treat or prevent disease.
        </p>
        <div
          className="mt-8 prose-blog text-slate-700 text-sm leading-relaxed space-y-4 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h3]:font-black [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-[#157a62] [&_a]:font-bold"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        {post.faq?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-black text-slate-900 mb-4">FAQ</h2>
            <div className="space-y-4">
              {post.faq.map((item: { question: string; answer: string }) => (
                <div key={item.question} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="text-sm font-black text-slate-900">{item.question}</h3>
                  <p className="text-sm text-slate-600 mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {post.authorBio && (
          <section className="mt-10 rounded-2xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">About {post.authorName}</p>
            <p className="text-sm text-slate-600 mt-2">{post.authorBio}</p>
          </section>
        )}

        <BlogRelatedProducts products={post.relatedProducts || []} />

        {post.relatedPosts?.length > 0 && (
          <section className="mt-12 space-y-4">
            <h2 className="text-lg font-black text-slate-900">Related articles</h2>
            {post.relatedPosts.map((p: BlogPostCard) => (
              <BlogCard key={p.id} post={p} onNavigate={onNavigate} />
            ))}
          </section>
        )}

        <div className="mt-10 flex justify-between text-xs font-bold">
          {post.newer ? (
            <button type="button" className="text-[#157a62] cursor-pointer" onClick={() => onNavigate(`/blog/${post.newer.slug}`)}>
              Newer: {post.newer.title}
            </button>
          ) : (
            <span />
          )}
          {post.older && (
            <button type="button" className="text-[#157a62] cursor-pointer" onClick={() => onNavigate(`/blog/${post.older.slug}`)}>
              Older: {post.older.title}
            </button>
          )}
        </div>
      </Container>
    </>
  );
};
