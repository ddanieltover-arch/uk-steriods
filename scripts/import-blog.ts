import { PrismaClient, BlogPostStatus } from '@prisma/client';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readingMinutesFromMarkdown, slugify } from '../src/lib/blog/markdown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const imageDir = path.join(projectRoot, 'public', 'blog');

const prisma = new PrismaClient();

const SKIP_SLUGS = new Set(['blog', 'page', 'author', 'category', 'tag']);

function fetchUrl(urlStr: string, redirects = 0): Promise<{ status: number; body: Buffer; contentType: string }> {
  return new Promise((resolve) => {
    if (redirects > 6) {
      resolve({ status: 0, body: Buffer.alloc(0), contentType: '' });
      return;
    }
    const url = new URL(urlStr);
    const lib = url.protocol === 'http:' ? http : https;
    const req = lib.request(
      {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,image/webp,image/*,*/*;q=0.8',
        },
      },
      (res) => {
        const loc = res.headers.location;
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && loc) {
          const next = loc.startsWith('http') ? loc : `${url.protocol}//${url.host}${loc}`;
          res.resume();
          fetchUrl(next, redirects + 1).then(resolve);
          return;
        }
        const chunks: Buffer[] = [];
        res.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        res.on('end', () =>
          resolve({
            status: res.statusCode || 500,
            body: Buffer.concat(chunks),
            contentType: String(res.headers['content-type'] || ''),
          })
        );
      }
    );
    req.on('error', () => resolve({ status: 0, body: Buffer.alloc(0), contentType: '' }));
    req.setTimeout(25000, () => {
      req.destroy();
      resolve({ status: 0, body: Buffer.alloc(0), contentType: '' });
    });
    req.end();
  });
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&rsquo;|&lsquo;/g, "'")
    .replace(/&rdquo;|&ldquo;/g, '"')
    .replace(/&ndash;|&mdash;/g, '—');
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function rewriteHref(href: string): string {
  try {
    const u = href.startsWith('http') ? new URL(href) : new URL(href, 'https://steroids-uk.com');
    if (u.pathname.startsWith('/blog/')) return u.pathname.replace(/\/$/, '');
    if (u.pathname.startsWith('/shop/') || u.pathname.startsWith('/product-category/')) {
      const q = u.pathname.split('/').filter(Boolean).pop() || '';
      return `/shop?q=${encodeURIComponent(q.replace(/-/g, ' '))}`;
    }
    if (u.hostname.includes('steroids-uk.com')) return '/shop';
    return href;
  } catch {
    return href;
  }
}

function htmlToMarkdown(html: string): string {
  let s = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  s = s.replace(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, inner) => {
    return `\n\n${'#'.repeat(Number(level))} ${stripTags(inner)}\n\n`;
  });
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => `- ${stripTags(inner)}\n`);
  s = s.replace(/<\/?(ul|ol)[^>]*>/gi, '\n');
  s = s.replace(/<img[^>]*src="([^"]+)"[^>]*>/gi, '\n\n![]($1)\n\n');
  s = s.replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => {
    return `[${stripTags(inner)}](${rewriteHref(href)})`;
  });
  s = s.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  s = s.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  s = s.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<[^>]+>/g, '');
  s = decodeEntities(s);
  return s.replace(/\n{3,}/g, '\n\n').trim();
}

function extractBetween(html: string, startNeedle: string, endNeedles: string[]): string {
  const startIdx = html.indexOf(startNeedle);
  if (startIdx < 0) return '';
  const from = html.indexOf('>', startIdx);
  if (from < 0) return '';
  let end = html.length;
  for (const n of endNeedles) {
    const i = html.indexOf(n, from);
    if (i > from && i < end) end = i;
  }
  return html.slice(from + 1, end);
}

function parseDate(html: string): Date {
  const m = html.match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(20\d{2})/i);
  if (!m) return new Date();
  return new Date(`${m[2]} ${m[1]}, ${m[3]} UTC`);
}

