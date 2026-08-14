export * from '../lib/validation';
export * from '../lib/services/payment.service';
export * from '../lib/services/shipping.service';
export * from '../lib/services/rbac.service';

export interface FormattedGbpAmount {
  pence: number;
  formatted: string;
}

export function formatGbp(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}
