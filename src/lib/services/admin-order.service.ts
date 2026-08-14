import { db } from '../db';
import { OrderStatus, PaymentStatus, ShipmentStatus } from '@prisma/client';
import { InventoryService } from './inventory.service';
import { OrderNotificationService } from './order-notification.service';
import { buildOrderNotificationPayload } from './order-notification-payload';

export class AdminOrderService {
  /**
   * Allowed state machine transitions
   */
  private static ALLOWED_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    PENDING: [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    CONFIRMED: [OrderStatus.PROCESSING, OrderStatus.CANCELLED, OrderStatus.REFUNDED],
    PROCESSING: [OrderStatus.SHIPPED, OrderStatus.CANCELLED, OrderStatus.REFUNDED],
    SHIPPED: [OrderStatus.DELIVERED, OrderStatus.REFUNDED],
    DELIVERED: [OrderStatus.REFUNDED],
    CANCELLED: [],
    REFUNDED: [],
  };

  /**
   * List orders for admin dashboard with filters, search, and pagination
   */
  static async listOrders(options: {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (options.status) {
      where.status = options.status;
    }

    if (options.paymentStatus) {
      where.paymentStatus = options.paymentStatus;
    }

    if (options.search) {
      const q = options.search;
      where.OR = [
        { orderNumber: { contains: q, mode: 'insensitive' } },
        { guestEmail: { contains: q, mode: 'insensitive' } },
        { user: { email: { contains: q, mode: 'insensitive' } } },
        { shipments: { some: { trackingNumber: { contains: q, mode: 'insensitive' } } } },
      ];
    }

    const [orders, total] = await Promise.all([
      db.order.findMany({
        where,
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true },
          },
          items: true,
          payments: true,
          shipments: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.order.count({ where }),
    ]);

    return {
      orders,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Get single order detail by orderNumber with full historical OrderItem snapshots
   */
  static async getOrderByNumber(orderNumber: string) {
    const order = await db.order.findUnique({
      where: { orderNumber },
      include: {
        user: {
          select: { id: true, email: true, firstName: true, lastName: true, phone: true },
        },
        items: true,
        payments: true,
        shipments: true,
      },
    });

    if (!order) {
      throw new Error(`Order #${orderNumber} not found.`);
    }

    return order;
  }

  /**
   * Update order status with state machine enforcement
   */
  static async updateOrderStatus(orderNumber: string, newStatus: OrderStatus) {
    const order = await db.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });

    if (!order) {
      throw new Error(`Order #${orderNumber} not found.`);
    }

    if (order.status === newStatus) {
      return order;
    }

    const allowedTransitions = this.ALLOWED_STATUS_TRANSITIONS[order.status] || [];
    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(
        `Invalid order status transition: Cannot change order #${orderNumber} from '${order.status}' to '${newStatus}'.`
      );
    }

    const updated = await db.$transaction(async (tx) => {
      // If order is being cancelled, release reserved stock
      if (newStatus === OrderStatus.CANCELLED && order.status !== OrderStatus.CANCELLED) {
        for (const item of order.items) {
          if (item.productId) {
            await InventoryService.releaseStock(
              item.productId,
              item.variantId || undefined,
              item.quantity
            );
          }
        }
      }

      // If order is confirmed or shipped, finalize stock deduction if needed
      if (
        (newStatus === OrderStatus.CONFIRMED || newStatus === OrderStatus.SHIPPED) &&
        order.status === OrderStatus.PENDING
      ) {
        for (const item of order.items) {
          if (item.productId) {
            await InventoryService.finalizeDeduction(
              item.productId,
              item.variantId || undefined,
              item.quantity
            );
          }
        }
      }

      return tx.order.update({
        where: { id: order.id },
        data: { status: newStatus },
        include: {
          items: true,
          payments: true,
          shipments: true,
          user: { select: { email: true, firstName: true, lastName: true } },
        },
      });
    });

    // Notifications after successful commit (never inside the transaction)
    try {
      const payload = buildOrderNotificationPayload(updated);
      if (newStatus === OrderStatus.PROCESSING) {
        await OrderNotificationService.notifyOrderProcessing(payload);
      } else if (newStatus === OrderStatus.SHIPPED) {
        await OrderNotificationService.notifyOrderDispatched(payload);
      } else if (newStatus === OrderStatus.DELIVERED) {
        await OrderNotificationService.notifyOrderDelivered(payload);
      } else if (newStatus === OrderStatus.CANCELLED) {
        await OrderNotificationService.notifyOrderCancelled(payload);
      }
    } catch (err) {
      console.error('[AdminOrderService] notification enqueue failed after status update', err);
    }

    return updated;
  }