function parseAuthor(html: string): string {
  if (html.includes('Dr. Aditya K. Sharma')) return 'Dr. Aditya K. Sharma';
  if (/>Tom</.test(html) || html.includes('"Tom"')) return 'Tom';
  return 'Editorial Team';
}

function detectCategories(title: string, body: string): string[] {
  const t = `${title} ${body}`.toLowerCase();
  const cats: string[] = [];
  if (/pct|nolvadex|tamoxifen|clomid|clomiphene|post.cycle/.test(t)) cats.push('pct');
  if (/\bsarm|rad-140|rad 140|lgd|mk-677|ostarine|cardarine|ligandrol/.test(t)) cats.push('sarms');
  if (/testosterone|enanthate|cypionate|sustanon|propionate/.test(t)) cats.push('testosterone');
  if (/anavar|oxandrolone|winstrol|stanozolol|dianabol|anadrol|oral/.test(t)) cats.push('oral-steroids');
  cats.push('guides');
  return [...new Set(cats)];
}

function parseFaq(html: string): { question: string; answer: string }[] {
  const chunk = extractBetween(html, '>FAQ<', ['About ', 'Related Articles', 'Shop related']);
  if (!chunk) return [];
  const qs = [...chunk.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi)];
  return qs
    .map((m) => ({ question: stripTags(m[1]), answer: stripTags(m[2]) }))
    .filter((x) => x.question.length > 5 && x.answer.length > 5)
    .slice(0, 8);
}

function metaContent(html: string, prop: string): string {
  const re = new RegExp(`(?:property|name)="${prop}"[^>]*content="([^"]+)"|content="([^"]+)"[^>]*(?:property|name)="${prop}"`, 'i');
  const m = html.match(re);
  return decodeEntities(m?.[1] || m?.[2] || '');
}

function extFromUrl(url: string, contentType: string): string {
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg';
  if (contentType.includes('webp')) return '.webp';
  const m = url.match(/\.(webp|jpg|jpeg|png)(\?|$)/i);
  return m ? `.${m[1].toLowerCase().replace('jpeg', 'jpg')}` : '.webp';
}

async function ensureCategories() {
  const defs = [
    { name: 'Guides', slug: 'guides', sortOrder: 1 },
    { name: 'PCT', slug: 'pct', sortOrder: 2 },
    { name: 'SARMs', slug: 'sarms', sortOrder: 3 },
    { name: 'Testosterone', slug: 'testosterone', sortOrder: 4 },
    { name: 'Oral steroids', slug: 'oral-steroids', sortOrder: 5 },
  ];
  const map: Record<string, string> = {};
  for (const c of defs) {
    const row = await prisma.blogCategory.upsert({
      where: { slug: c.slug },
      update: { name: c.name, sortOrder: c.sortOrder },
      create: c,
    });
    map[c.slug] = row.id;
  }
  return map;
}

async function downloadCover(imageUrl: string, slug: string): Promise<string | null> {
  if (!imageUrl) return null;
  const res = await fetchUrl(imageUrl);
  if (res.status !== 200 || res.body.length < 500) return null;
  fs.mkdirSync(imageDir, { recursive: true });
  const ext = extFromUrl(imageUrl, res.contentType);
  const filename = `${slug}${ext}`;
  fs.writeFileSync(path.join(imageDir, filename), res.body);
  return `/blog/${filename}`;
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T, i: number) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return out;
}

