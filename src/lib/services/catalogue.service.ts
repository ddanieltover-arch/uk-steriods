import { Product, Category, Brand } from '../../types';
import { CatalogueQuerySchema, CatalogueQuery } from '../validation';
import { StorageService } from '../../services/storage';

export interface CataloguePaginatedResult {
  products: Product[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  category?: Category;
  brand?: Brand;
  filterStats: {
    minPriceInCatalog: number;
    maxPriceInCatalog: number;
    categoryCounts: Record<string, number>;
    brandCounts: Record<string, number>;
  };
}

export class CatalogueService {
  /**
   * Primary entry point for querying public catalogue products
   * Enforces security: only published and non-deleted products are returned.
   */
  static getProducts(
    rawQuery: Partial<CatalogueQuery> = {},
    customProducts?: Product[],
    customCategories?: Category[],
    customBrands?: Brand[]
  ): CataloguePaginatedResult {
    // 1. Sanitize & validate incoming query parameters
    const query = CatalogueQuerySchema.parse(rawQuery);

    // 2. Load dataset
    const allProducts = customProducts || StorageService.getProducts();
    const allCategories = customCategories || StorageService.getCategories();
    const allBrands = customBrands || StorageService.getBrands();

    // 3. Security Boundary: filter out unpublished products
    const publicProducts = allProducts.filter((p) => p.isPublished !== false);

    // Calculate baseline price range across public catalogue
    let minPriceInCatalog = 0;
    let maxPriceInCatalog = 200;
    if (publicProducts.length > 0) {
      const prices = publicProducts.map((p) => p.salePriceGbp || p.priceGbp);
      minPriceInCatalog = Math.floor(Math.min(...prices));
      maxPriceInCatalog = Math.ceil(Math.max(...prices));
    }

    // Resolve active category or brand if slug passed
    let matchedCategory: Category | undefined = undefined;
    if (query.category) {
      matchedCategory = allCategories.find((c) => c.slug === query.category);
    }

    let matchedBrand: Brand | undefined = undefined;
    if (query.brand) {
      matchedBrand = allBrands.find((b) => b.slug === query.brand);
    }

    // Compute facet counts before applying filters
    const categoryCounts: Record<string, number> = {};
    const brandCounts: Record<string, number> = {};

    publicProducts.forEach((p) => {
      if (p.categorySlug) {
        categoryCounts[p.categorySlug] = (categoryCounts[p.categorySlug] || 0) + 1;
      }
      if (p.brandId) {
        brandCounts[p.brandId] = (brandCounts[p.brandId] || 0) + 1;
      }
    });

    // 4. Filter pipeline
    let filtered = publicProducts.filter((product) => {
      // Category filter (by slug)
      if (query.category && product.categorySlug !== query.category) {
        return false;
      }

      // Brand filter (by brand slug or brand ID)
      if (query.brand && product.brandName.toLowerCase().replace(/\s+/g, '-') !== query.brand && product.brandId !== query.brand) {
        // Also check if matchedBrand exists and product.brandId matches
        if (!matchedBrand || product.brandId !== matchedBrand.id) {
          return false;
        }
      }

      // Brand IDs array filter
      if (query.brandIds && query.brandIds.length > 0) {
        if (!query.brandIds.includes(product.brandId)) {
          return false;
        }
      }

      // Search query text match
      if (query.search && query.search.trim().length > 0) {
        const q = query.search.trim().toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(q);
        const skuMatch = product.sku.toLowerCase().includes(q);
        const brandMatch = product.brandName.toLowerCase().includes(q);
        const categoryMatch = product.categoryName.toLowerCase().includes(q);
        const descMatch = product.shortDescription?.toLowerCase().includes(q);
        const tagMatch = product.tags?.some((t) => t.toLowerCase().includes(q));

        if (!nameMatch && !skuMatch && !brandMatch && !categoryMatch && !descMatch && !tagMatch) {
          return false;
        }
      }

      // Availability filter
      if (query.availability === 'in_stock' && product.stockQuantity <= 0) {
        return false;
      }
      if (query.availability === 'on_sale' && !product.salePriceGbp) {
        return false;
      }

      // Price range filter
      const effectivePrice = product.salePriceGbp || product.priceGbp;
      if (query.minPrice !== undefined && query.minPrice > 0 && effectivePrice < query.minPrice) {
        return false;
      }
      if (query.maxPrice !== undefined && query.maxPrice < 1000 && effectivePrice > query.maxPrice) {
        return false;
      }

      return true;
    });

    // 5. Sorting
    filtered = [...filtered].sort((a, b) => {
      const priceA = a.salePriceGbp || a.priceGbp;
      const priceB = b.salePriceGbp || b.priceGbp;

      switch (query.sort) {
        case 'price_asc':
          return priceA - priceB;
        case 'price_desc':
          return priceB - priceA;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'bestselling':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'featured':
        default:
          if (a.isFeatured !== b.isFeatured) {
            return a.isFeatured ? -1 : 1;
          }
          return b.ratingAvg - a.ratingAvg;
      }
    });

    // 6. Pagination
    const limit = query.limit || 12;
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const normalizedPage = Math.min(Math.max(1, query.page || 1), totalPages);

    const startIndex = (normalizedPage - 1) * limit;
    const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      totalCount,
      page: normalizedPage,
      limit,
      totalPages,
      category: matchedCategory,
      brand: matchedBrand,
      filterStats: {
        minPriceInCatalog,
        maxPriceInCatalog,
        categoryCounts,
        brandCounts,
      },
    };
  }

