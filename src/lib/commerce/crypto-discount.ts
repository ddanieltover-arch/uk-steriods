export const CRYPTO_DISCOUNT_RATE = 0.05;

export function isCryptoPaymentMethod(method?: string | null): boolean {
  if (!method) return false;
  const normalised = method.toUpperCase().replace(/-/g, '_');
  return normalised === 'CRYPTO' || normalised.startsWith('CRYPTO_');
}

/** 5% off merchandise (after promo codes). Shipping is not discounted. */
export function cryptoDiscountPence(merchandisePence: number): number {
  if (merchandisePence <= 0) return 0;
  return Math.round(merchandisePence * CRYPTO_DISCOUNT_RATE);
}

export function cryptoPricePence(pricePence: number): number {
  return Math.max(0, pricePence - cryptoDiscountPence(pricePence));
}