  /**
   * Controlled update of payment status (e.g. marking bank transfer paid)
   */
  static async updatePaymentStatus(orderNumber: string, paymentStatus: PaymentStatus) {
    const order = await db.order.findUnique({
      where: { orderNumber },
      include: { payments: true },
    });

    if (!order) {
      throw new Error(`Order #${orderNumber} not found.`);
    }

    const updatedOrder = await db.$transaction(async (tx) => {
      // Update order paymentStatus
      const next = await tx.order.update({
        where: { id: order.id },
        data: {
          paymentStatus,
          // If payment marked as PAID and order is PENDING, auto-advance order status to CONFIRMED
          ...(paymentStatus === PaymentStatus.PAID && order.status === OrderStatus.PENDING
            ? { status: OrderStatus.CONFIRMED }
            : {}),
        },
        include: {
          items: true,
          payments: true,
          shipments: true,
          user: { select: { email: true, firstName: true, lastName: true } },
        },
      });

      // Update associated Payment record
      if (order.payments.length > 0) {
        await tx.payment.update({
          where: { id: order.payments[0].id },
          data: { status: paymentStatus },
        });
      }

      return next;
    });

    if (paymentStatus === PaymentStatus.PAID) {
      try {
        await OrderNotificationService.notifyPaymentConfirmed(
          buildOrderNotificationPayload(updatedOrder, { paymentStatus: 'PAID' })
        );
      } catch (err) {
        console.error('[AdminOrderService] payment confirmation notification failed', err);
      }
    }

    return updatedOrder;
  }

  /**
   * Fulfillment & shipment record update
   */
  static async updateShipment(
    orderNumber: string,
    data: {
      provider: string;
      shippingMethod: string;
      trackingNumber: string;
      status?: ShipmentStatus;
      estimatedDeliveryAt?: string;
    }
  ) {
    const order = await db.order.findUnique({
      where: { orderNumber },
      include: { shipments: true },
    });

    if (!order) {
      throw new Error(`Order #${orderNumber} not found.`);
    }

    const shipment = await db.$transaction(async (tx) => {
      let nextShipment;
      if (order.shipments.length > 0) {
        nextShipment = await tx.shipment.update({
          where: { id: order.shipments[0].id },
          data: {
            provider: data.provider,
            shippingMethod: data.shippingMethod,
            trackingNumber: data.trackingNumber,
            status: data.status || ShipmentStatus.DISPATCHED,
            dispatchedAt: new Date(),
            ...(data.estimatedDeliveryAt && { estimatedDeliveryAt: new Date(data.estimatedDeliveryAt) }),
          },
        });
      } else {
        nextShipment = await tx.shipment.create({
          data: {
            orderId: order.id,
            provider: data.provider,
            shippingMethod: data.shippingMethod,
            trackingNumber: data.trackingNumber,
            status: data.status || ShipmentStatus.DISPATCHED,
            dispatchedAt: new Date(),
            ...(data.estimatedDeliveryAt && { estimatedDeliveryAt: new Date(data.estimatedDeliveryAt) }),
          },
        });
      }

      // Automatically update order status to SHIPPED if currently PENDING, CONFIRMED, or PROCESSING
      if (([OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PROCESSING] as OrderStatus[]).includes(order.status)) {
        await tx.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.SHIPPED },
        });
      }

      return nextShipment;
    });

    try {
      const full = await db.order.findUnique({
        where: { id: order.id },
        include: {
          items: true,
          payments: true,
          shipments: true,
          user: { select: { email: true, firstName: true, lastName: true } },
        },
      });
      if (full) {
        await OrderNotificationService.notifyOrderDispatched(
          buildOrderNotificationPayload(full, {
            trackingNumber: shipment.trackingNumber,
            shipmentProvider: shipment.provider,
            shipmentMethod: shipment.shippingMethod,
            estimatedDeliveryAt: shipment.estimatedDeliveryAt
              ? shipment.estimatedDeliveryAt.toISOString()
              : null,
          })
        );
      }
    } catch (err) {
      console.error('[AdminOrderService] shipment notification failed', err);
    }

    return shipment;
  }
}