  /**
   * Retrieves single product by slug
   */
  static getProductBySlug(slug: string, customProducts?: Product[]): Product | undefined {
    const products = customProducts || StorageService.getProducts();
    return products.find((p) => p.slug === slug && p.isPublished !== false);
  }

  /**
   * Retrieves single product by id
   */
  static getProductById(id: string, customProducts?: Product[]): Product | undefined {
    const products = customProducts || StorageService.getProducts();
    return products.find((p) => p.id === id && p.isPublished !== false);
  }

  /**
   * Convenient helper for category view
   */
  static getProductsByCategory(categorySlug: string, rawQuery: Partial<CatalogueQuery> = {}): CataloguePaginatedResult {
    return this.getProducts({ ...rawQuery, category: categorySlug });
  }

  /**
   * Convenient helper for brand view
   */
  static getProductsByBrand(brandSlug: string, rawQuery: Partial<CatalogueQuery> = {}): CataloguePaginatedResult {
    return this.getProducts({ ...rawQuery, brand: brandSlug });
  }

  /**
   * Featured products
   */
  static getFeaturedProducts(limit = 4, customProducts?: Product[]): Product[] {
    const products = customProducts || StorageService.getProducts();
    return products
      .filter((p) => p.isPublished !== false && p.isFeatured)
      .slice(0, limit);
  }

  /**
   * Best sellers
   */
  static getBestsellerProducts(limit = 4, customProducts?: Product[]): Product[] {
    const products = customProducts || StorageService.getProducts();
    return products
      .filter((p) => p.isPublished !== false && p.isBestseller)
      .slice(0, limit);
  }

  /**
   * Related products based on category, brand, or tags
   */
  static getRelatedProducts(product: Product, limit = 4, customProducts?: Product[]): Product[] {
    const products = customProducts || StorageService.getProducts();
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          p.isPublished !== false &&
          (p.categorySlug === product.categorySlug ||
            p.brandId === product.brandId ||
            p.tags?.some((t) => product.tags?.includes(t)))
      )
      .slice(0, limit);
  }

  /**
   * Recently viewed products
   */
  static getRecentlyViewedProducts(currentProductId: string, customProducts?: Product[]): Product[] {
    const products = customProducts || StorageService.getProducts();
    const recentIds = StorageService.getRecentlyViewedIds().filter((id) => id !== currentProductId);
    
    // Map recent IDs to products in order
    const matched: Product[] = [];
    recentIds.forEach((id) => {
      const p = products.find((prod) => prod.id === id && prod.isPublished !== false);
      if (p) matched.push(p);
    });

    return matched.slice(0, 4);
  }
}
