import { db } from '../db';
import { Prisma, StockStatus } from '@prisma/client';
import { CatalogueQuery } from '../validation';
import {
  normalizeSearchQuery,
  scoreSearchRelevance,
  SEARCH_QUERY_MIN_LENGTH,
  SEARCH_QUERY_MAX_LENGTH,
} from '../search/ranking';

const LIST_SELECT = {
  id: true,
  name: true,
  slug: true,
  sku: true,
  shortDescription: true,
  basePricePence: true,
  isFeatured: true,
  isPublished: true,
  createdAt: true,
  updatedAt: true,
  brandId: true,
  categoryId: true,
  brand: { select: { id: true, name: true, slug: true } },
  category: { select: { id: true, name: true, slug: true, description: true } },
  images: {
    orderBy: [{ isPrimary: 'desc' as const }, { displayOrder: 'asc' as const }],
    take: 1,
    select: { url: true, altText: true },
  },
  inventory: { select: { availableQuantity: true, stockStatus: true } },
  tags: { select: { tag: { select: { name: true, slug: true } } } },
} satisfies Prisma.ProductSelect;

export interface PublicCatalogueProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  priceGbp: number;
  stockQuantity: number;
  isPublished: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  ratingAvg: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CatalogueApiResult {
  products: PublicCatalogueProduct[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  category?: { id: string; name: string; slug: string; description: string | null };
  brand?: { id: string; name: string; slug: string; description: string | null };
}

function publishedWhere(): Prisma.ProductWhereInput {
  return { isPublished: true, deletedAt: null };
}

function mapListProduct(
  row: any,
  ratings?: { avg: number; count: number }
): PublicCatalogueProduct {
  const stock =
    row.inventory?.availableQuantity ??
    (row.variants?.[0]?.inventory?.availableQuantity ?? 0);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku,
    brandId: row.brandId,
    brandName: row.brand?.name || '',
    categoryId: row.categoryId,
    categoryName: row.category?.name || '',
    categorySlug: row.category?.slug || '',
    priceGbp: (row.basePricePence || 0) / 100,
    stockQuantity: stock,
    isPublished: true,
    isFeatured: !!row.isFeatured,
    isBestseller: false,
    ratingAvg: ratings?.avg || 0,
    reviewCount: ratings?.count || 0,
    shortDescription: row.shortDescription || '',
    description: row.description || row.shortDescription || '',
    images: (row.images || []).map((img: { url: string }) => img.url).filter(Boolean),
    tags: (row.tags || []).map((t: { tag: { name: string } }) => t.tag.name),
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
  };
}

async function ratingsByProductIds(ids: string[]): Promise<Map<string, { avg: number; count: number }>> {
  const map = new Map<string, { avg: number; count: number }>();
  if (ids.length === 0) return map;

  const grouped = await db.review.groupBy({
    by: ['productId'],
    where: { isApproved: true, productId: { in: ids } },
    _avg: { rating: true },
    _count: { _all: true },
  });

  for (const row of grouped) {
    map.set(row.productId, {
      avg: row._avg.rating ? Math.round(row._avg.rating * 10) / 10 : 0,
      count: row._count._all,
    });
  }
  return map;
}

