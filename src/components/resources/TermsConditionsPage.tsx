import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import { SUPPORT_EMAIL } from '../../data/resources';

interface TermsConditionsPageProps {
  onNavigate: (path: string) => void;
}

const TOC = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'eligibility', label: 'Eligibility & Intended Use' },
  { id: 'products', label: 'Products & Descriptions' },
  { id: 'pricing', label: 'Pricing & Payment' },
  { id: 'orders', label: 'Orders & Availability' },
  { id: 'shipping', label: 'Shipping & Delivery' },
  { id: 'reship', label: 'Reship Guarantee' },
  { id: 'returns', label: 'Returns & Refunds' },
  { id: 'discounts', label: 'Discount Codes & Promotions' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'contact', label: 'Contact Us' },
];

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoHead
        title={`Terms & Conditions | ${SITE_NAME}`}
        description={`Terms governing use of ${SITE_NAME}. Research-use catalogue, UK dispatch, bank transfer and crypto payment.`}
        canonical={`${window.location.origin}/terms`}
      />
      <ResourcePageShell
        kicker="Legal · Last updated September 2026"
        title="Terms & Conditions"
        intro="These terms govern your use of our website. Please read carefully before placing an order. By using the site you confirm you’ve read and agreed."
        currentPath="/terms"
        onNavigate={onNavigate}
      >
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 sm:p-6">
          <ResourceKicker>Table of contents</ResourceKicker>
          <ol className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm font-semibold text-slate-700">
            {TOC.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-[#157a62] transition-colors">
                  <span className="text-[#157a62] font-black mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Questions?{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-[#157a62] hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>

        <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-800">Important disclaimer</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-950/80">
            All products sold on {SITE_NAME} are intended for research and laboratory use only. They are not for human
            consumption, veterinary use, medical diagnosis, or treatment. By purchasing you confirm you are at least 18
            years old and are buying solely for legitimate research purposes.
          </p>
        </aside>

        <LegalSection id="introduction" number="01" title="Introduction">
          <p>
            Welcome to {SITE_NAME} (“we”, “us”, “our”). These Terms and Conditions govern your use of our website and any
            purchases you make through it. By placing an order, you agree to be bound by these terms.
          </p>
          <p>
            We reserve the right to update these terms at any time. Changes will be posted on this page with an updated
            revision date.
          </p>
        </LegalSection>

        <LegalSection id="eligibility" number="02" title="Eligibility & Intended Use">
          <p>
            You must be at least 18 years old to make a purchase from our website. By placing an order, you confirm that
            you meet this minimum age requirement.
          </p>
          <p>
            Products offered on {SITE_NAME} are research chemicals supplied strictly for laboratory research and
            analytical testing. They are not intended or approved for human consumption, in vivo experiments, veterinary
            use, food, cosmetics, drug, or household products.
          </p>
          <p>We reserve the right to refuse service to anyone at our sole discretion.</p>
        </LegalSection>

        <LegalSection id="products" number="03" title="Products & Descriptions">
          <p>
            We make every reasonable effort to ensure product descriptions, images, and pricing are accurate. However, we
            do not warrant that all information is complete or error-free.
          </p>
          <p>
            Product images are for illustrative purposes only. Actual packaging, vial labels, tablet colour, or batch
            markings may vary. Where available, lab-test information or Certificates of Analysis may appear on product
            pages.
          </p>
        </LegalSection>

        <LegalSection id="pricing" number="04" title="Pricing & Payment">
          <p>All prices are listed in Pounds Sterling (GBP).</p>
          <p>We accept the following payment methods:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>UK bank transfer</strong> (Faster Payments — typically clears within 1–3 hours after you pay using
              the details provided for your order)
            </li>
            <li>
              <strong>Cryptocurrency</strong> — Bitcoin, USDT, USDC, Ethereum, Litecoin and other supported coins via our
              crypto checkout, with an automatic <strong>5% merchandise discount</strong>
            </li>
            <li>
              Crypto bonus: pay with crypto using code <strong>CRYPTO5</strong> for a free product up to £25 (subject to
              promotion terms)
            </li>
          </ul>
          <p>
            We do not accept card payments at checkout. Orders are processed once payment is verified. We reserve the
            right to cancel orders if payment cannot be confirmed within a reasonable timeframe.
          </p>
        </LegalSection>

        <LegalSection id="orders" number="05" title="Orders & Availability">
          <p>
            All orders are subject to availability. We reserve the right to limit quantities and to refuse or cancel any
            order for any reason, including product unavailability, pricing errors, or suspected fraud.
          </p>
          <p>
            You will receive an order confirmation email after placing your order. This does not constitute acceptance —
            acceptance occurs when we dispatch the products from our UK warehouse.
          </p>
        </LegalSection>

        <LegalSection id="shipping" number="06" title="Shipping & Delivery">
          <p>We ship from our UK warehouse to the United Kingdom, the rest of Europe, and worldwide.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>United Kingdom:</strong> Royal Mail Tracked 48 from £3.99 (free on UK orders of £300 or more);
              Royal Mail Special Delivery 24 from £6.99
            </li>
            <li>
              <strong>Europe:</strong> £15.00 tracked
            </li>
            <li>
              <strong>Rest of world:</strong> £25.00 tracked
            </li>
          </ul>
          <p>
            All packages are shipped in plain, unmarked packaging for discretion. No reference to the contents, product
            names, or our company name appears on the exterior. The sender shows as a neutral business name.
          </p>
          <p>
            Delivery timeframes are estimates and not guaranteed. We are not liable for delays caused by carriers or
            circumstances beyond our control. Tracking is provided via email on dispatch.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/delivery-and-returns')}
            className="text-sm font-bold text-[#157a62] hover:underline cursor-pointer"
          >
            Full delivery details →
          </button>
        </LegalSection>

        <LegalSection id="reship" number="07" title="Reship Guarantee">
          <p>
            If your tracked order does not arrive (which is rare), we will reship it free of charge or issue a full
            refund at our discretion. Contact support within 21 days of the expected delivery date to initiate the
            process. Lost parcels in transit are our responsibility once you notify us with the required details.
          </p>
        </LegalSection>

        <LegalSection id="returns" number="08" title="Returns & Refunds">
          <p>
            Due to the nature of our products, we cannot accept returns on opened items. Unopened products may be
            returned within 14 days of delivery for a full refund, subject to the following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The product must be in its original, sealed packaging with the tamper seal intact</li>
            <li>You must contact us before returning the item</li>
            <li>Return shipping costs are the responsibility of the customer</li>
          </ul>
          <p>
            If you receive a damaged or incorrect product, please contact us within 48 hours of delivery with photos. We
            will arrange a replacement or refund at our discretion.
          </p>
        </LegalSection>

        <LegalSection id="discounts" number="09" title="Discount Codes & Promotions">
          <p>
            Discount codes are subject to specific terms, including minimum order values, expiry dates, and usage limits.
            Unless otherwise stated, discount codes cannot be combined with other promotions, the CRYPTO5 free-product
            bonus, or the 5% crypto discount.
          </p>
        </LegalSection>

        <LegalSection id="ip" number="10" title="Intellectual Property">
          <p>
            All content on this website, including text, images, logos, and graphics, is the property of {SITE_NAME} or
            its licensors and is protected by copyright and other intellectual property laws. You may not reproduce,
            distribute, or use any content without our prior written consent.
          </p>
        </LegalSection>

        <LegalSection id="liability" number="11" title="Limitation of Liability">
          <p>
            Our products are sold strictly for research and laboratory use only. We do not encourage, condone, or provide
            guidance on the misuse of any product for human consumption.
          </p>
          <p>
            {SITE_NAME} and its affiliates shall not be liable for any direct, indirect, incidental, special,
            consequential, or punitive damages arising from or related to the use of our products or services, even if we
            have been advised of the possibility of such damages.
          </p>
        </LegalSection>

        <LegalSection id="contact" number="12" title="Contact Us">
          <p>
            Questions about these Terms and Conditions? Email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-[#157a62] hover:underline">
              {SUPPORT_EMAIL}
            </a>{' '}
            or use on-site chat. We aim to respond quickly during UK business hours.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigate('/privacy-policy')}
              className="text-sm font-bold text-[#157a62] hover:underline cursor-pointer"
            >
              Privacy Policy →
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/payment-methods')}
              className="text-sm font-bold text-[#157a62] hover:underline cursor-pointer"
            >
              Payment Methods →
            </button>
          </div>
        </LegalSection>
      </ResourcePageShell>
    </>
  );
};

function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <ResourceKicker>{number}</ResourceKicker>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">{title}</h2>
      <div className="space-y-3 text-[15px] text-slate-600 leading-relaxed max-w-3xl">{children}</div>
    </section>
  );
}
