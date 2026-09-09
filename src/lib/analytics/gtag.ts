/** GA4 gtag helpers — no-ops when measurement ID is unset or gtag is unavailable. */

export type Ga4Item = {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
};

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

function canTrack(): boolean {
  return Boolean(MEASUREMENT_ID && typeof window !== 'undefined' && typeof window.gtag === 'function');
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!canTrack()) return;
  window.gtag!('event', eventName, params);
}

export function trackPageView(path: string): void {
  if (!canTrack() || !MEASUREMENT_ID) return;
  window.gtag!('event', 'page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: document.title,
    send_to: MEASUREMENT_ID,
  });
}

export function trackViewItem(item: Ga4Item, value?: number): void {
  trackEvent('view_item', {
    currency: 'GBP',
    value: value ?? item.price ?? 0,
    items: [item],
  });
}

export function trackAddToCart(item: Ga4Item, value?: number): void {
  const qty = item.quantity ?? 1;
  const lineValue = value ?? (item.price != null ? item.price * qty : 0);
  trackEvent('add_to_cart', {
    currency: 'GBP',
    value: lineValue,
    items: [{ ...item, quantity: qty }],
  });
}

export function trackBeginCheckout(items: Ga4Item[], value: number): void {
  trackEvent('begin_checkout', {
    currency: 'GBP',
    value,
    items,
  });
}

export function trackPurchase(input: {
  transactionId: string;
  value: number;
  shipping?: number;
  tax?: number;
  items: Ga4Item[];
  paymentType?: string;
}): void {
  // Dedupe refreshes / StrictMode double-mount on the success page.
  const key = `ga4_purchase_${input.transactionId}`;
  try {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key)) return;
    sessionStorage?.setItem(key, '1');
  } catch {
    // sessionStorage may be blocked; still fire once per call site mount.
  }

  trackEvent('purchase', {
    transaction_id: input.transactionId,
    currency: 'GBP',
    value: input.value,
    shipping: input.shipping ?? 0,
    tax: input.tax ?? 0,
    payment_type: input.paymentType,
    items: input.items,
  });
}

export function penceToGbp(pence: number | null | undefined): number {
  return Math.round((pence || 0)) / 100;
}