export class CatalogueApiService {
  static async list(query: CatalogueQuery): Promise<CatalogueApiResult> {
    const page = query.page || 1;
    const limit = Math.min(48, query.limit || 12);
    const skip = (page - 1) * limit;

    const where = await this.buildWhere(query);

    const orderBy = this.buildOrderBy(query.sort);

    const [rows, totalCount, category, brand] = await Promise.all([
      db.product.findMany({
        where,
        select: LIST_SELECT,
        orderBy,
        skip,
        take: limit,
      }),
      db.product.count({ where }),
      query.category
        ? db.category.findUnique({
            where: { slug: query.category },
            select: { id: true, name: true, slug: true, description: true },
          })
        : Promise.resolve(null),
      query.brand
        ? db.brand.findUnique({
            where: { slug: query.brand },
            select: { id: true, name: true, slug: true, description: true },
          })
        : Promise.resolve(null),
    ]);

    const ratings = await ratingsByProductIds(rows.map((r) => r.id));
    const products = rows.map((row) => mapListProduct(row, ratings.get(row.id)));

    return {
      products,
      totalCount,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(totalCount / limit)),
      category: category || undefined,
      brand: brand || undefined,
    };
  }

  /**
   * Server-authoritative search with deterministic ranking.
   * Filters in PostgreSQL, scores the matching page-sized candidate set.
   */
  static async search(rawQuery: string, page = 1, limit = 24): Promise<CatalogueApiResult> {
    const q = normalizeSearchQuery(rawQuery);
    if (q.length < SEARCH_QUERY_MIN_LENGTH) {
      return { products: [], totalCount: 0, page: 1, limit, totalPages: 1 };
    }

    const take = Math.min(48, Math.max(1, limit));
    const currentPage = Math.max(1, page);

    const where: Prisma.ProductWhereInput = {
      ...publishedWhere(),
      OR: [
        { sku: { equals: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
        { name: { contains: q, mode: 'insensitive' } },
        { shortDescription: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { brand: { name: { contains: q, mode: 'insensitive' } } },
        { category: { name: { contains: q, mode: 'insensitive' } } },
        { tags: { some: { tag: { name: { contains: q, mode: 'insensitive' } } } } },
      ],
    };

    const candidates = await db.product.findMany({
      where,
      select: {
        ...LIST_SELECT,
        description: true,
      },
      take: 200,
    });

    const scored = candidates
      .map((row) => {
        const mapped = mapListProduct(row);
        return {
          product: mapped,
          score: scoreSearchRelevance(q, {
            sku: mapped.sku,
            name: mapped.name,
            brandName: mapped.brandName,
            categoryName: mapped.categoryName,
            tags: mapped.tags,
            shortDescription: mapped.shortDescription,
            description: row.description,
          }),
          featured: mapped.isFeatured,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.product.name.localeCompare(b.product.name);
      });

    const totalCount = scored.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / take));
    const slice = scored.slice((currentPage - 1) * take, currentPage * take);
    const ratings = await ratingsByProductIds(slice.map((s) => s.product.id));

    return {
      products: slice.map((s) => ({
        ...s.product,
        ratingAvg: ratings.get(s.product.id)?.avg || 0,
        reviewCount: ratings.get(s.product.id)?.count || 0,
      })),
      totalCount,
      page: currentPage,
      limit: take,
      totalPages,
    };
  }

  static async suggestions(rawQuery: string) {
    const q = normalizeSearchQuery(rawQuery);
    if (q.length < SEARCH_QUERY_MIN_LENGTH) {
      return { products: [], brands: [], categories: [] };
    }

    const [products, brands, categories] = await Promise.all([
      db.product.findMany({
        where: {
          ...publishedWhere(),
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { sku: { contains: q, mode: 'insensitive' } },
          ],
        },
        select: { id: true, name: true, slug: true, sku: true },
        take: 6,
        orderBy: { name: 'asc' },
      }),
      db.brand.findMany({
        where: { name: { contains: q, mode: 'insensitive' } },
        select: { id: true, name: true, slug: true },
        take: 4,
        orderBy: { name: 'asc' },
      }),
      db.category.findMany({
        where: { name: { contains: q, mode: 'insensitive' } },
        select: { id: true, name: true, slug: true },
        take: 4,
        orderBy: { name: 'asc' },
      }),
    ]);

    return { products, brands, categories };
  }

  static async getPublishedById(id: string) {
    const product = await db.product.findFirst({
      where: { ...publishedWhere(), id },
      include: {
        brand: { select: { id: true, name: true, slug: true } },
        category: { select: { id: true, name: true, slug: true, description: true } },
        images: {
          orderBy: [{ isPrimary: 'desc' }, { displayOrder: 'asc' }],
          select: { url: true, altText: true, isPrimary: true },
        },
        inventory: { select: { availableQuantity: true, stockStatus: true } },
        tags: { select: { tag: { select: { name: true, slug: true } } } },
        variants: {
          include: {
            inventory: { select: { availableQuantity: true, stockStatus: true } },
          },
        },
        reviews: {
          where: { isApproved: true },
          select: { rating: true },
        },
      },
    });

    if (!product) return null;

    const reviewCount = product.reviews.length;
    const ratingAvg =
      reviewCount > 0
        ? Math.round((product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10
        : 0;

    const { reviews, ...rest } = product;
    return {
      ...mapListProduct(
        { ...rest, description: product.description, images: product.images },
        { avg: ratingAvg, count: reviewCount }
      ),
      description: product.description,
      images: product.images.map((img) => img.url),
      variants: product.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        name: v.name,
        priceGbp: v.pricePence / 100,
        stockQuantity: v.inventory?.availableQuantity ?? 0,
        attributes: v.attributes,
      })),
    };
  }

  static async getPublishedBySlug(slug: string) {
    const product = await db.product.findFirst({
      where: { ...publishedWhere(), OR: [{ slug }, { id: slug }] },
      include: {
        brand: { select: { id: true, name: true, slug: true } },
        category: { select: { id: true, name: true, slug: true, description: true } },
        images: {
          orderBy: [{ isPrimary: 'desc' }, { displayOrder: 'asc' }],
          select: { url: true, altText: true, isPrimary: true },
        },
        inventory: { select: { availableQuantity: true, stockStatus: true } },
        tags: { select: { tag: { select: { name: true, slug: true } } } },
        variants: {
          include: {
            inventory: { select: { availableQuantity: true, stockStatus: true } },
          },
        },
        reviews: {
          where: { isApproved: true },
          select: { rating: true },
        },
      },
    });

    if (!product) return null;

    const reviewCount = product.reviews.length;
    const ratingAvg =
      reviewCount > 0
        ? Math.round((product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10
        : 0;

    const { reviews, ...rest } = product;
    return {
      ...mapListProduct(
        { ...rest, description: product.description, images: product.images },
        { avg: ratingAvg, count: reviewCount }
      ),
      description: product.description,
      images: product.images.map((img) => img.url),
      variants: product.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        name: v.name,
        priceGbp: v.pricePence / 100,
        stockQuantity: v.inventory?.availableQuantity ?? 0,
        attributes: v.attributes,
      })),
    };
  }

  private static async buildWhere(query: CatalogueQuery): Promise<Prisma.ProductWhereInput> {
    const where: Prisma.ProductWhereInput = { ...publishedWhere() };

    if (query.category) {
      where.category = { slug: query.category };
    }

    if (query.brand) {
      where.brand = { slug: query.brand };
    }

    if (query.brandIds && query.brandIds.length > 0) {
      where.brandId = { in: query.brandIds };
    }

    if (query.minPrice && query.minPrice > 0) {
      where.basePricePence = { ...(where.basePricePence as object), gte: Math.round(query.minPrice * 100) };
    }
    if (query.maxPrice && query.maxPrice < 1000) {
      where.basePricePence = { ...(where.basePricePence as object), lte: Math.round(query.maxPrice * 100) };
    }

    if (query.availability === 'in_stock') {
      where.OR = [
        { inventory: { availableQuantity: { gt: 0 }, stockStatus: { not: StockStatus.OUT_OF_STOCK } } },
        { variants: { some: { inventory: { availableQuantity: { gt: 0 } } } } },
      ];
    }

    if (query.search && query.search.trim().length >= SEARCH_QUERY_MIN_LENGTH) {
      const q = normalizeSearchQuery(query.search);
      where.AND = [
        {
          OR: [
            { sku: { contains: q, mode: 'insensitive' } },
            { name: { contains: q, mode: 'insensitive' } },
            { shortDescription: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { brand: { name: { contains: q, mode: 'insensitive' } } },
            { category: { name: { contains: q, mode: 'insensitive' } } },
            { tags: { some: { tag: { name: { contains: q, mode: 'insensitive' } } } } },
          ],
        },
      ];
    }

    return where;
  }

  private static buildOrderBy(sort?: CatalogueQuery['sort']): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case 'price_asc':
        return [{ basePricePence: 'asc' }, { name: 'asc' }];
      case 'price_desc':
        return [{ basePricePence: 'desc' }, { name: 'asc' }];
      case 'newest':
        return [{ createdAt: 'desc' }];
      case 'name_asc':
        return [{ name: 'asc' }];
      case 'name_desc':
        return [{ name: 'desc' }];
      case 'bestselling':
      case 'featured':
      default:
        return [{ isFeatured: 'desc' }, { createdAt: 'desc' }];
    }
  }
}

export { SEARCH_QUERY_MIN_LENGTH, SEARCH_QUERY_MAX_LENGTH };
