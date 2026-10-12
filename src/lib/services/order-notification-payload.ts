import { OrderNotificationPayload } from './order-notification.service';

type OrderLike = {
  id: string;
  orderNumber: string;
  createdAt?: Date | string;
  guestEmail?: string | null;
  userId?: string | null;
  user?: { email?: string | null; firstName?: string | null; lastName?: string | null; phone?: string | null } | null;
  totalPence: number;
  subtotalPence?: number;
  shippingPence?: number;
  taxPence?: number;
  discountPence?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  trackingToken?: string | null;
  shippingAddressSnapshot?: any;
  billingAddressSnapshot?: any;
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
  const billing = (order.billingAddressSnapshot || {}) as Record<string, any>;
  const shipment = order.shipments?.[0];

  const recipient =
    extras.guestEmail || order.guestEmail || order.user?.email || shipping.email || '';

  const customerName =
    extras.customerName ||
    [order.user?.firstName, order.user?.lastName].filter(Boolean).join(' ') ||
    shipping.recipient ||
    [shipping.firstName, shipping.lastName].filter(Boolean).join(' ') ||
    billing.recipient ||
    undefined;

  const customerPhone =
    extras.customerPhone ||
    order.user?.phone ||
    shipping.phone ||
    billing.phone ||
    undefined;

  const shippingRecipient =
    shipping.recipient ||
    [shipping.firstName, shipping.lastName].filter(Boolean).join(' ') ||
    customerName;

  const billingRecipient =
    billing.recipient ||
    [billing.firstName, billing.lastName].filter(Boolean).join(' ') ||
    customerName;

  const hasBillingAddress = Boolean(
    billing.line1 ||
    billing.addressLine1 ||
    billing.postcode ||
    billing.city ||
    (billing.recipient && billing.recipient !== shippingRecipient)
  );

  const base: OrderNotificationPayload = {
    orderId: order.id,
    orderNumber: order.orderNumber,
    createdAt: order.createdAt,
    guestEmail: recipient,
    userId: order.userId,
    customerName,
    customerPhone,
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
      recipient: shippingRecipient,
      firstName: shipping.firstName || (shippingRecipient ? String(shippingRecipient).split(' ')[0] : undefined),
      lastName:
        shipping.lastName ||
        (shippingRecipient ? String(shippingRecipient).split(' ').slice(1).join(' ') : undefined),
      addressLine1: shipping.addressLine1 || shipping.line1,
      addressLine2: shipping.addressLine2 || shipping.line2,
      city: shipping.city,
      county: shipping.county,
      postcode: shipping.postcode,
      country: shipping.country || 'GB',
      phone: shipping.phone || customerPhone,
      email: shipping.email || recipient,
    },
    billingAddress: hasBillingAddress
      ? {
          recipient: billingRecipient,
          firstName: billing.firstName || (billingRecipient ? String(billingRecipient).split(' ')[0] : undefined),
          lastName:
            billing.lastName ||
            (billingRecipient ? String(billingRecipient).split(' ').slice(1).join(' ') : undefined),
          addressLine1: billing.addressLine1 || billing.line1,
          addressLine2: billing.addressLine2 || billing.line2,
          city: billing.city,
          county: billing.county,
          postcode: billing.postcode,
          country: billing.country || 'GB',
          phone: billing.phone || customerPhone,
          email: billing.email || recipient,
        }
      : undefined,
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
