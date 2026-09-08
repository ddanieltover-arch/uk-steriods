import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import { SUPPORT_EMAIL } from '../../data/resources';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

const TOC = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'discretion', label: 'Discretion & Anonymity' },
  { id: 'storage-security', label: 'Data Storage & Security' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'marketing', label: 'Newsletter & Marketing' },
  { id: 'age', label: 'Age Requirement' },
  { id: 'transfers', label: 'International Data Transfers' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoHead
        title={`Privacy Policy | ${SITE_NAME}`}
        description={`How ${SITE_NAME} collects, uses and protects your personal data. No sold data, no third-party ad tracking.`}
        canonical={`${window.location.origin}/privacy-policy`}
      />
      <ResourcePageShell
        kicker="Legal · Last updated September 2026"
        title="Privacy Policy"
        intro="How we collect, use and protect your personal data. Your privacy isn’t a feature — it’s how we run fulfilment."
        currentPath="/privacy-policy"
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
            Data requests:{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-[#157a62] hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>

        <aside className="rounded-2xl bg-[#003d30] text-emerald-50 p-5 sm:p-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#aedac2]">Privacy first</p>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100">
            No sold data, no third-party ad tracking, no marketing without consent. Your order details stay between
            you and our fulfilment team.
          </p>
        </aside>

        <LegalSection id="introduction" number="01" title="Introduction">
          <p>
            {SITE_NAME} (“we”, “us”, “our”) takes your privacy seriously. This Privacy Policy explains what information
            we collect when you use our website, how we use it, how we protect it, and what choices you have.
          </p>
          <p>
            By using our website and placing orders, you consent to the practices described in this policy. If you do
            not agree, please do not use our services.
          </p>
        </LegalSection>

        <LegalSection id="information-we-collect" number="02" title="Information We Collect">
          <h3 className="text-base font-black text-slate-900">2.1 — Information you provide</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Account information:</strong> name (or alias), email address, password (stored hashed)
            </li>
            <li>
              <strong>Shipping details:</strong> delivery address and phone number (used solely for dispatch and
              customer support)
            </li>
            <li>
              <strong>Payment information:</strong> payment method selected and transaction references. We do not store
              full bank credentials. For crypto, we record wallet address and transaction hash as shown on the public
              blockchain
            </li>
            <li>
              <strong>Communications:</strong> messages sent through on-site chat, email, or contact forms
            </li>
            <li>
              <strong>Reviews:</strong> product reviews and ratings you submit
            </li>
          </ul>
          <h3 className="text-base font-black text-slate-900 pt-2">2.2 — Information collected automatically</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Device information:</strong> browser type, operating system, and device signals used for fraud
              prevention only
            </li>
            <li>
              <strong>Usage data:</strong> pages visited, products viewed, search queries, session length
            </li>
            <li>
              <strong>IP address:</strong> for security, rate limiting and approximate geolocation (region level only)
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="how-we-use" number="03" title="How We Use Your Information">
          <p>We use your personal information strictly for these purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Order processing:</strong> to fulfil and dispatch orders from our UK warehouse
            </li>
            <li>
              <strong>Payment verification:</strong> to process and confirm bank transfer or cryptocurrency payments
            </li>
            <li>
              <strong>Customer support:</strong> to respond to inquiries via chat or email
            </li>
            <li>
              <strong>Account management:</strong> to maintain your account and order history
            </li>
            <li>
              <strong>Transactional email:</strong> order confirmations, dispatch notices and tracking updates
            </li>
            <li>
              <strong>Marketing:</strong> newsletters and offers only with your explicit opt-in
            </li>
            <li>
              <strong>Fraud prevention:</strong> to detect unauthorised access and abuse
            </li>
            <li>
              <strong>Service improvement:</strong> anonymised usage analysis to improve the platform
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="discretion" number="04" title="Discretion & Anonymity">
          <p>Discretion matters in this category. We take several steps to protect your privacy:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All packages ship in plain, unmarked parcels with no external labels indicating the contents</li>
            <li>Shipping labels show a neutral sender business name, not “{SITE_NAME}”</li>
            <li>Inner tamper-evident packaging on injectables and peptides where applicable</li>
            <li>We never sell, rent or share customer lists with advertisers</li>
          </ul>
        </LegalSection>

        <LegalSection id="storage-security" number="05" title="Data Storage & Security">
          <ul className="list-disc pl-5 space-y-2">
            <li>Passwords are hashed using industry-standard algorithms</li>
            <li>Sensitive personal data is encrypted at rest where applicable</li>
            <li>All data is transmitted over HTTPS</li>
            <li>Access to customer data is restricted to authorised staff</li>
            <li>Backups are encrypted and stored with appropriate geographic separation</li>
          </ul>
          <p>
            We retain your personal information for as long as your account is active or as needed to provide services
            and resolve disputes.
          </p>
        </LegalSection>

        <LegalSection id="data-sharing" number="06" title="Data Sharing">
          <p>We do not sell, trade, or rent your personal information. We share data only with:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Royal Mail / couriers:</strong> name and shipping address to fulfil deliveries (UK, Europe and
              worldwide)
            </li>
            <li>
              <strong>Payment processors:</strong> transaction details required for bank transfer confirmation or crypto
              settlement (e.g. NOWPayments)
            </li>
            <li>
              <strong>Transactional email provider:</strong> your email address to deliver order updates and tracking
            </li>
            <li>
              <strong>CDN & security providers:</strong> request metadata for DDoS protection and edge caching
            </li>
          </ul>
          <p>
            Third-party providers are obligated to protect your data and use it only for the specified purposes.
          </p>
        </LegalSection>

        <LegalSection id="cookies" number="07" title="Cookies & Tracking">
          <p>Our website uses essential cookies and session storage for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Authentication (keeping you logged in)</li>
            <li>Shopping cart persistence</li>
            <li>Fraud-prevention signals</li>
            <li>Age-gate verification</li>
            <li>CSRF token storage for checkout security</li>
          </ul>
          <p>
            We do not use third-party advertising cookies or tracking pixels, and we do not share browsing data with Meta,
            Google Ads or external advertising platforms.
          </p>
        </LegalSection>

        <LegalSection id="marketing" number="08" title="Newsletter & Marketing">
          <p>
            If you subscribe to our newsletter or promotional emails, we collect your email address and preferences. You
            can unsubscribe at any time via the link in any marketing email or by contacting{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-[#157a62] hover:underline">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <p>
            We never send marketing emails without explicit opt-in consent (PECR — Privacy and Electronic Communications
            Regulations).
          </p>
        </LegalSection>

        <LegalSection id="age" number="09" title="Age Requirement">
          <p>
            Our website is intended only for individuals aged 18 years or older. We do not knowingly collect personal
            information from anyone under 18. If we become aware that we have collected data from a minor, we will delete
            it promptly.
          </p>
        </LegalSection>

        <LegalSection id="transfers" number="10" title="International Data Transfers">
          <p>
            Our primary data hosting is within the UK and the European Economic Area (EEA). Some sub-processors may
            operate globally; where transfers outside the UK/EEA occur, we rely on appropriate safeguards such as the UK
            International Data Transfer Agreement (IDTA) or EU Standard Contractual Clauses (SCCs).
          </p>
        </LegalSection>

        <LegalSection id="changes" number="11" title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Material changes will be reflected on this page with an
            updated revision date. We encourage you to review this policy periodically.
          </p>
        </LegalSection>

        <LegalSection id="contact" number="12" title="Contact Us">
          <p>
            Questions about this Privacy Policy or how we handle your data? Email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-[#157a62] hover:underline">
              {SUPPORT_EMAIL}
            </a>{' '}
            or use on-site chat. We aim to respond within one UK business day.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/delivery-and-returns')}
            className="mt-2 text-sm font-bold text-[#157a62] hover:underline cursor-pointer"
          >
            Also see Delivery & Returns →
          </button>
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
