import { OrderNotificationPayload } from './order-notification.service';

type OrderLike = {
  id: string;
  orderNumber: string;
  createdAt?: Date | string;
  guestEmail?: string | null;
  userId?: string | null;
  user?: { email?: string | null; firstName?: string | null; lastName?: string | null } | null;
  totalPence: number;
  subtotalPence?: number;
  shippingPence?: number;
  taxPence?: number;
  discountPence?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  trackingToken?: string | null;
  shippingAddressSnapshot?: any;
  items?: Array<{
    productName: string;
    productSku: string;
    variantName?: string | null;
    quantity: number;
    unitPricePence: number;
    subtotalPence: number;
  }>;
  payments?: Array<{ instructions?: any }>;
  shipments?: Array<{
    provider?: string | null;
    shippingMethod?: string | null;
    trackingNumber?: string | null;
    estimatedDeliveryAt?: Date | string | null;
  }>;
};

export function buildOrderNotificationPayload(
  order: OrderLike,
  extras: Partial<OrderNotificationPayload> = {}
): OrderNotificationPayload {
  const shipping = (order.shippingAddressSnapshot || {}) as Record<string, any>;
  const shipment = order.shipments?.[0];

  const recipient =
    extras.guestEmail || order.guestEmail || order.user?.email || '';

  const customerName =
    extras.customerName ||
    [order.user?.firstName, order.user?.lastName].filter(Boolean).join(' ') ||
    shipping.recipient ||
    [shipping.firstName, shipping.lastName].filter(Boolean).join(' ') ||
    undefined;

  const base: OrderNotificationPayload = {
    orderId: order.id,
    orderNumber: order.orderNumber,
    createdAt: order.createdAt,
    guestEmail: recipient,
    userId: order.userId,
    customerName,
    totalPence: order.totalPence,
    subtotalPence: order.subtotalPence,
    shippingPence: order.shippingPence,
    taxPence: order.taxPence,
    discountPence: order.discountPence,
    paymentMethod: String(order.paymentMethod || 'BANK_TRANSFER'),
    paymentStatus: order.paymentStatus ? String(order.paymentStatus) : undefined,
    paymentInstructions:
      extras.paymentInstructions ??
      (order.payments?.[0]?.instructions as OrderNotificationPayload['paymentInstructions']) ??
      null,
    items: order.items?.map((i) => ({
      productName: i.productName,
      productSku: i.productSku,
      variantName: i.variantName,
      quantity: i.quantity,
      unitPricePence: i.unitPricePence,
      subtotalPence: i.subtotalPence,
    })),
    shippingAddress: {
      firstName: shipping.firstName || (shipping.recipient ? String(shipping.recipient).split(' ')[0] : undefined),
      lastName:
        shipping.lastName ||
        (shipping.recipient ? String(shipping.recipient).split(' ').slice(1).join(' ') : undefined),
      addressLine1: shipping.addressLine1 || shipping.line1,
      addressLine2: shipping.addressLine2 || shipping.line2,
      city: shipping.city,
      county: shipping.county,
      postcode: shipping.postcode,
      country: shipping.country,
    },
    trackingToken: order.trackingToken || undefined,
    trackingNumber: shipment?.trackingNumber || null,
    shipmentProvider: shipment?.provider || null,
    shipmentMethod: shipment?.shippingMethod || null,
    estimatedDeliveryAt: shipment?.estimatedDeliveryAt
      ? new Date(shipment.estimatedDeliveryAt).toISOString()
      : null,
  };

  return {
    ...base,
    ...extras,
    orderId: order.id,
    orderNumber: order.orderNumber,
    guestEmail: recipient,
  };
}
