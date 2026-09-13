import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import {
  hasCryptoWallets,
  listCryptoWallets,
  type CryptoWalletAddresses,
} from '../../lib/commerce/crypto-wallets';

type Tone = 'dark' | 'light' | 'amber';

interface CryptoPaymentDetailsProps {
  wallets: CryptoWalletAddresses | null | undefined;
  referenceCode: string;
  formattedTotal?: string;
  note?: string | null;
  tone?: Tone;
  className?: string;
}

const toneStyles: Record<
  Tone,
  {
    row: string;
    label: string;
    network: string;
    address: string;
    button: string;
    hint: string;
  }
> = {
  dark: {
    row: 'bg-white/5 border border-white/10',
    label: 'text-white',
    network: 'text-teal-200/80',
    address: 'text-teal-100',
    button: 'bg-white/10 hover:bg-white/15 text-teal-100 border border-white/10',
    hint: 'text-teal-100/70',
  },
  light: {
    row: 'bg-slate-50 border border-slate-200',
    label: 'text-slate-900',
    network: 'text-slate-500',
    address: 'text-slate-800',
    button: 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200',
    hint: 'text-slate-500',
  },
  amber: {
    row: 'bg-white border border-amber-200',
    label: 'text-amber-950',
    network: 'text-amber-700/80',
    address: 'text-amber-950',
    button: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200',
    hint: 'text-amber-800',
  },
};

export const CryptoPaymentDetails: React.FC<CryptoPaymentDetailsProps> = ({
  wallets,
  referenceCode,
  formattedTotal,
  note,
  tone = 'light',
  className = '',
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const entries = listCryptoWallets(wallets);
  const styles = toneStyles[tone];

  if (!hasCryptoWallets(wallets) || entries.length === 0) {
    return null;
  }

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      window.setTimeout(() => setCopied((current) => (current === address ? null : current)), 2000);
    } catch {
      // Clipboard may be blocked; address remains selectable.
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {note ? <p className={`text-xs leading-relaxed ${styles.hint}`}>{note}</p> : null}
      {formattedTotal ? (
        <p className={`text-xs ${styles.hint}`}>
          Amount due: <span className={`font-mono font-bold ${styles.label}`}>{formattedTotal}</span>
          {' · '}
          Reference: <span className={`font-mono font-bold ${styles.label}`}>{referenceCode}</span>
        </p>
      ) : (
        <p className={`text-xs ${styles.hint}`}>
          Reference: <span className={`font-mono font-bold ${styles.label}`}>{referenceCode}</span>
        </p>
      )}
      <div className="space-y-2">
        {entries.map((wallet) => (
          <div key={wallet.coin} className={`rounded-xl p-3 ${styles.row}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <p className={`text-[11px] font-black uppercase tracking-wider ${styles.label}`}>
                  {wallet.label}
                </p>
                <p className={`text-[10px] ${styles.network}`}>{wallet.network}</p>
                <p className={`font-mono text-[11px] sm:text-xs break-all leading-relaxed ${styles.address}`}>
                  {wallet.address}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyAddress(wallet.address)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${styles.button}`}
              >
                {copied === wallet.address ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className={`text-[10px] leading-relaxed ${styles.hint}`}>
        Send only on the matching network. After payment, email sales@uk-steroids.co.uk with your order
        number and transaction hash.
      </p>
    </div>
  );
};
