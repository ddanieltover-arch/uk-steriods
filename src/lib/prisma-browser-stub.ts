/** Vite-only stub so Prisma never executes in the browser. */

function strEnum<const T extends readonly string[]>(values: T) {
  return Object.fromEntries(values.map((v) => [v, v])) as { [K in T[number]]: K };
}

export const Role = strEnum(['SUPER_ADMIN', 'ADMIN', 'STAFF', 'CUSTOMER']);
export const OrderStatus = strEnum([
  'PENDING',
  'PROCESSING',
  'CONFIRMED',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
]);
export const PaymentStatus = strEnum(['PENDING', 'AWAITING_TRANSFER', 'PAID', 'FAILED', 'REFUNDED']);
export const PaymentMethod = strEnum(['BANK_TRANSFER', 'CARD', 'CRYPTO']);
export const StockStatus = strEnum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'DISCONTINUED']);
export const DiscountType = strEnum(['PERCENTAGE', 'FIXED_AMOUNT']);
export const ShipmentStatus = strEnum([
  'PENDING',
  'DISPATCHED',
  'IN_TRANSIT',
  'DELIVERED',
  'FAILED_DELIVERY',
  'RETURNED',
]);
export const NotificationEventType = strEnum([
  'ORDER_CREATED',
  'PAYMENT_INSTRUCTIONS',
  'PAYMENT_CONFIRMED',
  'ORDER_PROCESSING',
  'ORDER_SHIPPED',
  'ORDER_DELIVERED',
  'ORDER_CANCELLED',
  'PASSWORD_CHANGED',
  'PASSWORD_RESET_REQUESTED',
  'ACCOUNT_CREATED',
]);
export const NotificationChannel = strEnum(['EMAIL']);
export const NotificationStatus = strEnum(['PENDING', 'PROCESSING', 'SENT', 'FAILED', 'CANCELLED']);
export const NotificationFailureClass = strEnum([
  'TRANSIENT',
  'PERMANENT',
  'INVALID_RECIPIENT',
  'PROVIDER_ERROR',
  'RATE_LIMITED',
]);
export const BlogPostStatus = strEnum(['DRAFT', 'PUBLISHED']);

export const Prisma = {
  Role,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  StockStatus,
  DiscountType,
  ShipmentStatus,
  NotificationEventType,
  NotificationChannel,
  NotificationStatus,
  NotificationFailureClass,
  BlogPostStatus,
};

export class PrismaClient {
  constructor() {
    throw new Error('PrismaClient is server-only');
  }
}
