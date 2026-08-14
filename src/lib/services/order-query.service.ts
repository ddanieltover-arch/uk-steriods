import { db } from '../db';
import { InventoryService } from './inventory.service';
import { OrderStatus, PaymentStatus } from '@prisma/client';

export interface OrderQueryOptions {
  page?: number;
  limit?: number;
}

export class OrderQueryService {
  /**
   * Fetches paginated order history strictly scoped to the authenticated customer ID
   */
  static async getUserOrders(userId: string, options: OrderQueryOptions = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(50, Math.max(1, options.limit || 10));
    const skip = (page - 1) * limit;

    const [total, orders] = await Promise.all([
      db.order.count({ where: { userId } }),
      db.order.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
          shipments: true,
        },
      }),
    ]);

    const formattedOrders = orders.map((order) => {
      const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
      const primaryShipment = order.shipments[0] || null;

      return {
        id: order.id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        subtotalPence: order.subtotalPence,
        discountPence: order.discountPence,
        shippingPence: order.shippingPence,
        totalPence: order.totalPence,
        itemCount,
        shipmentStatus: primaryShipment ? primaryShipment.status : 'PENDING',
        trackingNumber: primaryShipment?.trackingNumber || null,
        itemsSummary: order.items.map((item) => ({
          id: item.id,
          productName: item.productName,
          variantName: item.variantName,
          quantity: item.quantity,
          unitPricePence: item.unitPricePence,
          subtotalPence: item.subtotalPence,
          imageSnapshotUrl: item.imageSnapshotUrl,
        })),
      };
    });

    return {
      orders: formattedOrders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Retrieves single order detail with strict user ownership verification
   * Crucial: Uses historical order snapshot items, NOT live Product table
   */
  static async getUserOrderDetail(userId: string, orderNumber: string) {
    const order = await db.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        payments: true,
        shipments: true,
      },
    });

    if (!order) {
      return null;
    }

    // IDOR protection: Must belong strictly to the authenticated user
    if (order.userId !== userId) {
      throw new Error('Access denied. You do not have permission to view this order.');
    }

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      trackingToken: order.trackingToken,
      createdAt: order.createdAt,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      subtotalPence: order.subtotalPence,
      discountPence: order.discountPence,
      shippingPence: order.shippingPence,
      taxPence: order.taxPence,
      totalPence: order.totalPence,
      shippingAddress: order.shippingAddressSnapshot,
      billingAddress: order.billingAddressSnapshot,
      // Historical Snapshot Items
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        productName: item.productName,
        productSku: item.productSku,
        variantName: item.variantName,
        imageSnapshotUrl: item.imageSnapshotUrl,
        unitPricePence: item.unitPricePence,
        quantity: item.quantity,
        subtotalPence: item.subtotalPence,
        attributesSnapshotJson: item.attributesSnapshotJson,
      })),
      payments: order.payments.map((p) => ({
        id: p.id,
        amountPence: p.amountPence,
        provider: p.provider,
        status: p.status,
        referenceCode: p.referenceCode,
        instructions: p.instructions,
        createdAt: p.createdAt,
      })),
      shipments: order.shipments.map((s) => ({
        id: s.id,
        provider: s.provider,
        shippingMethod: s.shippingMethod,
        trackingNumber: s.trackingNumber,
        status: s.status,
        estimatedDeliveryAt: s.estimatedDeliveryAt,
        dispatchedAt: s.dispatchedAt,
        deliveredAt: s.deliveredAt,
      })),
    };
  }

  /**
   * Cancels a pending order and restores reserved stock
   */
  static async cancelOrder(userId: string, orderNumber: string) {
    const order = await db.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });

    if (!order) {
      throw new Error(`Order #${orderNumber} not found.`);
    }

    if (order.userId !== userId) {
      throw new Error('Access denied. You do not have permission to cancel this order.');
    }

    // Cancellation rule: Only PENDING orders can be cancelled directly by customer
    if (order.status !== OrderStatus.PENDING) {
      throw new Error(`Order #${orderNumber} cannot be cancelled because its status is '${order.status}'.`);
    }

    return db.$transaction(async (tx) => {
      // 1. Restore reserved inventory for items
      for (const item of order.items) {
        if (item.productId) {
          await InventoryService.releaseStock(
            item.productId,
            item.variantId || undefined,
            item.quantity
          );
        }
      }

      // 2. Update order and payment status
      const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.CANCELLED,
          paymentStatus: PaymentStatus.FAILED,
        },
      });

      // 3. Update payment record if exists
      await tx.payment.updateMany({
        where: { orderId: order.id },
        data: { status: PaymentStatus.FAILED },
      });

      return updatedOrder;
    });
  }
}
