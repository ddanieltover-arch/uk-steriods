import React, { useState, useEffect, useTransition } from 'react';
import { CatalogueService, CataloguePaginatedResult } from '../../lib/services/catalogue.service';
import { CatalogueQuery, CatalogueQuerySchema } from '../../lib/validation';
import { Category, Brand, Product, ProductVariant } from '../../types';
import { ProductCard, ProductCardData } from '../commerce/ProductCard';
import { Container } from '../layout/Container';
import { FilterSidebar } from './FilterSidebar';
import { ActiveFiltersBar } from './ActiveFiltersBar';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { CataloguePagination } from './CataloguePagination';
import { CatalogueBreadcrumbs, BreadcrumbItem } from './CatalogueBreadcrumbs';
import { CatalogueSkeleton } from './CatalogueSkeleton';
import { StockStatus } from '@prisma/client';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME, sanitizeMetaText } from '../../lib/seo/site';
import { breadcrumbJsonLd } from '../../lib/seo/structured-data';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  PackageX,
  RotateCcw,
} from 'lucide-react';

interface ShopPageProps {
  categories: Category[];
  brands: Brand[];
  products: Product[];
  wishlist: string[];
  initialCategorySlug?: string;
  initialBrandSlug?: string;
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onNavigate?: (path: string) => void;
}

// Helper to parse query params from window.location.search
function parseUrlQueryParams(): Partial<CatalogueQuery> {
  const searchParams = new URLSearchParams(window.location.search);
  const q = searchParams.get('q') || searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const brandIdsStr = searchParams.get('brandIds');
  const brandIds = brandIdsStr ? brandIdsStr.split(',').filter(Boolean) : [];
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 1000;
  const availability = searchParams.get('availability') || 'all';
  const sort = searchParams.get('sort') || 'featured';
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  return {
    search: q,
    category,
    brand,
    brandIds,
    minPrice,
    maxPrice,
    availability: availability as any,
    sort: sort as any,
    page,
    limit: 12,
  };
}

