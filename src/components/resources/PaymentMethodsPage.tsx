import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import { SUPPORT_EMAIL } from '../../data/resources';

interface PaymentMethodsPageProps {
  onNavigate: (path: string) => void;
}

const faqs = [
  {
    q: 'Do you accept cards?',
    a: 'No. Checkout is UK bank transfer or cryptocurrency only.',
  },
  {
    q: 'How does the crypto discount work?',
    a: 'Choose crypto at checkout and 5% is taken off the merchandise total automatically. No promo code is required.',
  },
  {
    q: 'What happens after I send a bank transfer?',
    a: 'Use the reference from your confirmation email. UK Faster Payments usually clears in 1–3 hours. The order ships within 24 hours of confirmation, then you receive tracking by email.',
  },
  {
    q: 'Do you accept crypto from any wallet?',
    a: 'Yes — Trust, MetaMask, Ledger, exchange wallets, and others. Checkout shows a deposit address; you transfer from a wallet you control.',
  },
  {
    q: "I don't have crypto. How can I pay?",
    a: 'Use UK bank transfer at checkout, or buy crypto on an exchange or wallet (Revolut, Coinbase, Kraken, etc.) and send it to the deposit address shown at checkout.',
  },
  {
    q: 'Is paying with crypto traceable?',
    a: 'We only see the on-chain transaction hash. We never share, sell or expose customer payment information.',
  },
  {
    q: 'How long do payments take to confirm?',
    a: 'Bank transfer: 1–3 hours (UK Faster Payments) / 1–2 business days (international). Crypto: typically 10–30 minutes depending on network confirmations.',
  },
  {
    q: 'What if I send the wrong amount?',
    a: `Email ${SUPPORT_EMAIL} with your order number. Underpayments hold the order until topped up; overpayments are credited as loyalty points (1pt = £0.10).`,
  },
];

const COINS = [
  ['Bitcoin (BTC)', 'Direct transfer', 'The original cryptocurrency. Fast confirmations on Lightning where available.'],
  ['Tether (USDT)', 'Direct transfer', 'Dollar-pegged stablecoin. Zero volatility risk while you pay.'],
  ['USD Coin (USDC)', 'Direct transfer', 'Audited stablecoin. Settles in minutes on most networks.'],
  ['Ethereum (ETH)', 'Direct transfer', 'For users with existing ETH holdings. Standard ERC-20 transfer.'],
  ['Litecoin (LTC)', 'Direct transfer', 'Lower fees and faster blocks than Bitcoin. Great for smaller orders.'],
  ['Many more', '300+ coins', 'Solana, BNB, XRP, Dogecoin, Cardano, Polygon, Tron and 300+ other coins via NOWPayments.'],
];

export const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoHead
        title={`Payment Methods | ${SITE_NAME}`}
        description="Pay with UK bank transfer or cryptocurrency. Encrypted and discreet."
        canonical={`${window.location.origin}/payment-methods`}
      />
      <ResourcePageShell
        kicker="Payment methods"
        title="Pay your way. Fast, private, secure."
        intro="Two ways to pay: UK bank transfer, or crypto (Bitcoin, USDT, USDC, ETH, LTC and more). Every method is fully encrypted and discreet."
        currentPath="/payment-methods"
        onNavigate={onNavigate}
      >
        <section className="rounded-3xl bg-[#003d30] text-white p-6 sm:p-8 grid lg:grid-cols-[1fr_220px] gap-6 items-center">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#aedac2]">Recommended · Best value</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">Pay with Crypto</h2>
            <p className="text-sm text-emerald-100 mt-3 leading-relaxed max-w-xl">
              Pay in Bitcoin, USDT, USDC, ETH or LTC from any wallet you own. We generate a unique deposit address for
              your order and confirm it automatically, usually within 10–30 minutes. Private on your side, fast-settling
              on ours.
            </p>
            <ul className="flex flex-wrap gap-2 mt-5 text-[11px] font-extrabold">
              <li className="bg-white/10 rounded-full px-3 py-1">Automatic 5% off</li>
              <li className="bg-white/10 rounded-full px-3 py-1">FREE product up to £25</li>
              <li className="bg-white/10 rounded-full px-3 py-1">Instant confirmation</li>
            </ul>
            <button
              type="button"
              onClick={() => onNavigate('/shop')}
              className="mt-6 rounded-full bg-[#aedac2] text-[#003d30] px-5 py-2.5 text-xs font-black cursor-pointer"
            >
              Shop now & pay with crypto
            </button>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#157a62] to-[#01261e] p-5 shadow-lg">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#aedac2]">NOWPayments</p>
            <p className="font-black text-lg mt-6 tracking-widest">•••• •••• BTC</p>
            <p className="text-xs text-emerald-100 mt-8">{SITE_NAME} · 5% bonus</p>
          </div>
        </section>

        <article className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 sm:p-8">
          <h3 className="text-xl font-black text-slate-900">UK Bank Transfer</h3>
          <p className="text-sm text-slate-500 mt-1">Faster Payments — clears in 1–3 hours, 24/7.</p>
          <ul className="mt-4 space-y-2 text-[15px] text-slate-600 list-disc pl-5 leading-relaxed">
            <li>Pay from any UK bank (Lloyds, HSBC, Barclays, Monzo, Starling, etc.)</li>
            <li>Bank details emailed on order. Use your order ref as the transfer reference.</li>
            <li>Order ships within 24h of payment confirmation</li>
            <li>No fees</li>
          </ul>
        </article>

        <section>
          <ResourceKicker>Cryptocurrency</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Pay with crypto</h2>
          <p className="text-[15px] text-slate-600 mt-3 mb-6 max-w-3xl leading-relaxed">
            Stablecoins like USDT and USDC remove price volatility while you complete the transfer. Already hold crypto?
            Choose crypto at checkout, send from any wallet you control, and the order auto-confirms once the network
            reaches the required confirmations.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COINS.map(([title, badge, body]) => (
              <article key={title} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#157a62]">{badge}</p>
                <p className="text-sm font-black text-slate-900 mt-1">{title}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Deposit address shown at checkout. Send from any wallet you own — exchanges, hardware wallets and mobile
            wallets alike.
          </p>
        </section>

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            ['End-to-end encrypted', 'All payment data is transmitted over TLS 1.3. We do not store banking details on our servers.'],
            ['Discreet on statements', 'Your bank statement shows only the reference you typed. Crypto stays on-chain.'],
            ['No data sharing', 'We never sell, rent or share customer information with third parties. Your privacy is non-negotiable.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <p className="font-black text-slate-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <section>
          <ResourceKicker>Frequently asked</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5">Common payment questions</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="group rounded-2xl bg-white border border-slate-100 shadow-sm px-5 py-4">
                <summary className="cursor-pointer font-black text-slate-900 text-[15px] list-none flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-[#157a62] text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="text-[15px] text-slate-600 mt-8">
            Still have questions? See{' '}
            <button type="button" className="font-black text-[#157a62] cursor-pointer" onClick={() => onNavigate('/crypto-payment-guides')}>
              Crypto Payment Guides
            </button>{' '}
            or email {SUPPORT_EMAIL}.
          </p>
        </section>
      </ResourcePageShell>
    </>
  );
};
