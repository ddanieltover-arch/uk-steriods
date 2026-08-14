import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Button } from '../ui/button';
import { ProductBadge } from '../commerce/ProductBadge';
import { StockIndicator } from '../commerce/StockIndicator';
import { QuantitySelector } from '../commerce/QuantitySelector';
import { WishlistButton } from '../commerce/WishlistButton';
import { PriceDisplay } from '../commerce/PriceDisplay';
import { Input, Select, Checkbox, Radio, Textarea, FormField } from '../forms/FormControls';
import { SearchInput } from '../forms/SearchInput';
import { EmptyState } from '../feedback/EmptyState';
import { ErrorState } from '../feedback/ErrorState';
import { LoadingState } from '../feedback/LoadingState';
import { useToast } from '../feedback/ToastProvider';
import { StockStatus } from '../../types';
import { Sparkles, CheckCircle, Package } from 'lucide-react';

export const DesignSystemDemo: React.FC = () => {
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-12">
      <Container>
        {/* Header Title */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Phase 03 Design System Specification
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            UK Performance E-Commerce Design System
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
            Centralized design token documentation and reusable UI components constructed for maximum conversion, accessibility (WCAG), and responsive mobile ergonomics.
          </p>
        </div>

        {/* Section 1: Color Tokens */}
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 my-8">
          <h2 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-3">
            1. Brand Color Tokens
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="space-y-1.5">
              <div className="h-16 rounded-2xl bg-[#0d9488] shadow-sm flex items-end p-2 text-white font-bold text-xs">
                #0d9488
              </div>
              <p className="text-xs font-extrabold text-slate-900">Primary Teal</p>
              <p className="text-[10px] text-slate-500">CTA & Accents</p>
            </div>

            <div className="space-y-1.5">
              <div className="h-16 rounded-2xl bg-[#0f172a] shadow-sm flex items-end p-2 text-white font-bold text-xs">
                #0f172a
              </div>
              <p className="text-xs font-extrabold text-slate-900">Slate Charcoal</p>
              <p className="text-[10px] text-slate-500">Deep Shell & Text</p>
            </div>

            <div className="space-y-1.5">
              <div className="h-16 rounded-2xl bg-[#16a34a] shadow-sm flex items-end p-2 text-white font-bold text-xs">
                #16a34a
              </div>
              <p className="text-xs font-extrabold text-slate-900">Success Emerald</p>
              <p className="text-[10px] text-slate-500">In Stock & Verified</p>
            </div>

            <div className="space-y-1.5">
              <div className="h-16 rounded-2xl bg-[#d97706] shadow-sm flex items-end p-2 text-white font-bold text-xs">
                #d97706
              </div>
              <p className="text-xs font-extrabold text-slate-900">Warning Amber</p>
              <p className="text-[10px] text-slate-500">Low Stock Alert</p>
            </div>

            <div className="space-y-1.5">
              <div className="h-16 rounded-2xl bg-[#dc2626] shadow-sm flex items-end p-2 text-white font-bold text-xs">
                #dc2626
              </div>
              <p className="text-xs font-extrabold text-slate-900">Destructive Red</p>
              <p className="text-[10px] text-slate-500">Errors & Discounts</p>
            </div>

            <div className="space-y-1.5">
              <div className="h-16 rounded-2xl bg-[#f8fafc] border border-slate-200 shadow-2xs flex items-end p-2 text-slate-900 font-bold text-xs">
                #f8fafc
              </div>
              <p className="text-xs font-extrabold text-slate-900">App Canvas</p>
              <p className="text-[10px] text-slate-500">Light Surface</p>
            </div>
          </div>
        </Section>

        {/* Section 2: Typography Scale */}
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 my-8 space-y-6">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
            2. Typography Scale (Plus Jakarta Sans)
          </h2>
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Display Title (5xl)
              </span>
              <p className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Pharmaceutical Grade Performance Formulations
              </p>
            </div>

            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Heading 1 (3xl)
              </span>
              <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                High Performance Formulations & Supplements
              </p>
            </div>

            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Heading 2 (2xl)
              </span>
              <p className="text-xl md:text-2xl font-bold text-slate-900">
                UK Manufactured & Dispatched Direct
              </p>
            </div>

            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Body Large (16px) & Body (14px)
              </span>
              <p className="text-base text-slate-700 leading-relaxed">
                Our active ingredients are sourced directly and processed in compliant UK facilities with complete batch traceability across all catalog items.
              </p>
            </div>
          </div>
        </Section>

        {/* Section 3: Buttons & Controls */}
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 my-8 space-y-6">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
            3. Buttons & Interactive Controls
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="default">Primary CTA Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Action</Button>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
              <WishlistButton
                isWishlisted={isWishlisted}
                onToggle={() => setIsWishlisted(!isWishlisted)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              onClick={() => showToast('Design System Notification', 'Toast notifications are fully working!', 'success')}
              variant="outline"
              size="sm"
            >
              Trigger Success Toast
            </Button>
          </div>
        </Section>

        {/* Section 4: Commerce Badges & Indicators */}
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 my-8 space-y-6">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
            4. Badges, Price Displays & Stock Indicators
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <ProductBadge variant="sale" />
            <ProductBadge variant="bestseller" />
            <ProductBadge variant="new" />
            <ProductBadge variant="lowStock" />
            <ProductBadge variant="outOfStock" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase text-slate-500">Price Display (Sale)</span>
              <PriceDisplay pricePence={4999} compareAtPricePence={6500} size="lg" showSavingsBadge />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase text-slate-500">Stock Status: In Stock</span>
              <StockIndicator status={StockStatus.IN_STOCK} availableQuantity={42} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase text-slate-500">Stock Status: Low Stock</span>
              <StockIndicator status={StockStatus.LOW_STOCK} availableQuantity={3} />
            </div>
          </div>
        </Section>

        {/* Section 5: Form Controls */}
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 my-8 space-y-6">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
            5. Form Controls & Search Autocomplete
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" required hint="Used for Royal Mail shipping label">
              <Input placeholder="e.g. John Smith" />
            </FormField>

            <FormField label="UK Delivery Method">
              <Select
                options={[
                  { value: 'tracked24', label: 'Royal Mail Tracked 24 (£4.95)' },
                  { value: 'special', label: 'Royal Mail Special Delivery (£8.95)' },
                ]}
              />
            </FormField>

            <div className="space-y-3">
              <Checkbox label="I agree to UK Performance terms and legal conditions" />
              <Radio label="Pay via Direct UK Bank Transfer (Faster Payments)" name="payment" defaultChecked />
            </div>

            <FormField label="Delivery Instructions">
              <Textarea placeholder="Leave in safe place, behind side gate..." />
            </FormField>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-xs font-extrabold uppercase text-slate-700">Search Autocomplete Bar</span>
            <SearchInput value={searchValue} onChange={setSearchValue} />
          </div>
        </Section>

        {/* Section 6: Feedback & States */}
        <Section background="surface" className="rounded-3xl border border-slate-200 p-8 my-8 space-y-6">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
            6. Feedback States & Loading Elements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmptyState
              title="No items in wishlist"
              description="Save your favorite workout formulations to access them quickly anytime."
              actionLabel="Browse Catalog"
              onAction={() => {}}
            />

            <ErrorState
              title="Database connection error"
              message="Failed to retrieve live stock status from server."
              onRetry={() => alert('Retrying connection...')}
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <LoadingState label="Verifying HPLC lab certificate..." />
          </div>
        </Section>
      </Container>
    </div>
  );
};
