import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { AnswerCapsule } from '../seo/AnswerCapsule';
import { SITE_NAME, DEFAULT_DESCRIPTION } from '../../lib/seo/site';
import { ANSWER_CAPSULES } from '../../lib/seo/answer-capsules';
import { organizationJsonLd, websiteJsonLd } from '../../lib/seo/structured-data';
import { Category, Brand, Product, ProductVariant } from '../../types';
import { ProductCard, ProductCardData } from '../commerce/ProductCard';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { HeroSlider } from './home/HeroSlider';
import {
  COMPOUND_LINKS,
  CUSTOMER_GALLERY,
  GOAL_SLUGS,
  GUIDE_CARDS,
} from '../../data/homepage';
import { sortManufacturers } from '../../data/manufacturers';
import { StockStatus } from '@prisma/client';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Award,
  FlaskConical,
  Star,
  ChevronRight,
} from 'lucide-react';

interface HomepageProps {
  categories: Category[];
  brands: Brand[];
  products: Product[];
  wishlist: string[];
  onSelectCategory: (slug: string) => void;
  onSelectBrand: (slug: string) => void;
  onNavigate?: (path: string) => void;
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  onQuickBuy?: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isLoading?: boolean;
}

export const Homepage: React.FC<HomepageProps> = ({
  categories,
  brands,
  products,
  wishlist,
  onSelectCategory,
  onSelectBrand,
  onNavigate,
  onAddToCart,
  onQuickBuy,
  onQuickView,
  onToggleWishlist,
  isLoading = false,
}) => {
  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      return;
    }
    if (path.startsWith('/category/')) {
      onSelectCategory(path.replace('/category/', '').split('?')[0]);
      return;
    }
    if (path.startsWith('/brand/')) {
      onSelectBrand(path.replace('/brand/', '').split('?')[0]);
      return;
    }
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const mapProductToCardData = (p: Product): ProductCardData => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    brandName: p.brandName,
    sku: p.sku,
    imageUrl: p.images && p.images.length > 0 ? p.images[0] : null,
    pricePence: Math.round((p.salePriceGbp ?? p.priceGbp) * 100),
    compareAtPricePence: p.salePriceGbp ? Math.round(p.priceGbp * 100) : undefined,
    ratingAvg: p.ratingAvg,
    reviewCount: p.reviewCount,
    stockStatus: p.stockQuantity > 0 ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK,
    availableQuantity: p.stockQuantity,
    isBestseller: p.isBestseller,
    isOnSale: !!p.salePriceGbp,
  });

  const published = products.filter((p) => p.isPublished);
  const featuredProducts = published.filter((p) => p.isFeatured);
  const bestsellerProducts = published.filter((p) => p.isBestseller);
  const topSellers = (bestsellerProducts.length > 0 ? bestsellerProducts : featuredProducts).slice(0, 8);
  const newProducts = [...published]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const goalCategories = GOAL_SLUGS.map((slug) => categories.find((c) => c.slug === slug)).filter(
    (c): c is Category => Boolean(c)
  );
  const shopCategories = (goalCategories.length > 0 ? goalCategories : categories).slice(0, 6);

  const categoryImageFor = (category: Category): string | null => {
    const configured = category.imageUrl?.trim();
    if (configured && !configured.includes('/default.')) return configured;

    const product = published.find(
      (p) =>
        (p.categorySlug === category.slug || p.categoryId === category.id) &&
        p.images?.[0] &&
        !p.images[0].includes('/default.')
    );
    return product?.images?.[0] || configured || null;
  };

  const renderProductRow = (list: Product[]) =>
    isLoading ? (
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-80 w-56 shrink-0 bg-slate-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    ) : list.length > 0 ? (
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
        {list.map((product) => (
          <div key={product.id} className="w-56 sm:w-60 shrink-0 snap-start">
            <ProductCard
              product={mapProductToCardData(product)}
              isWishlisted={wishlist.includes(product.id)}
              onAddToCart={() => onAddToCart(product)}
              onQuickBuy={onQuickBuy ? () => onQuickBuy(product) : undefined}
              onQuickView={() => onQuickView(product)}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm font-bold text-slate-600 py-8 text-center">No products in this list yet.</p>
    );

  return (
    <div className="bg-white pb-12">
      <SeoHead
        title={`${SITE_NAME} | UK catalogue · lab-tested batches`}
        description={DEFAULT_DESCRIPTION}
        canonical={`${typeof window !== 'undefined' ? window.location.origin : ''}/`}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />

      <HeroSlider onNavigate={go} />

      <Section padding="sm">
        <Container>
          <AnswerCapsule className="mb-4">{ANSWER_CAPSULES['/']}</AnswerCapsule>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            Buy from the Steroids UK catalogue
          </h1>
          <p className="mt-3 text-sm text-slate-600 max-w-3xl leading-relaxed">
            Lab-tested batches with verification details on the product page. Orders dispatch from the UK
            on tracked delivery in plain packaging, with a reship if tracked delivery fails. Orals,
            injectables, SARMs, PCT, and stacks — honest stock, GBP pricing.
          </p>
        </Container>
      </Section>

      <Section padding="sm" id="top-sellers">
        <Container>
          <SectionHeading kicker="Most loved" title="Top Sellers" actionLabel="View all" onAction={() => go('/shop')} />
          {renderProductRow(topSellers)}
        </Container>
      </Section>

      <Section padding="sm" background="subtle">
        <Container>
          <SectionHeading kicker="Real results" title="Customer gallery" />
          <div className="flex gap-4 overflow-x-auto pb-2">
            {CUSTOMER_GALLERY.map((item) => (
              <article
                key={item.id}
                className="w-64 shrink-0 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
              >
                <div className="h-36 flex items-center justify-center text-white font-black text-lg" style={{ background: item.accent }}>
                  {item.name.charAt(0)}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">“{item.quote}”</p>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{item.productLabel}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <SectionHeading kicker="Categories" title="Browse by goal" actionLabel="All categories" onAction={() => go('/shop')} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {shopCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.slug)}
                className="rounded-2xl border border-slate-200 bg-slate-50 hover:border-[#157a62] hover:bg-emerald-50 p-4 text-left cursor-pointer transition-colors"
              >
                <p className="text-sm font-black text-slate-900">{category.name}</p>
                <p className="text-[10px] text-slate-500 mt-1">{category.productCount} products</p>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="sm" background="subtle" id="new-products">
        <Container>
          <SectionHeading kicker="Just dropped" title="New products" actionLabel="See all" onAction={() => go('/shop')} />
          {renderProductRow(newProducts)}
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <SectionHeading kicker="Browse" title="Shop by category" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopCategories.map((category) => {
              const imageUrl = categoryImageFor(category);
              return (
              <button
                key={`large-${category.id}`}
                type="button"
                onClick={() => onSelectCategory(category.slug)}
                className="group relative h-40 rounded-2xl overflow-hidden border border-slate-200 cursor-pointer text-left"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#003d30]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="font-black text-lg">{category.name}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
              );
            })}
          </div>
        </Container>
      </Section>

      {brands.length > 0 && (
        <Section padding="sm" background="subtle">
          <Container>
            <SectionHeading kicker="Trusted suppliers" title="Our manufacturers" actionLabel="See all" onAction={() => go('/manufacturers')} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {sortManufacturers(brands).slice(0, 11).map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => onSelectBrand(brand.slug)}
                  className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-[#157a62] cursor-pointer flex flex-col items-center justify-center min-h-[100px]"
                >
                  {brand.logoUrl ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="h-12 w-auto max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span className={`text-xs font-semibold text-slate-600 text-center ${brand.logoUrl ? 'hidden' : ''}`}>
                    {brand.name}
                  </span>
                </button>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section padding="sm">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TrustTile icon={<Award className="w-6 h-6" />} title="UK catalogue" text="1,000+ listed products" />
            <TrustTile icon={<Truck className="w-6 h-6" />} title="Tracked shipping" text="UK £3.99 · EU £15 · World £25" />
            <TrustTile icon={<FlaskConical className="w-6 h-6" />} title="Lab tested" text="Batch verification" />
            <TrustTile icon={<ShieldCheck className="w-6 h-6" />} title="Secure pay" text="Bank transfer & crypto" />
          </div>
        </Container>
      </Section>

      <Section padding="default" background="dark" className="bg-[#003d30]">
        <Container>
          <p className="text-[#aedac2] text-xs font-extrabold uppercase tracking-widest">Steroids UK</p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 max-w-3xl">
            A UK warehouse catalogue with lab-tested batches and tracked dispatch.
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-8 max-w-xl">
            <div>
              <p className="text-2xl font-black text-[#aedac2]">99%+</p>
              <p className="text-xs text-slate-400">Listed purity</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#aedac2]">Next day</p>
              <p className="text-xs text-slate-400">UK delivery</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#aedac2]">Reship</p>
              <p className="text-xs text-slate-400">If tracking fails</p>
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed max-w-4xl">
            <div className="space-y-3">
              <h3 className="text-white font-black">What we ship</h3>
              <p>
                Orals, injectables, SARMs, PCT, and stacks from named labs. Every listing shows the
                compound, lab, and price in GBP. We do not pretend this is risk-free — get bloodwork
                and speak to a clinician before you start.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-black">How orders leave the warehouse</h3>
              <p>
                Same-day pack when you pay before the weekday cut-off. Royal Mail tracked service,
                plain outer box, and a reship if the tracked parcel does not arrive.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <SectionHeading kicker="Jump in" title="Shop by compound" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {COMPOUND_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => go(link.href)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-[#157a62] cursor-pointer"
              >
                <p className="font-black text-sm text-slate-900">{link.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{link.hint}</p>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="sm" background="subtle">
        <Container>
          <SectionHeading kicker="From the desk" title="Guides" />
          <div className="grid sm:grid-cols-3 gap-4">
            {GUIDE_CARDS.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => go(card.href)}
                className="bg-white rounded-2xl border border-slate-200 p-5 text-left hover:border-[#157a62] cursor-pointer"
              >
                <h3 className="font-black text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{card.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#157a62] mt-4">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

function SectionHeading({
  kicker,
  title,
  actionLabel,
  onAction,
}: {
  kicker: string;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#157a62]">{kicker}</p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
      </div>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="text-xs font-extrabold text-slate-600 hover:text-[#157a62] cursor-pointer">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function TrustTile({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
      <div className="text-[#157a62] shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-slate-900">{title}</p>
        <p className="text-[11px] text-slate-500 mt-0.5">{text}</p>
      </div>
    </div>
  );
}
