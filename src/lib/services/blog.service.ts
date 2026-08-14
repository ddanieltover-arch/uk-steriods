import { BlogPostStatus, Prisma } from '@prisma/client';
import { db } from '../db';
import { markdownToSafeHtml, readingMinutesFromMarkdown, slugify } from '../blog/markdown';

export type BlogFaqItem = { question: string; answer: string };

export interface BlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  bodyMarkdown: string;
  coverImageUrl?: string | null;
  authorName: string;
  authorBio?: string | null;
  status?: BlogPostStatus;
  featured?: boolean;
  publishedAt?: Date | string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  faq?: BlogFaqItem[];
  categoryIds?: string[];
  productIds?: string[];
}

const publicSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  coverImageUrl: true,
  authorName: true,
  authorBio: true,
  featured: true,
  publishedAt: true,
  readingMinutes: true,
  seoTitle: true,
  seoDescription: true,
  faqJson: true,
  updatedAt: true,
  categories: {
    select: { category: { select: { id: true, name: true, slug: true } } },
  },
} satisfies Prisma.BlogPostSelect;

function publishedWhere(): Prisma.BlogPostWhereInput {
  return { status: BlogPostStatus.PUBLISHED, deletedAt: null, publishedAt: { not: null } };
}

function parseFaq(raw: unknown): BlogFaqItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const q = String((item as BlogFaqItem).question || '').trim();
      const a = String((item as BlogFaqItem).answer || '').trim();
      if (!q || !a) return null;
      return { question: q, answer: a };
    })
    .filter((x): x is BlogFaqItem => Boolean(x));
}

function mapCard(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverImageUrl: row.coverImageUrl,
    authorName: row.authorName,
    featured: row.featured,
    publishedAt: row.publishedAt,
    readingMinutes: row.readingMinutes,
    categories: (row.categories || []).map((c: any) => c.category),
  };
}

function mapRelatedProduct(row: any) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    brandName: row.brand?.name || '',
    imageUrl: row.images?.[0]?.url || null,
    pricePence: row.basePricePence,
    stockStatus: row.inventory?.stockStatus || 'IN_STOCK',
    availableQuantity: row.inventory?.availableQuantity ?? 0,
  };
}

