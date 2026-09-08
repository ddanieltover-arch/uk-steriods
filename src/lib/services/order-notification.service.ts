import { NotificationEventType } from '@prisma/client';
import { NotificationService } from '../notifications/notification.service';
import { OrderNotificationContext, PaymentInstructionsPayload } from '../notifications/notification.types';

export interface OrderNotificationPayload {
  orderId: string;
  orderNumber: string;
  createdAt?: string | Date;
  guestEmail: string;
  userId?: string | null;
  customerName?: string;
  totalPence: number;
  subtotalPence?: number;
  shippingPence?: number;
  taxPence?: number;
  discountPence?: number;
  paymentMethod: string;
  paymentStatus?: string;
  paymentInstructions?: PaymentInstructionsPayload | null;
  itemsCount?: number;
  items?: OrderNotificationContext['items'];
  shippingMethodName?: string;
  shippingAddress?: OrderNotificationContext['shippingAddress'];
  trackingToken?: string;
  trackingNumber?: string | null;
  shipmentProvider?: string | null;
  shipmentMethod?: string | null;
  estimatedDeliveryAt?: string | null;
}

function toContext(payload: OrderNotificationPayload): OrderNotificationContext {
  return {
    orderId: payload.orderId,
    orderNumber: payload.orderNumber,
    createdAt: payload.createdAt
      ? new Date(payload.createdAt).toISOString()
      : new Date().toISOString(),
    recipientEmail: payload.guestEmail,
    customerName: payload.customerName,
    userId: payload.userId,
    items: payload.items || [],
    subtotalPence: payload.subtotalPence ?? payload.totalPence,
    shippingPence: payload.shippingPence ?? 0,
    taxPence: payload.taxPence ?? 0,
    discountPence: payload.discountPence ?? 0,
    totalPence: payload.totalPence,
    paymentMethod: payload.paymentMethod,
    paymentStatus: payload.paymentStatus,
    shippingMethodName: payload.shippingMethodName,
    shippingAddress: payload.shippingAddress,
    paymentInstructions: payload.paymentInstructions || null,
    trackingToken: payload.trackingToken,
    trackingNumber: payload.trackingNumber,
    shipmentProvider: payload.shipmentProvider,
    shipmentMethod: payload.shipmentMethod,
    estimatedDeliveryAt: payload.estimatedDeliveryAt,
  };
}

function adminNotifyEmail(): string | null {
  const email = (
    process.env.ADMIN_EMAIL ||
    process.env.EMAIL_REPLY_TO ||
    process.env.EMAIL_FROM_ADDRESS ||
    'sales@uk-steroids.co.uk'
  )
    .trim()
    .toLowerCase();
  return email || null;
}

/**
 * Domain-facing order notification adapter.
 * Enqueues outbox records, then flushes delivery (required on Vercel where
 * the background worker does not run). Failures must not break checkout.
 */
export class OrderNotificationService {
  private static async enqueueCustomerAndAdmin(
    eventType: NotificationEventType,
    payload: OrderNotificationPayload,
    idempotencyParts: string[]
  ): Promise<void> {
    const customerCtx = toContext(payload);
    await NotificationService.enqueueOrderEvent(eventType, customerCtx, { idempotencyParts });

    const adminEmail = adminNotifyEmail();
    if (adminEmail && adminEmail !== customerCtx.recipientEmail.trim().toLowerCase()) {
      await NotificationService.enqueueOrderEvent(
        eventType,
        {
          ...customerCtx,
          recipientEmail: adminEmail,
          isAdminCopy: true,
          customerEmail: customerCtx.recipientEmail,
        },
        { idempotencyParts: [...idempotencyParts, 'admin'] }
      );
    }

    await NotificationService.flushPendingSafe(20);
  }

  static async notifyOrderCreated(payload: OrderNotificationPayload): Promise<void> {
    try {
      await this.enqueueCustomerAndAdmin(NotificationEventType.ORDER_CREATED, payload, [
        payload.orderId,
      ]);
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_CREATED enqueue failed', err);
    }
  }

  static async notifyPaymentConfirmed(payload: OrderNotificationPayload): Promise<void> {
    try {
      await this.enqueueCustomerAndAdmin(NotificationEventType.PAYMENT_CONFIRMED, payload, [
        payload.orderId,
        payload.paymentStatus || 'PAID',
      ]);
    } catch (err) {
      console.error('[OrderNotificationService] PAYMENT_CONFIRMED enqueue failed', err);
    }
  }

  static async notifyOrderProcessing(payload: OrderNotificationPayload): Promise<void> {
    try {
      await this.enqueueCustomerAndAdmin(NotificationEventType.ORDER_PROCESSING, payload, [
        payload.orderId,
      ]);
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_PROCESSING enqueue failed', err);
    }
  }

  static async notifyOrderDispatched(payload: OrderNotificationPayload): Promise<void> {
    try {
      await this.enqueueCustomerAndAdmin(NotificationEventType.ORDER_SHIPPED, payload, [
        payload.orderId,
        payload.trackingNumber || payload.shipmentProvider || 'shipped',
      ]);
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_SHIPPED enqueue failed', err);
    }
  }

  static async notifyOrderDelivered(payload: OrderNotificationPayload): Promise<void> {
    try {
      await this.enqueueCustomerAndAdmin(NotificationEventType.ORDER_DELIVERED, payload, [
        payload.orderId,
      ]);
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_DELIVERED enqueue failed', err);
    }
  }

  static async notifyOrderCancelled(payload: OrderNotificationPayload): Promise<void> {
    try {
      await this.enqueueCustomerAndAdmin(NotificationEventType.ORDER_CANCELLED, payload, [
        payload.orderId,
      ]);
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_CANCELLED enqueue failed', err);
    }
  }

  /** @deprecated Prefer notifyPaymentConfirmed(payload) */
  static async notifyPaymentConfirmedLegacy(orderNumber: string, recipientEmail: string): Promise<void> {
    await this.notifyPaymentConfirmed({
      orderId: orderNumber,
      orderNumber,
      guestEmail: recipientEmail,
      totalPence: 0,
      paymentMethod: 'BANK_TRANSFER',
    });
  }

  /** @deprecated Prefer notifyOrderDispatched(payload) */
  static async notifyOrderDispatchedLegacy(
    orderNumber: string,
    recipientEmail: string,
    trackingNumber: string
  ): Promise<void> {
    await this.notifyOrderDispatched({
      orderId: orderNumber,
      orderNumber,
      guestEmail: recipientEmail,
      totalPence: 0,
      paymentMethod: 'BANK_TRANSFER',
      trackingNumber,
    });
  }
}
