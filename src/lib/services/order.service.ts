import { db } from '../db';
import { AuthService } from '../auth';
import { AddressSnapshot } from '../validation';
import { InventoryService } from './inventory.service';
import { PaymentProviderRegistry } from './payment.service';
import { DiscountService } from './discount.service';
import { cryptoDiscountPence, isCryptoPaymentMethod } from '../commerce/crypto-discount';
import { OrderStatus, PaymentStatus, PaymentMethod } from '@prisma/client';

export interface CreateOrderInput {
  cartId: string;
  userId?: string;
  guestEmail?: string;
  shippingAddress: AddressSnapshot;
  billingAddress: AddressSnapshot;
  paymentMethod?: PaymentMethod;
  discountCode?: string;
  shippingPence?: number;
}

export class OrderService {
  /**
   * Generates formatted order reference number e.g. UKP-2026-89104
   */
  private static generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `UKP-${year}-${random}`;
  }

  /**
   * Creates an order with complete historical snapshotting of product & variant details
   */
  static async createOrder(input: CreateOrderInput) {
    const cart = await db.cart.findUnique({
      where: { id: input.cartId },
      include: {
        items: {
          include: {
            product: { include: { images: true } },
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty or not found');
    }

    // 1. Calculate subtotal in integer pence
    let subtotalPence = 0;
    const orderItemsSnapshot = [];

    for (const item of cart.items) {
      // Determine unit price in integer pence
      const unitPricePence = item.variant ? item.variant.pricePence : item.product.basePricePence;
      const itemSubtotal = unitPricePence * item.quantity;
      subtotalPence += itemSubtotal;

      // Primary image snapshot
      const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0];

      orderItemsSnapshot.push({
        productId: item.productId,
        variantId: item.variantId || null,
        productName: item.product.name,
        productSku: item.variant ? item.variant.sku : item.product.sku,
        variantName: item.variant ? item.variant.name : null,
        imageSnapshotUrl: primaryImage ? primaryImage.url : null,
        unitPricePence,
        quantity: item.quantity,
        subtotalPence: itemSubtotal,
        attributesSnapshotJson: item.variant ? (item.variant.attributes as object) : null,
      });
    }

    // 2. Validate discount server-side if provided
    let discountPence = 0;
    if (input.discountCode) {
      const discountRes = await DiscountService.validateAndCalculate(input.discountCode, subtotalPence);
      if (discountRes.isValid) {
        discountPence = discountRes.discountPence;
      }
    }

    const paymentMethod = input.paymentMethod || PaymentMethod.BANK_TRANSFER;
    if (isCryptoPaymentMethod(paymentMethod)) {
      discountPence += cryptoDiscountPence(Math.max(0, subtotalPence - discountPence));
    }

    // 3. Shipping cost
    const shippingPence = input.shippingPence !== undefined ? input.shippingPence : (subtotalPence >= 30000 ? 0 : 1000);

    // 4. Calculate final total pence
    const totalPence = Math.max(0, subtotalPence - discountPence + shippingPence);

    // 5. Generate unique keys
    const orderNumber = this.generateOrderNumber();
    const trackingToken = AuthService.generateSecureToken('track');

    // 6. Create Order and OrderItems in database transaction
    const order = await db.$transaction(async (tx) => {
      // Reserve inventory for each item
      for (const item of cart.items) {
        const reserved = await InventoryService.reserveStock(item.productId, item.variantId || undefined, item.quantity);
        if (!reserved) {
          throw new Error(`Insufficient stock for item '${item.product.name}'`);
        }
      }

      const createdOrder = await tx.order.create({
        data: {
          orderNumber,
          trackingToken,
          userId: input.userId || null,
          guestEmail: input.guestEmail || input.shippingAddress.email,
          status: OrderStatus.PENDING,
          paymentStatus: PaymentStatus.AWAITING_TRANSFER,
          paymentMethod,
          subtotalPence,
          discountPence,
          shippingPence,
          taxPence: 0,
          totalPence,
          shippingAddressSnapshot: input.shippingAddress as object,
          billingAddressSnapshot: input.billingAddress as object,
          items: {
            create: orderItemsSnapshot,
          },
        },
        include: {
          items: true,
        },
      });

      // Generate payment instructions
      const provider = PaymentProviderRegistry.getProvider(paymentMethod);
      const instructions = await provider.generatePaymentInstructions(createdOrder.id, totalPence, orderNumber);

      await tx.payment.create({
        data: {
          orderId: createdOrder.id,
          amountPence: totalPence,
          provider: paymentMethod,
          status: PaymentStatus.AWAITING_TRANSFER,
          referenceCode: orderNumber,
          instructions: instructions as object,
        },
      });

      // Clear cart items
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return createdOrder;
    });

    return order;
  }

  /**
   * Retrieves guest order by secure high-entropy tracking token
   */
  static async getOrderByTrackingToken(trackingToken: string) {
    return db.order.findUnique({
      where: { trackingToken },
      include: {
        items: true,
        payments: true,
        shipments: true,
      },
    });
  }
}