// Helper to write query object back to browser URL
function updateUrlQueryParams(query: CatalogueQuery, basePath = '/shop') {
  const params = new URLSearchParams();

  if (query.search) params.set('q', query.search);
  if (query.category) params.set('category', query.category);
  if (query.brand) params.set('brand', query.brand);
  if (query.brandIds && query.brandIds.length > 0) params.set('brandIds', query.brandIds.join(','));
  if (query.minPrice > 0) params.set('minPrice', query.minPrice.toString());
  if (query.maxPrice < 1000 && query.maxPrice > 0) params.set('maxPrice', query.maxPrice.toString());
  if (query.availability && query.availability !== 'all') params.set('availability', query.availability);
  if (query.sort && query.sort !== 'featured') params.set('sort', query.sort);
  if (query.page > 1) params.set('page', query.page.toString());

  const queryString = params.toString();
  const newUrl = queryString ? `${basePath}?${queryString}` : basePath;

  if (window.location.pathname + window.location.search !== newUrl) {
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
}

export const ShopPage: React.FC<ShopPageProps> = ({
  categories,
  brands,
  products,
  wishlist,
  initialCategorySlug,
  initialBrandSlug,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  onNavigate,
}) => {
  const [isPending, startTransition] = useTransition();

  // 1. Local state initialized from URL or props
  const [query, setQuery] = useState<CatalogueQuery>(() => {
    const urlQuery = parseUrlQueryParams();
    return CatalogueQuerySchema.parse({
      ...urlQuery,
      category: initialCategorySlug || urlQuery.category || '',
      brand: initialBrandSlug || urlQuery.brand || '',
    });
  });

  const [searchInput, setSearchInput] = useState(query.search || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [draftMobileQuery, setDraftMobileQuery] = useState<CatalogueQuery>(query);
  const [apiResult, setApiResult] = useState<CataloguePaginatedResult | null>(null);
  const [usingApi, setUsingApi] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (query.search) params.set('q', query.search);
    if (query.category) params.set('category', query.category);
    if (query.brand) params.set('brand', query.brand);
    if (query.brandIds?.length) params.set('brandIds', query.brandIds.join(','));
    if (query.minPrice > 0) params.set('minPrice', String(query.minPrice));
    if (query.maxPrice < 1000) params.set('maxPrice', String(query.maxPrice));
    if (query.availability && query.availability !== 'all') params.set('availability', query.availability);
    if (query.sort) params.set('sort', query.sort);
    params.set('page', String(query.page || 1));
    params.set('limit', String(query.limit || 12));

    fetch(`/api/v1/catalogue?${params.toString()}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('catalogue unavailable'))))
      .then((data) => {
        setApiResult({
          products: data.products || [],
          totalCount: data.totalCount || 0,
          page: data.page || 1,
          limit: data.limit || 12,
          totalPages: data.totalPages || 1,
          category: data.category,
          brand: data.brand,
          filterStats: {
            minPriceInCatalog: 0,
            maxPriceInCatalog: 200,
            categoryCounts: {},
            brandCounts: {},
          },
        });
        setUsingApi(true);
      })
      .catch(() => {
        setUsingApi(false);
        setApiResult(null);
      });

    return () => controller.abort();
  }, [query]);

  // Sync state if browser back/forward occurs
  useEffect(() => {
    const handlePopState = () => {
      const urlQuery = parseUrlQueryParams();
      const parsed = CatalogueQuerySchema.parse({
        ...urlQuery,
        category: initialCategorySlug || urlQuery.category || '',
        brand: initialBrandSlug || urlQuery.brand || '',
      });
      setQuery(parsed);
      setSearchInput(parsed.search || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [initialCategorySlug, initialBrandSlug]);

  // Sync initialCategorySlug or initialBrandSlug when props change
  useEffect(() => {
    if (initialCategorySlug !== undefined || initialBrandSlug !== undefined) {
      setQuery((prev) =>
        CatalogueQuerySchema.parse({
          ...prev,
          category: initialCategorySlug !== undefined ? initialCategorySlug : prev.category,
          brand: initialBrandSlug !== undefined ? initialBrandSlug : prev.brand,
          page: 1,
        })
      );
    }
  }, [initialCategorySlug, initialBrandSlug]);

  // Update browser URL on query state changes
  useEffect(() => {
    let basePath = '/shop';
    if (initialCategorySlug) {
      basePath = `/category/${initialCategorySlug}`;
    } else if (initialBrandSlug) {
      basePath = `/brand/${initialBrandSlug}`;
    }
    updateUrlQueryParams(query, basePath);
  }, [query, initialCategorySlug, initialBrandSlug]);

  const localResult: CataloguePaginatedResult = CatalogueService.getProducts(
    query,
    products,
    categories,
    brands
  );
  const catalogueResult = usingApi && apiResult ? apiResult : localResult;

  const seoTitle = catalogueResult.category
    ? `${catalogueResult.category.name} | ${SITE_NAME}`
    : catalogueResult.brand
    ? `${catalogueResult.brand.name} | ${SITE_NAME}`
    : query.search
    ? `Search: ${query.search} | ${SITE_NAME}`
    : `Shop sports nutrition | ${SITE_NAME}`;
  const seoDescription = sanitizeMetaText(
    catalogueResult.category?.description ||
      catalogueResult.brand?.description ||
      'Browse UK Performance sports nutrition formulations. Prices in GBP.',
    160
  );
  const seoCanonical = catalogueResult.category
    ? `${window.location.origin}/category/${catalogueResult.category.slug}`
    : catalogueResult.brand
    ? `${window.location.origin}/brand/${catalogueResult.brand.slug}`
    : `${window.location.origin}/shop`;
  const seoRobots = query.search ? 'noindex,follow' : 'index,follow';
  const breadcrumbJson = breadcrumbJsonLd(
    [
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
      catalogueResult.category
        ? { name: catalogueResult.category.name, path: `/category/${catalogueResult.category.slug}` }
        : catalogueResult.brand
        ? { name: catalogueResult.brand.name, path: `/brand/${catalogueResult.brand.slug}` }
        : null,
    ].filter(Boolean) as { name: string; path: string }[]
  );

  // Handle Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      setQuery((prev) => CatalogueQuerySchema.parse({ ...prev, search: searchInput, page: 1 }));
    });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    startTransition(() => {
      setQuery((prev) => CatalogueQuerySchema.parse({ ...prev, search: '', page: 1 }));
    });
  };

  // Handle Filter Change from Sidebar or Chips
  const handleUpdateQuery = (newPartial: Partial<CatalogueQuery>) => {
    startTransition(() => {
      setQuery((prev) => CatalogueQuerySchema.parse({ ...prev, ...newPartial, page: newPartial.page || 1 }));
    });
  };

  const handleRemoveSingleFilter = (key: keyof CatalogueQuery, value?: any) => {
    startTransition(() => {
      setQuery((prev) => {
        const next = { ...prev, page: 1 };
        if (key === 'search') {
          next.search = '';
          setSearchInput('');
        } else if (key === 'category') {
          next.category = '';
        } else if (key === 'brand') {
          next.brand = '';
        } else if (key === 'brandIds') {
          if (value && next.brandIds) {
            next.brandIds = next.brandIds.filter((id) => id !== value);
          } else {
            next.brandIds = [];
          }
        } else if (key === 'availability') {
          next.availability = 'all';
        } else if (key === 'minPrice' || key === 'maxPrice') {
          next.minPrice = 0;
          next.maxPrice = 1000;
        }
        return CatalogueQuerySchema.parse(next);
      });
    });
  };

  const handleClearAllFilters = () => {
    setSearchInput('');
    startTransition(() => {
      setQuery(
        CatalogueQuerySchema.parse({
          category: initialCategorySlug || '',
          brand: initialBrandSlug || '',
          search: '',
          brandIds: [],
          minPrice: 0,
          maxPrice: 1000,
          availability: 'all',
          sort: 'featured',
          page: 1,
          limit: 12,
        })
      );
    });
  };

  // Build Breadcrumbs Array
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Shop', href: '/shop' }];
  if (catalogueResult.category) {
    breadcrumbs.push({ label: catalogueResult.category.name, active: true });
  } else if (catalogueResult.brand) {
    breadcrumbs.push({ label: catalogueResult.brand.name, active: true });
  } else if (query.search) {
    breadcrumbs.push({ label: `Search: "${query.search}"`, active: true });
  } else {
    breadcrumbs[0].active = true;
  }

  // Convert Product to ProductCardData format
  const mapToCardData = (p: Product): ProductCardData => ({
    id: p.id,
    name: p.name,
    brandName: p.brandName,
    sku: p.sku,
    imageUrl: p.images && p.images.length > 0 ? p.images[0] : null,
    pricePence: Math.round((p.salePriceGbp || p.priceGbp) * 100),
    compareAtPricePence: p.salePriceGbp ? Math.round(p.priceGbp * 100) : undefined,
    ratingAvg: p.ratingAvg,
    reviewCount: p.reviewCount,
    stockStatus: p.stockQuantity <= 0 ? StockStatus.OUT_OF_STOCK : StockStatus.IN_STOCK,
    availableQuantity: p.stockQuantity,
    isBestseller: p.isBestseller,
    isOnSale: !!p.salePriceGbp,
    isNew: p.isFeatured,
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonical={seoCanonical}
        robots={seoRobots}
        jsonLd={[breadcrumbJson]}
      />
      <Container className="pt-4">
        {/* Breadcrumbs */}
        <CatalogueBreadcrumbs
          items={breadcrumbs}
          onNavigate={(path) => {
            if (onNavigate) onNavigate(path);
            else window.location.assign(path);
          }}
        />

        {/* Dynamic Page Header & Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-black uppercase text-teal-600 tracking-widest block">
                UK Performance Range
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {catalogueResult.category
                  ? catalogueResult.category.name
                  : catalogueResult.brand
                  ? `${catalogueResult.brand.name} Formulations`
                  : query.search
                  ? `Search: "${query.search}"`
                  : 'Complete Sports Catalogue'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {catalogueResult.category
                  ? catalogueResult.category.description || 'Targeted sports nutrition and recovery complexes.'
                  : catalogueResult.brand
                  ? catalogueResult.brand.description || 'Manufactured according to UK performance specs.'
                  : 'Cold-filtered isolates, intra-workout electrolytes, and endurance complexes.'}
              </p>
            </div>

            {/* Quick Search Input */}
            <form onSubmit={handleSearchSubmit} className="w-full md:w-80 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products, SKUs, brands..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-8 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 shrink-0 sticky top-24">
            <FilterSidebar
              categories={categories}
              brands={brands}
              filters={{
                searchQuery: query.search || '',
                categorySlug: query.category || '',
                brandIds: query.brandIds || [],
                minPrice: query.minPrice || 0,
                maxPrice: query.maxPrice || 1000,
                inStockOnly: query.availability === 'in_stock',
                onSaleOnly: query.availability === 'on_sale',
                sortBy: 'featured',
              }}
              onFilterChange={(newFilters) => {
                handleUpdateQuery({
                  category: newFilters.categorySlug,
                  brandIds: newFilters.brandIds,
                  availability: newFilters.inStockOnly
                    ? 'in_stock'
                    : newFilters.onSaleOnly
                    ? 'on_sale'
                    : 'all',
                  maxPrice: newFilters.maxPrice,
                  page: 1,
                });
              }}
              onResetFilters={handleClearAllFilters}
            />
          </div>

          {/* Main Results Column */}
          <main className="flex-1 w-full space-y-4">
            {/* Toolbar: Results Count, Mobile Filter Trigger, Sort, View Toggle */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              {/* Results count & Mobile Filter Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDraftMobileQuery(query);
                    setIsMobileFilterOpen(true);
                  }}
                  className="lg:hidden bg-slate-900 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
                  <span>Filter & Sort</span>
                </button>

                <p className="text-xs text-slate-600 font-bold">
                  Found <span className="text-teal-600 font-black">{catalogueResult.totalCount}</span> product(s)
                </p>
              </div>

              {/* Sort Selector & View Mode Switcher */}
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-xs font-extrabold text-slate-400 uppercase tracking-wider hidden sm:inline">
                    Sort By:
                  </label>
                  <select
                    id="sort-select"
                    value={query.sort || 'featured'}
                    onChange={(e) => handleUpdateQuery({ sort: e.target.value as any, page: 1 })}
                    className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-bold outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="featured">Featured & Recommended</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">Name: A–Z</option>
                    <option value="name_desc">Name: Z–A</option>
                    <option value="bestselling">Best Selling</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white shadow-2xs text-teal-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'list' ? 'bg-white shadow-2xs text-teal-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    aria-label="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Chips Bar */}
            <ActiveFiltersBar
              query={query}
              categories={categories}
              brands={brands}
              onRemoveFilter={handleRemoveSingleFilter}
              onClearAll={handleClearAllFilters}
            />

            {/* Product Display / Loading State / Empty State */}
            {isPending ? (
              <CatalogueSkeleton count={8} />
            ) : catalogueResult.products.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-16 text-center space-y-4 my-6">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                  <PackageX className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900">No Products Found</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    {query.search
                      ? `No published products matched “${query.search}”. Try a different term or browse a category.`
                      : 'We could not find any products matching your filters. Try adjusting price bounds or clearing category filters.'}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  {query.search && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="bg-white border border-slate-200 hover:border-teal-400 text-slate-800 font-extrabold text-xs px-6 py-3 rounded-xl cursor-pointer"
                    >
                      Clear search
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => (onNavigate ? onNavigate('/shop') : handleClearAllFilters())}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl cursor-pointer"
                  >
                    Browse catalogue
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
                {categories.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {categories.slice(0, 6).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => (onNavigate ? onNavigate(`/category/${cat.slug}`) : handleUpdateQuery({ category: cat.slug, search: '' }))}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:border-teal-400 cursor-pointer"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
                    : 'space-y-4'
                }
              >
                {catalogueResult.products.map((product) => {
                  const cardData = mapToCardData(product);
                  const isWish = wishlist.includes(product.id);

                  return (
                    <ProductCard
                      key={product.id}
                      product={cardData}
                      isWishlisted={isWish}
                      viewMode={viewMode}
                      onAddToCart={() => onAddToCart(product)}
                      onQuickView={() => onQuickView(product)}
                      onToggleWishlist={onToggleWishlist}
                    />
                  );
                })}
              </div>
            )}

            {/* Server-Style Pagination */}
            <CataloguePagination
              currentPage={catalogueResult.page}
              totalPages={catalogueResult.totalPages}
              totalCount={catalogueResult.totalCount}
              limit={catalogueResult.limit}
              onPageChange={(p) => handleUpdateQuery({ page: p })}
            />
          </main>
        </div>
      </Container>

      {/* Mobile Filter & Sort Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        categories={categories}
        brands={brands}
        draftQuery={draftMobileQuery}
        onUpdateDraft={setDraftMobileQuery}
        onApply={() => {
          handleUpdateQuery(draftMobileQuery);
          setIsMobileFilterOpen(false);
        }}
        onClearAll={() => {
          handleClearAllFilters();
          setIsMobileFilterOpen(false);
        }}
        totalMatchesCount={catalogueResult.totalCount}
      />
    </div>
  );
};
