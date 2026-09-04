import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import { SUPPORT_EMAIL } from '../../data/resources';

interface CryptoPaymentGuidesPageProps {
  onNavigate: (path: string) => void;
}

const methods = [
  {
    id: 'bank',
    title: 'UK Bank Transfer',
    badge: 'No fees',
    why: [
      'No additional fees from us — what you see is what you pay',
      'Familiar — same payment flow you use for any UK transfer',
      'Faster Payments clears in 1–3 hours, even on weekends',
      'Order ships within 24h of confirmation',
    ],
    steps: [
      'Select "UK Bank Transfer" at checkout and place the order.',
      'Contact our admin team (sales@uk-steroids.co.uk) with your order number.',
      'Wait for payment instructions and payment details from our team.',
      'Complete payment only after you receive those details — do not send funds earlier.',
      'You receive a "Payment received" email once our team confirms the transfer.',
    ],
  },
  {
    id: 'crypto',
    title: 'Direct Crypto',
    badge: 'Most private',
    why: [
      'Pay-to-wallet, no KYC at our side',
      'Stablecoins (USDT/USDC) remove volatility risk',
      'Fast: USDT/USDC ~3 min, LTC ~5 min, BTC ~30 min',
      'Works with any wallet you own (Trust, MetaMask, Ledger, exchanges)',
    ],
    steps: [
      'Pick crypto at checkout and place the order.',
      'Contact our admin team (sales@uk-steroids.co.uk) with your order number.',
      'Wait for payment instructions and payment details (wallet / network) from our team.',
      'Complete payment only after you receive those details — do not send funds earlier.',
      'You receive a "Payment received" email once our team confirms the transfer.',
    ],
  },
];

const onramps = [
  { name: 'Revolut', region: 'UK · EU', body: 'Open the Crypto tab → Buy BTC/USDT → then Send to our address shown at checkout.' },
  { name: 'Coinbase', region: 'Global', body: 'Buy via debit card → withdraw to our wallet. Withdrawal fees apply per coin.' },
  { name: 'Binance', region: 'Global', body: 'Buy USDT/USDC on the spot market, then withdraw via the cheapest network (TRC20 for USDT).' },
  { name: 'Kraken', region: 'Global', body: 'GBP deposits via Faster Payments, then buy and withdraw to our wallet.' },
  { name: 'MoonPay', region: 'Widget', body: 'Buy BTC/ETH/USDT with a UK card and send straight to our address.' },
  { name: 'MetaMask', region: 'Wallet', body: 'Create a wallet, buy crypto in-app via card, then send to our address. You hold your own keys.' },
  { name: 'Trust Wallet', region: 'Wallet', body: 'Mobile self-custody for iOS and Android. Buy with a card in-app and send to our address.' },
  { name: 'Many more', region: 'Anywhere', body: 'Ledger, Phantom and any wallet that withdraws to an external address works.' },
];

export const CryptoPaymentGuidesPage: React.FC<CryptoPaymentGuidesPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoHead
        title={`Crypto Payment Guides | ${SITE_NAME}`}
        description="Step-by-step guides for UK bank transfer and crypto checkout."
        canonical={`${window.location.origin}/crypto-payment-guides`}
      />
      <ResourcePageShell
        kicker="Step-by-step guides"
        title={`How to pay at ${SITE_NAME}`}
        intro="Two ways to pay — UK bank transfer or crypto. Each guide walks you through every step, from cart to confirmation email."
        currentPath="/crypto-payment-guides"
        onNavigate={onNavigate}
      >
        <div className="flex flex-wrap gap-2 text-[11px] font-extrabold">
          <span className="bg-white border border-slate-100 text-[#157a62] px-3 py-1.5 rounded-full shadow-sm">Bank transfer or crypto only</span>
          <span className="bg-white border border-slate-100 text-[#157a62] px-3 py-1.5 rounded-full shadow-sm">No extra fees from us</span>
          <span className="bg-white border border-slate-100 text-[#157a62] px-3 py-1.5 rounded-full shadow-sm">Discreet on statements</span>
        </div>

        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400 mb-3">Jump to a method</p>
          <div className="flex flex-wrap gap-2">
            {methods.map((method) => (
              <a
                key={method.id}
                href={`#${method.id}`}
                className="rounded-full bg-white border border-slate-100 px-4 py-2 text-xs font-black text-slate-800 shadow-sm hover:bg-[#e8f6ef] hover:text-[#0f5c48]"
              >
                {method.title}
                <span className="ml-2 text-[#157a62] font-extrabold">{method.badge}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {methods.map((method) => (
            <section key={method.id} id={method.id} className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 sm:p-8 scroll-mt-28">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{method.title}</h2>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#157a62] bg-[#e8f6ef] px-2.5 py-1 rounded-full">
                  {method.badge}
                </span>
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400 mt-6">Why pick this</p>
              <ul className="mt-2 space-y-1.5 text-[15px] text-slate-600 list-disc pl-5 leading-relaxed">
                {method.why.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400 mt-6">How to pay</p>
              <ol className="mt-3 space-y-3">
                {method.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-[15px] text-slate-700 leading-relaxed">
                    <span className="h-7 w-7 shrink-0 rounded-full bg-[#e8f6ef] text-[#157a62] text-xs font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <section>
          <ResourceKicker>On-ramps</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Don't have crypto yet?</h2>
          <p className="text-[15px] text-slate-600 mt-3 mb-6 max-w-2xl leading-relaxed">
            Buy crypto on an exchange or wallet, then send it to the address shown at checkout. Or skip this and pay by
            UK bank transfer.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {onramps.map((item) => (
              <article key={item.name} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 flex flex-col">
                <p className="text-sm font-black text-slate-900">{item.name}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#157a62] mt-0.5">{item.region}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed flex-1">{item.body}</p>
                <p className="text-[11px] font-extrabold text-[#157a62] mt-4">How to open an account</p>
              </article>
            ))}
          </div>
        </section>

        <div className="rounded-3xl bg-[#fff8e8] border border-amber-100 p-6 sm:p-8">
          <h3 className="font-black text-slate-900 text-lg">Double-check before you send</h3>
          <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
            Crypto and bank transfers are irreversible. Always verify the wallet address (or sort code + account number)
            and the exact amount before confirming. If something doesn't match, pause and email {SUPPORT_EMAIL}.
          </p>
        </div>

        <p className="text-[15px] text-slate-600">
          Want the high-level overview? Compare methods on{' '}
          <button type="button" className="font-black text-[#157a62] cursor-pointer" onClick={() => onNavigate('/payment-methods')}>
            Payment Methods
          </button>
          .
        </p>
      </ResourcePageShell>
    </>
  );
};