async function importOne(
  loc: string,
  catMap: Record<string, string>,
  featured: boolean
): Promise<boolean> {
  const slug = loc.replace(/\/$/, '').split('/').pop() || '';
  if (!slug || SKIP_SLUGS.has(slug)) return false;

  const page = await fetchUrl(loc);
  if (page.status !== 200) {
    console.log(`  skip ${slug} status ${page.status}`);
    return false;
  }
  const html = page.body.toString('utf8');
  const title = stripTags(metaContent(html, 'og:title') || html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] || slug);
  const ogImage =
    metaContent(html, 'og:image').includes('shop-media') || metaContent(html, 'og:image').includes('/blog/')
      ? metaContent(html, 'og:image')
      : metaContent(html, 'og:image');
  const coverImageUrl = await downloadCover(ogImage, slugify(slug));

  const prose = extractBetween(html, 'class="article-content', [
    '>FAQ<',
    'Shop related products',
    'Related Articles',
    'About Tom',
    'About Dr.',
  ]);
  let bodyMarkdown = htmlToMarkdown(prose);
  if (bodyMarkdown.length < 80) {
    bodyMarkdown = title;
  }
  bodyMarkdown = `*Educational / research context only. Not medical advice.*\n\n${bodyMarkdown}`;

  const excerpt =
    stripTags(html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] || '').slice(0, 280) || title;
  const faq = parseFaq(html);
  const publishedAt = parseDate(html);
  const authorName = parseAuthor(html);
  const categorySlugs = detectCategories(title, bodyMarkdown);
  const readingMinutes = readingMinutesFromMarkdown(bodyMarkdown);

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  const data = {
    title: title.replace(/\s+\|\s+Steroids UK.*/i, '').trim(),
    excerpt,
    bodyMarkdown,
    coverImageUrl,
    authorName,
    authorBio: null as string | null,
    status: BlogPostStatus.PUBLISHED,
    featured,
    publishedAt,
    readingMinutes,
    seoTitle: `${title.replace(/\s+\|\s+Steroids UK.*/i, '').trim()} | Steroids UK`,
    seoDescription: excerpt.slice(0, 160),
    faqJson: faq,
    deletedAt: null,
  };

  const post = existing
    ? await prisma.blogPost.update({ where: { slug }, data })
    : await prisma.blogPost.create({ data: { slug, ...data } });

  await prisma.blogPostCategory.deleteMany({ where: { postId: post.id } });
  const catIds = categorySlugs.map((s) => catMap[s]).filter(Boolean);
  if (catIds.length) {
    await prisma.blogPostCategory.createMany({
      data: catIds.map((categoryId) => ({ postId: post.id, categoryId })),
      skipDuplicates: true,
    });
  }
  return true;
}

async function main() {
  console.log('Importing Knowledge Hub articles from steroids-uk.com sitemap…');
  fs.mkdirSync(imageDir, { recursive: true });

  const sitemap = await fetchUrl('https://steroids-uk.com/sitemap.xml');
  const locs = [...sitemap.body.toString('utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const articleUrls = locs.filter((u) => /\/blog\/[a-z0-9-]+\/?$/i.test(u) && !u.endsWith('/blog/'));
  console.log(`Found ${articleUrls.length} article URLs`);

  const catMap = await ensureCategories();
  let ok = 0;
  let fail = 0;

  await mapLimit(articleUrls, 4, async (url, i) => {
    try {
      const saved = await importOne(url, catMap, i === 0);
      if (saved) ok += 1;
      else fail += 1;
    } catch (err: any) {
      fail += 1;
      console.log(`  error ${url}: ${err?.message || err}`);
    }
    if ((i + 1) % 10 === 0) console.log(`  progress ${i + 1}/${articleUrls.length} (saved ${ok})`);
  });

  const firstSlug = articleUrls[0]?.replace(/\/$/, '').split('/').pop();
  if (firstSlug) {
    await prisma.blogPost.updateMany({ data: { featured: false } });
    await prisma.blogPost.updateMany({ where: { slug: firstSlug }, data: { featured: true } });
  }

  const total = await prisma.blogPost.count({ where: { status: 'PUBLISHED', deletedAt: null } });
  console.log(`Done. Imported/updated ${ok}, skipped ${fail}. Published posts in DB: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
