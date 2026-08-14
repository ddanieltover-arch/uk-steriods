import React, { useState } from 'react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME, DEFAULT_DESCRIPTION } from '../../lib/seo/site';
import { organizationJsonLd, websiteJsonLd } from '../../lib/seo/structured-data';
import { Category, Brand, Product, ProductVariant } from '../../types';
import { ProductCard, ProductCardData } from '../commerce/ProductCard';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { StorageService } from '../../services/storage';
import { StockStatus } from '@prisma/client';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Package,
  Award,
  Check,
  Mail,
  Sparkles,
  Zap,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface HomepageProps {
  categories: Category[];
  brands: Brand[];
  products: Product[];
  wishlist: string[];
  onSelectCategory: (slug: string) => void;
  onSelectBrand: (slug: string) => void;
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
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
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isLoading = false,
}) => {
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Map Product to ProductCardData format
  const mapProductToCardData = (p: Product): ProductCardData => {
    return {
      id: p.id,
      name: p.name,
      brandName: p.brandName,
      sku: p.sku,
      imageUrl: p.images && p.images.length > 0 ? p.images[0] : null,
      pricePence: Math.round(p.priceGbp * 100),
      compareAtPricePence: p.salePriceGbp ? Math.round(p.priceGbp * 100) : undefined,
      ratingAvg: p.ratingAvg,
      reviewCount: p.reviewCount,
      stockStatus: p.stockQuantity > 0 ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK,
      availableQuantity: p.stockQuantity,
      isBestseller: p.isBestseller,
      isOnSale: !!p.salePriceGbp,
    };
  };

  // Filtered lists
  const featuredProducts = products.filter((p) => p.isPublished && p.isFeatured);
  const bestsellerProducts = products.filter((p) => p.isPublished && p.isBestseller);
  const activeCategories = categories.filter((c) => c.featured || c.productCount > 0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }

    const saved = StorageService.saveNewsletter(newsletterEmail);
    if (saved) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } else {
      setNewsletterSuccess(true); // Already subscribed
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-12">
      <SeoHead
        title={`${SITE_NAME} | Sports nutrition and performance formulations`}
        description={DEFAULT_DESCRIPTION}
        canonical={`${typeof window !== 'undefined' ? window.location.origin : ''}/`}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-800/60 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>UK Performance & Endurance Science</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white">
                Engineered for Peak Athletic Output & Recovery
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                Precision sports formulations, cold-filtered whey isolates, and hypotonic electrolyte complexes designed for uncompromising athletes across the UK.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollToSection('categories-section')}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('bestsellers-section')}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <span>View Best Sellers</span>
                </button>
              </div>

              {/* Quick Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Royal Mail Tracked 24</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Secure Bank Transfer</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Package className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Discreet Plain Outer Box</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Hero Product Showcase Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-teal-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                    Featured Batch
                  </div>

                  <div className="h-56 sm:h-64 flex items-center justify-center my-4">
                    <img
                      src={products[0]?.images?.[0] || 'https://steroids-uk.com/og-default.jpg'}
                      alt={products[0]?.name || 'Featured Product'}
                      className="max-h-full object-contain filter drop-shadow-2xl"
                    />
                  </div>

                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <span className="text-[10px] font-extrabold uppercase text-teal-400 tracking-wider">
                      {products[0]?.brandName || 'Pharmaqo Labs'}
                    </span>
                    <h3 className="font-extrabold text-base text-white">
                      {products[0]?.name || 'Featured Performance Product'}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-xl font-black text-white">£{products[0]?.priceGbp?.toFixed(2) || '29.99'}</span>
                      </div>
                      <button
                        onClick={() => {
                          const p = products[0];
                          if (p) onQuickView(p);
                        }}
                        className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. CATEGORY DISCOVERY SECTION */}
      <Section id="categories-section" className="scroll-mt-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-black text-teal-600 uppercase tracking-widest block mb-1">
                Catalogue Navigation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Shop by Performance Category
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Targeted sports nutrition engineered for endurance output, post-workout recovery, hydration balance, and daily micronutrient support.
            </p>
          </div>

          {/* Categories Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : activeCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => onSelectCategory(category.slug)}
                  className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="h-44 bg-slate-50 relative overflow-hidden flex items-center justify-center p-4">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400">
                        <Layers className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                    <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {category.productCount || 0} Products
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-600 transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {category.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center text-xs font-extrabold text-teal-600 group-hover:translate-x-1 transition-transform">
                      <span>Browse Range</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-sm font-bold text-slate-700">No categories found in catalog.</p>
            </div>
          )}
        </Container>
      </Section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <Section id="featured-products" className="bg-slate-50/70 py-12 sm:py-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-black text-teal-600 uppercase tracking-widest block mb-1">
                Handpicked Range
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Formulations
              </h2>
            </div>
            <button
              onClick={() => onSelectCategory('')}
              className="text-xs font-extrabold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Grid: 4 Desktop / 2-3 Tablet / 2 Mobile */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map((product) => {
                const cardData = mapProductToCardData(product);
                const isWish = wishlist.includes(product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={cardData}
                    isWishlisted={isWish}
                    onAddToCart={() => onAddToCart(product)}
                    onQuickView={() => onQuickView(product)}
                    onToggleWishlist={onToggleWishlist}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-bold text-slate-700">No featured products currently available.</p>
            </div>
          )}
        </Container>
      </Section>

      {/* 4. PROMOTIONAL VALUE SECTION */}
      <Section>
        <Container>
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-block bg-teal-900 text-teal-300 text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                  UK Free Delivery Threshold
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Free Royal Mail Tracked 24 Shipping on Orders Over £100
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  All orders placed before 3:00 PM GMT Monday to Friday are packed in discreet plain unbranded packaging and dispatched the same day from our UK distribution center.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Same-Day Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Plain Outer Box</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Live Tracking Ref</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  onClick={() => onSelectCategory('')}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer uppercase tracking-wider text-center w-full sm:w-auto"
                >
                  Shop Qualifying Products
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. BEST SELLERS SECTION */}
      <Section id="bestsellers-section" className="scroll-mt-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-black text-teal-600 uppercase tracking-widest block mb-1">
                Customer Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Best Selling Formulations
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Most requested workout supplements and recovery essentials based on customer reorder frequency.
            </p>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : bestsellerProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {bestsellerProducts.map((product) => {
                const cardData = mapProductToCardData(product);
                const isWish = wishlist.includes(product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={cardData}
                    isWishlisted={isWish}
                    onAddToCart={() => onAddToCart(product)}
                    onQuickView={() => onQuickView(product)}
                    onToggleWishlist={onToggleWishlist}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-sm font-bold text-slate-700">No bestseller products found.</p>
            </div>
          )}
        </Container>
      </Section>

      {/* 6. BRAND DISCOVERY SECTION */}
      {brands.length > 0 && (
        <Section className="bg-slate-50/70 py-12 sm:py-16">
          <Container>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-black text-teal-600 uppercase tracking-widest block mb-1">
                UK Manufacturing
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Brands & Labs
              </h2>
              <p className="text-xs text-slate-500 mt-2">
                Manufactured in compliance with high quality assurance standards and verified ingredient purity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => onSelectBrand(brand.slug)}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-teal-500 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded uppercase">
                      {brand.productCount} Products
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">{brand.name}</h3>
                    {brand.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {brand.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-teal-600">
                    <span>View Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. VALUE PROPOSITION / TRUST SECTION */}
      <Section>
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black text-teal-600 uppercase tracking-widest block mb-1">
              Why Choose UK Performance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Service Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left space-y-3">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 uppercase">Fast UK Delivery</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dispatched via Royal Mail Tracked 24 or 48 with SMS/email delivery notifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left space-y-3">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 uppercase">Faster Payments</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct UK bank transfer with automated reference matching and quick order processing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left space-y-3">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 uppercase">Discreet Shipping</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Unbranded durable outer box or padded mailer to protect your privacy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left space-y-3">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 uppercase">Customer Support</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated UK support team available Monday to Friday to assist with your orders.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. NEWSLETTER SIGNUP SECTION */}
      <Section className="bg-slate-900 text-white py-14 sm:py-20 my-8">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 bg-teal-600/20 text-teal-400 rounded-2xl flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Stay Ahead in Performance
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Subscribe to receive product release announcements, athletic guides, and member-only offers directly to your inbox.
            </p>

            {newsletterSuccess ? (
              <div className="bg-teal-950/80 border border-teal-700/80 text-teal-300 p-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Thank you! You have been subscribed to our performance updates.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer uppercase tracking-wider shrink-0"
                  >
                    Subscribe
                  </button>
                </div>

                {newsletterError && (
                  <p className="text-[11px] font-bold text-red-400 mt-1">{newsletterError}</p>
                )}
              </form>
            )}

            <p className="text-[10px] text-slate-400 italic">
              Unsubscribe anytime. We respect your privacy and never share your details.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
};
