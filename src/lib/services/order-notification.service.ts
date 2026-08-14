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

/**
 * Domain-facing order notification adapter.
 * Enqueues outbox records only — never calls the email provider directly.
 * Failures here must not break checkout/admin flows.
 */
export class OrderNotificationService {
  static async notifyOrderCreated(payload: OrderNotificationPayload): Promise<void> {
    try {
      await NotificationService.enqueueOrderEvent(NotificationEventType.ORDER_CREATED, toContext(payload), {
        idempotencyParts: [payload.orderId],
      });
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_CREATED enqueue failed', err);
    }
  }

  static async notifyPaymentConfirmed(payload: OrderNotificationPayload): Promise<void> {
    try {
      await NotificationService.enqueueOrderEvent(
        NotificationEventType.PAYMENT_CONFIRMED,
        toContext(payload),
        { idempotencyParts: [payload.orderId, payload.paymentStatus || 'PAID'] }
      );
    } catch (err) {
      console.error('[OrderNotificationService] PAYMENT_CONFIRMED enqueue failed', err);
    }
  }

  static async notifyOrderProcessing(payload: OrderNotificationPayload): Promise<void> {
    try {
      await NotificationService.enqueueOrderEvent(
        NotificationEventType.ORDER_PROCESSING,
        toContext(payload),
        { idempotencyParts: [payload.orderId] }
      );
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_PROCESSING enqueue failed', err);
    }
  }

  static async notifyOrderDispatched(payload: OrderNotificationPayload): Promise<void> {
    try {
      await NotificationService.enqueueOrderEvent(
        NotificationEventType.ORDER_SHIPPED,
        toContext(payload),
        {
          idempotencyParts: [
            payload.orderId,
            payload.trackingNumber || payload.shipmentProvider || 'shipped',
          ],
        }
      );
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_SHIPPED enqueue failed', err);
    }
  }

  static async notifyOrderDelivered(payload: OrderNotificationPayload): Promise<void> {
    try {
      await NotificationService.enqueueOrderEvent(
        NotificationEventType.ORDER_DELIVERED,
        toContext(payload),
        { idempotencyParts: [payload.orderId] }
      );
    } catch (err) {
      console.error('[OrderNotificationService] ORDER_DELIVERED enqueue failed', err);
    }
  }

  static async notifyOrderCancelled(payload: OrderNotificationPayload): Promise<void> {
    try {
      await NotificationService.enqueueOrderEvent(
        NotificationEventType.ORDER_CANCELLED,
        toContext(payload),
        { idempotencyParts: [payload.orderId] }
      );
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
