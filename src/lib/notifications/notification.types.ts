import { NotificationEventType } from '@prisma/client';

export { NotificationEventType };

export type NotificationChannel = 'EMAIL';

export interface EmailAddress {
  email: string;
  name?: string;
}

export interface EmailMessage {
  to: EmailAddress;
  from: EmailAddress;
  replyTo?: EmailAddress;
  subject: string;
  html: string;
  text: string;
  idempotencyKey?: string;
  tags?: string[];
}

export interface EmailSendResult {
  success: boolean;
  provider: string;
  messageId?: string;
  errorCode?: string;
  errorMessage?: string;
  failureClass?: 'TRANSIENT' | 'PERMANENT' | 'INVALID_RECIPIENT' | 'PROVIDER_ERROR' | 'RATE_LIMITED';
}

export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<EmailSendResult>;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export interface OrderItemSnapshot {
  productName: string;
  productSku: string;
  variantName?: string | null;
  quantity: number;
  unitPricePence: number;
  subtotalPence: number;
}

export interface AddressSnapshot {
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  county?: string;
  postcode?: string;
  country?: string;
}

export interface PaymentInstructionsPayload {
  method?: string;
  referenceCode?: string;
  accountName?: string;
  sortCode?: string;
  accountNumber?: string;
  bankName?: string;
  formattedTotal?: string;
  note?: string;
}

export interface OrderNotificationContext {
  orderId: string;
  orderNumber: string;
  createdAt: string;
  recipientEmail: string;
  customerName?: string;
  userId?: string | null;
  items: OrderItemSnapshot[];
  subtotalPence: number;
  shippingPence: number;
  taxPence: number;
  discountPence: number;
  totalPence: number;
  paymentMethod: string;
  paymentStatus?: string;
  shippingMethodName?: string;
  shippingAddress?: AddressSnapshot;
  paymentInstructions?: PaymentInstructionsPayload | null;
  trackingToken?: string;
  trackingNumber?: string | null;
  shipmentProvider?: string | null;
  shipmentMethod?: string | null;
  estimatedDeliveryAt?: string | null;
  supportEmail?: string;
  /** When true, render the admin/ops copy of an order email. */
  isAdminCopy?: boolean;
  /** Customer email shown on admin order alerts. */
  customerEmail?: string;
}

export interface AccountNotificationContext {
  userId: string;
  email: string;
  firstName: string;
  lastName?: string;
  resetUrl?: string;
  changedAt?: string;
}

export type NotificationPayload =
  | { kind: 'order'; data: OrderNotificationContext }
  | { kind: 'account'; data: AccountNotificationContext };

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function formatPence(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function escapeHtml(value: string | null | undefined): string {
  if (!value) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildIdempotencyKey(eventType: NotificationEventType, parts: string[]): string {
  return `${eventType}:${parts.filter(Boolean).join(':')}`;
}
