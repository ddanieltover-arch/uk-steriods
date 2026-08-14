import { db } from '../db';
import { TrackOrderSchema } from '../validation';

export class OrderTrackingService {
  /**
   * Helper to mask personal email address for privacy e.g. "j***@example.com"
   */
  private static maskEmail(email: string | null | undefined): string {
    if (!email || !email.includes('@')) return 'Customer';
    const [name, domain] = email.split('@');
    if (name.length <= 2) return `${name[0]}***@${domain}`;
    return `${name[0]}***${name[name.length - 1]}@${domain}`;
  }

  /**
   * Helper to mask full name e.g. "John Smith" -> "J*** S***"
   */
  private static maskName(name: string | null | undefined): string {
    if (!name) return 'Customer';
    return name
      .split(' ')
      .map((part) => (part.length > 1 ? `${part[0]}***` : part))
      .join(' ');
  }

  /**
   * Helper to mask UK postcode e.g. "SW1A 1AA" -> "SW1A ***"
   */
  private static maskPostcode(postcode: string | null | undefined): string {
    if (!postcode) return '***';
    const parts = postcode.trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0]} ***`;
    }
    return `${postcode.slice(0, 3)} ***`;
  }

  /**
   * Securely tracks a guest order requiring BOTH orderNumber AND high-entropy trackingToken
   */
  static async trackGuestOrder(input: unknown) {
    const parsed = TrackOrderSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error('Valid order number and tracking token are required.');
    }

    const { orderNumber, trackingToken } = parsed.data;

    const order = await db.order.findUnique({
      where: { orderNumber: orderNumber.trim() },
      include: {
        items: true,
        shipments: true,
        payments: true,
      },
    });

    // Verification requirement: Order MUST exist and tracking token MUST match exactly
    if (!order || order.trackingToken !== trackingToken.trim()) {
      throw new Error('Invalid order number or tracking token. Access denied.');
    }

    const shippingAddr = (order.shippingAddressSnapshot as any) || {};
    const primaryShipment = order.shipments[0] || null;

    // Return sanitized guest tracking DTO with masked private information
    return {
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      subtotalPence: order.subtotalPence,
      shippingPence: order.shippingPence,
      discountPence: order.discountPence,
      taxPence: order.taxPence,
      totalPence: order.totalPence,
      customer: {
        maskedEmail: this.maskEmail(order.guestEmail || shippingAddr.email),
        maskedName: this.maskName(shippingAddr.recipient),
        city: shippingAddr.city || 'UK',
        maskedPostcode: this.maskPostcode(shippingAddr.postcode),
        country: shippingAddr.country || 'UK',
      },
      items: order.items.map((item) => ({
        id: item.id,
        productName: item.productName,
        variantName: item.variantName,
        productSku: item.productSku,
        imageSnapshotUrl: item.imageSnapshotUrl,
        unitPricePence: item.unitPricePence,
        quantity: item.quantity,
        subtotalPence: item.subtotalPence,
      })),
      shipment: primaryShipment
        ? {
            provider: primaryShipment.provider,
            shippingMethod: primaryShipment.shippingMethod,
            trackingNumber: primaryShipment.trackingNumber,
            status: primaryShipment.status,
            estimatedDeliveryAt: primaryShipment.estimatedDeliveryAt,
            dispatchedAt: primaryShipment.dispatchedAt,
            deliveredAt: primaryShipment.deliveredAt,
          }
        : {
            provider: 'Royal Mail UK',
            shippingMethod: 'Standard Tracked 48',
            trackingNumber: null,
            status: 'PENDING',
            estimatedDeliveryAt: null,
            dispatchedAt: null,
            deliveredAt: null,
          },
      paymentInstructions:
        order.paymentStatus === 'AWAITING_TRANSFER' && order.payments[0]?.instructions
          ? order.payments[0].instructions
          : null,
    };
  }
}
