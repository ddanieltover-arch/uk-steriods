export interface CryptoWalletAddresses {
  btcAddress?: string;
  ethAddress?: string;
  bchAddress?: string;
}

export interface CryptoWalletEntry {
  coin: 'BTC' | 'ETH' | 'BCH';
  label: string;
  network: string;
  address: string;
}

function trimAddress(value: string | undefined | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

/** Read receive wallets from server env (CRYPTO_*). */
export function getCryptoWalletsFromEnv(
  env: NodeJS.ProcessEnv = process.env
): CryptoWalletAddresses {
  return {
    btcAddress: trimAddress(env.CRYPTO_BTC_ADDRESS),
    ethAddress: trimAddress(env.CRYPTO_ETH_ADDRESS),
    bchAddress: trimAddress(env.CRYPTO_BCH_ADDRESS),
  };
}

export function hasCryptoWallets(wallets: CryptoWalletAddresses | null | undefined): boolean {
  if (!wallets) return false;
  return Boolean(wallets.btcAddress || wallets.ethAddress || wallets.bchAddress);
}

export function listCryptoWallets(
  wallets: CryptoWalletAddresses | null | undefined
): CryptoWalletEntry[] {
  if (!wallets) return [];
  const entries: CryptoWalletEntry[] = [];
  if (wallets.btcAddress) {
    entries.push({
      coin: 'BTC',
      label: 'Bitcoin (BTC)',
      network: 'Bitcoin network',
      address: wallets.btcAddress,
    });
  }
  if (wallets.ethAddress) {
    entries.push({
      coin: 'ETH',
      label: 'Ethereum (ETH)',
      network: 'ERC-20 / Ethereum mainnet',
      address: wallets.ethAddress,
    });
  }
  if (wallets.bchAddress) {
    entries.push({
      coin: 'BCH',
      label: 'Bitcoin Cash (BCH)',
      network: 'Bitcoin Cash (CashAddr)',
      address: wallets.bchAddress,
    });
  }
  return entries;
}

export function cryptoWalletsPlainText(wallets: CryptoWalletAddresses | null | undefined): string {
  return listCryptoWallets(wallets)
    .map((w) => `${w.label}: ${w.address}`)
    .join('\n');
}