export class BlogService {
  static async listCategories() {
    return db.blogCategory.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
        _count: {
          select: {
            posts: { where: { post: publishedWhere() } },
          },
        },
      },
    });
  }

  static async listPublished(opts: { page?: number; limit?: number; category?: string }) {
    const page = Math.max(1, opts.page || 1);
    const limit = Math.min(24, Math.max(1, opts.limit || 12));
    const where: Prisma.BlogPostWhereInput = { ...publishedWhere() };
    if (opts.category) {
      where.categories = { some: { category: { slug: opts.category } } };
    }

    const [totalCount, featuredRow, posts] = await Promise.all([
      db.blogPost.count({ where }),
      page === 1 && !opts.category
        ? db.blogPost.findFirst({
            where,
            orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
            select: publicSelect,
          })
        : Promise.resolve(null),
      db.blogPost.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
        select: publicSelect,
      }),
    ]);

    const featured = featuredRow;
    const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts;

    return {
      totalCount,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(totalCount / limit)),
      featured: featured ? mapCard(featured) : null,
      posts: rest.map(mapCard),
    };
  }

  static async recentPublished(limit = 5) {
    const posts = await db.blogPost.findMany({
      where: publishedWhere(),
      orderBy: { publishedAt: 'desc' },
      take: limit,
      select: { slug: true, title: true, publishedAt: true, readingMinutes: true },
    });
    return posts;
  }

  static async getPublishedBySlug(slug: string) {
    const post = await db.blogPost.findFirst({
      where: { slug, ...publishedWhere() },
      include: {
        categories: { select: { category: { select: { id: true, name: true, slug: true } } } },
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                basePricePence: true,
                isPublished: true,
                deletedAt: true,
                brand: { select: { name: true } },
                images: {
                  orderBy: [{ isPrimary: 'desc' }, { displayOrder: 'asc' }],
                  take: 1,
                  select: { url: true },
                },
                inventory: { select: { availableQuantity: true, stockStatus: true } },
              },
            },
          },
        },
      },
    });
    if (!post) return null;

    const categoryIds = post.categories.map((c) => c.category.id);
    const related = await db.blogPost.findMany({
      where: {
        ...publishedWhere(),
        id: { not: post.id },
        categories: categoryIds.length ? { some: { categoryId: { in: categoryIds } } } : undefined,
      },
      orderBy: { publishedAt: 'desc' },
      take: 4,
      select: publicSelect,
    });

    const siblings = await db.blogPost.findMany({
      where: publishedWhere(),
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true, publishedAt: true },
    });
    const idx = siblings.findIndex((s) => s.slug === post.slug);
    const newer = idx > 0 ? siblings[idx - 1] : null;
    const older = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

    const relatedProducts = post.products
      .map((p) => p.product)
      .filter((p) => p.isPublished && !p.deletedAt)
      .map(mapRelatedProduct);

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      bodyHtml: markdownToSafeHtml(post.bodyMarkdown),
      coverImageUrl: post.coverImageUrl,
      authorName: post.authorName,
      authorBio: post.authorBio,
      publishedAt: post.publishedAt,
      readingMinutes: post.readingMinutes,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      faq: parseFaq(post.faqJson),
      categories: post.categories.map((c) => c.category),
      relatedPosts: related.map(mapCard),
      relatedProducts,
      newer,
      older,
    };
  }

  static async adminList(opts: { search?: string; page?: number; limit?: number; includeDeleted?: boolean }) {
    const page = Math.max(1, opts.page || 1);
    const limit = Math.min(50, Math.max(1, opts.limit || 20));
    const where: Prisma.BlogPostWhereInput = opts.includeDeleted ? {} : { deletedAt: null };
    if (opts.search) {
      where.OR = [
        { title: { contains: opts.search, mode: 'insensitive' } },
        { slug: { contains: opts.search, mode: 'insensitive' } },
      ];
    }
    const [totalCount, posts] = await Promise.all([
      db.blogPost.count({ where }),
      db.blogPost.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          categories: { select: { category: true } },
        },
      }),
    ]);
    return { totalCount, page, limit, posts };
  }

  static async adminGet(id: string) {
    return db.blogPost.findFirst({
      where: { id, deletedAt: null },
      include: {
        categories: { select: { categoryId: true, category: true } },
        products: { select: { productId: true, product: { select: { id: true, name: true, slug: true } } } },
      },
    });
  }

  static async createCategory(input: { name: string; slug?: string; sortOrder?: number }) {
    const slug = input.slug ? slugify(input.slug) : slugify(input.name);
    return db.blogCategory.create({
      data: { name: input.name.trim(), slug, sortOrder: input.sortOrder ?? 0 },
    });
  }

  static async upsertPost(id: string | undefined, input: BlogPostInput) {
    const slug = await this.uniqueSlug(input.slug ? slugify(input.slug) : slugify(input.title), id);
    const status = input.status || BlogPostStatus.DRAFT;
    const publishedAt =
      status === BlogPostStatus.PUBLISHED
        ? input.publishedAt
          ? new Date(input.publishedAt)
          : new Date()
        : input.publishedAt
          ? new Date(input.publishedAt)
          : null;
    const faq = (input.faq || []).filter((f) => f.question.trim() && f.answer.trim());
    const data = {
      slug,
      title: input.title.trim(),
      excerpt: input.excerpt.trim(),
      bodyMarkdown: input.bodyMarkdown,
      coverImageUrl: input.coverImageUrl || null,
      authorName: input.authorName.trim(),
      authorBio: input.authorBio || null,
      status,
      featured: Boolean(input.featured),
      publishedAt,
      readingMinutes: readingMinutesFromMarkdown(input.bodyMarkdown),
      seoTitle: input.seoTitle || null,
      seoDescription: input.seoDescription || null,
      faqJson: faq as Prisma.InputJsonValue,
    };

    const post = id
      ? await db.blogPost.update({ where: { id }, data })
      : await db.blogPost.create({ data });

    await db.blogPostCategory.deleteMany({ where: { postId: post.id } });
    const categoryIds = [...new Set(input.categoryIds || [])];
    if (categoryIds.length) {
      await db.blogPostCategory.createMany({
        data: categoryIds.map((categoryId) => ({ postId: post.id, categoryId })),
      });
    }

    await db.blogPostProduct.deleteMany({ where: { postId: post.id } });
    const productIds = [...new Set(input.productIds || [])];
    if (productIds.length) {
      await db.blogPostProduct.createMany({
        data: productIds.map((productId) => ({ postId: post.id, productId })),
      });
    }

    return this.adminGet(post.id);
  }

  static async archive(id: string) {
    return db.blogPost.update({
      where: { id },
      data: { deletedAt: new Date(), status: BlogPostStatus.DRAFT },
    });
  }

  private static async uniqueSlug(base: string, ignoreId?: string) {
    let slug = base || 'post';
    let n = 2;
    while (true) {
      const existing = await db.blogPost.findFirst({
        where: { slug, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
        select: { id: true },
      });
      if (!existing) return slug;
      slug = `${base}-${n}`;
      n += 1;
    }
  }
}
