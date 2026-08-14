import { db } from '../db';
import { NotificationStatus, OrderStatus, PaymentStatus, StockStatus } from '@prisma/client';

export class AdminDashboardService {
  /**
   * Retrieves database-backed metrics for the operational admin dashboard.
   *
   * BUSINESS REVENUE CALCULATION RULE:
   * Revenue is calculated from authoritative order records in integer pence.
   * Included: Orders with status PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED.
   * Excluded: Orders with status CANCELLED or REFUNDED.
   */
  static async getMetrics() {
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalOrders,
      pendingOrders,
      processingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      refundedOrders,
      pendingPayments,
      failedPayments,
      ordersForRevenue,
      productOut,
      productLow,
      variantOut,
      variantLow,
      recentOrders,
      failedNotifications,
      pendingNotifications,
      ordersLast24h,
      ordersLast7d,
      recentAudit,
    ] = await Promise.all([
      db.order.count(),
      db.order.count({ where: { status: OrderStatus.PENDING } }),
      db.order.count({ where: { status: OrderStatus.PROCESSING } }),
      db.order.count({ where: { status: OrderStatus.CONFIRMED } }),
      db.order.count({ where: { status: OrderStatus.SHIPPED } }),
      db.order.count({ where: { status: OrderStatus.DELIVERED } }),
      db.order.count({ where: { status: OrderStatus.CANCELLED } }),
      db.order.count({ where: { status: OrderStatus.REFUNDED } }),
      db.order.count({
        where: {
          paymentStatus: { in: [PaymentStatus.PENDING, PaymentStatus.AWAITING_TRANSFER] },
        },
      }),
      db.payment.count({ where: { status: PaymentStatus.FAILED } }),
      db.order.aggregate({
        _sum: { totalPence: true },
        where: {
          status: {
            notIn: [OrderStatus.CANCELLED, OrderStatus.REFUNDED],
          },
        },
      }),
      db.productInventory.count({
        where: {
          OR: [{ quantity: 0 }, { stockStatus: StockStatus.OUT_OF_STOCK }],
        },
      }),
      db.productInventory.count({ where: { stockStatus: StockStatus.LOW_STOCK } }),
      db.variantInventory.count({
        where: {
          OR: [{ quantity: 0 }, { stockStatus: StockStatus.OUT_OF_STOCK }],
        },
      }),
      db.variantInventory.count({ where: { stockStatus: StockStatus.LOW_STOCK } }),
      db.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true },
          },
          items: true,
          shipments: true,
        },
      }),
      db.notification.count({ where: { status: NotificationStatus.FAILED } }),
      db.notification.count({
        where: { status: { in: [NotificationStatus.PENDING, NotificationStatus.PROCESSING] } },
      }),
      db.order.count({ where: { createdAt: { gte: since24h } } }),
      db.order.count({ where: { createdAt: { gte: since7d } } }),
      db.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          action: true,
          entity: true,
          entityId: true,
          createdAt: true,
          userId: true,
        },
      }),
    ]);

    const revenuePence = ordersForRevenue._sum.totalPence || 0;

    return {
      revenuePence,
      totalOrders,
      ordersLast24h,
      ordersLast7d,
      orderStatuses: {
        pending: pendingOrders,
        processing: processingOrders,
        confirmed: confirmedOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
        refunded: refundedOrders,
      },
      pendingPayments,
      failedPayments,
      lowStockCount: productLow + variantLow,
      outOfStockCount: productOut + variantOut,
      notificationQueue: {
        pending: pendingNotifications,
        failed: failedNotifications,
      },
      recentOrders,
      recentAudit,
    };
  }
}
