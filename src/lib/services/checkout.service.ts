import { db } from '../db';
import { CartCalculatorService } from './cart-calculator.service';
import { DiscountService } from './discount.service';
import { ShippingService } from './shipping.service';
import { TaxService } from './tax.service';
import { InventoryService } from './inventory.service';
import { PaymentProviderRegistry } from './payment.service';
import { OrderNotificationService } from './order-notification.service';
import { AuthService } from '../auth';
import { OrderStatus, PaymentStatus, PaymentMethod } from '@prisma/client';
import { AddressSnapshot } from '../validation';
import { cryptoDiscountPence, isCryptoPaymentMethod } from '../commerce/crypto-discount';

export interface CheckoutCalculationInput {
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
  }>;
  shippingMethodId?: string;
  discountCode?: string;
  country?: string;
  paymentMethod?: string;
}

export interface CheckoutCalculationResult {
  items: Array<{
    productId: string;
    variantId?: string;
    productName: string;
    productSku: string;
    variantName?: string;
    imageUrl?: string;
    quantity: number;
    unitPricePence: number;
    lineTotalPence: number;
  }>;
  subtotalPence: number;
  discountCode?: string;
  discountPence: number;
  cryptoDiscountPence: number;
  shippingMethodId: string;
  shippingName: string;
  shippingPence: number;
  isFreeShipping: boolean;
  freeShippingThresholdPence: number;
  taxPence: number;
  totalPence: number;
  currency: string;
  reconciliationAlerts: string[];
}

export interface CreateOrderSubmissionInput {
  cartId?: string;
  guestSessionToken?: string;
  userId?: string;
  email: string;
  phone?: string;
  shippingAddress: AddressSnapshot;
  billingAddress?: AddressSnapshot;
  useSameAddressForBilling?: boolean;
  shippingMethodId: string;
  paymentMethod?: PaymentMethod;
  discountCode?: string;
  idempotencyKey?: string;
}

const IDEMPOTENCY_TTL_MS = 15 * 60 * 1000;

export class CheckoutService {
  /**
   * Generates customer-friendly, non-sequential order number e.g. ORD-2026-782910
   */
  public static generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const randomChars = Math.floor(100000 + Math.random() * 900000).toString();
    return `ORD-${year}-${randomChars}`;
  }

  /**
   * Authoritative server-side order calculation
   */
  static async calculateCheckoutTotals(input: CheckoutCalculationInput): Promise<CheckoutCalculationResult> {
    const country = input.country || 'GB';
    const shippingMethodId = input.shippingMethodId || 'standard-delivery';

    // 1. Calculate item prices and reconcile stock/publication
    const cartCalc = await CartCalculatorService.calculate({
      items: input.items,
      discountCode: input.discountCode,
    });

    const subtotalPence = cartCalc.subtotalPence;
    const promoDiscountPence = cartCalc.discountPence;
    const merchandiseAfterPromo = Math.max(0, subtotalPence - promoDiscountPence);
    const cryptoOffPence = isCryptoPaymentMethod(input.paymentMethod)
      ? cryptoDiscountPence(merchandiseAfterPromo)
      : 0;
    const discountPence = promoDiscountPence + cryptoOffPence;

    // 2. Resolve server-side shipping cost
    const selectedRate = ShippingService.resolveRate(country, shippingMethodId, subtotalPence);
    const shippingPence = selectedRate.pricePence;
    const isFreeShipping = selectedRate ? selectedRate.isFree : false;

    // 3. Tax calculation
    const taxableAmountPence = Math.max(0, subtotalPence - discountPence);
    const taxPence = TaxService.calculateTax(taxableAmountPence);

    // 4. Final total calculation
    const isTaxInclusive = TaxService.getConfig().inclusive;
    const totalPence = Math.max(0, taxableAmountPence + shippingPence + (isTaxInclusive ? 0 : taxPence));

    const itemSnapshots = cartCalc.items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId,
      productName: i.productName,
      productSku: i.sku,
      variantName: i.selectedVariantName,
      imageUrl: i.productImageUrl,
      quantity: i.quantity,
      unitPricePence: i.unitPricePence,
      lineTotalPence: i.lineTotalPence,
    }));

    return {
      items: itemSnapshots,
      subtotalPence,
      discountCode: cartCalc.appliedDiscountCode,
      discountPence,
      cryptoDiscountPence: cryptoOffPence,
      shippingMethodId: selectedRate ? selectedRate.id : shippingMethodId,
      shippingName: selectedRate ? selectedRate.displayName : 'Standard Delivery',
      shippingPence,
      isFreeShipping,
      freeShippingThresholdPence: ShippingService.getFreeShippingThreshold(),
      taxPence,
      totalPence,
      currency: 'GBP',
      reconciliationAlerts: cartCalc.reconciliationNotes,
    };
  }

  /**
   * Submits checkout and creates Order in a single database transaction with inventory locking & idempotency
   */
  static async processCheckout(input: CreateOrderSubmissionInput) {
    // 1. Durable idempotency claim (unique key — survives restarts; blocks concurrent duplicates)
    if (input.idempotencyKey) {
      const existing = await db.checkoutIdempotency.findUnique({
        where: { key: input.idempotencyKey },
      });
      if (existing && existing.expiresAt > new Date()) {
        const payload = existing.responseJson as { success?: boolean; status?: string };
        if (payload?.success) {
          return existing.responseJson as {
            success: boolean;
            orderNumber: string;
            trackingToken: string;
            order: unknown;
            paymentInstructions: unknown;
          };
        }
        throw new Error('A checkout with this idempotency key is already in progress. Please wait.');
      }
      if (existing) {
        await db.checkoutIdempotency.delete({ where: { key: input.idempotencyKey } }).catch(() => undefined);
      }

      try {
        await db.checkoutIdempotency.create({
          data: {
            key: input.idempotencyKey,
            responseJson: { status: 'IN_PROGRESS' },
            expiresAt: new Date(Date.now() + IDEMPOTENCY_TTL_MS),
          },
        });
      } catch {
        const race = await db.checkoutIdempotency.findUnique({
          where: { key: input.idempotencyKey },
        });
        if (race?.expiresAt && race.expiresAt > new Date()) {
          const payload = race.responseJson as { success?: boolean };
          if (payload?.success) {
            return race.responseJson as {
              success: boolean;
              orderNumber: string;
              trackingToken: string;
              order: unknown;
              paymentInstructions: unknown;
            };
          }
        }
        throw new Error('A checkout with this idempotency key is already in progress. Please wait.');
      }
    }

    // 2–4. Resolve cart, addresses, calculate, create order
    try {
      return await CheckoutService.executeCheckoutAfterIdempotencyClaim(input);
    } catch (err) {
      if (input.idempotencyKey) {
        await db.checkoutIdempotency.delete({ where: { key: input.idempotencyKey } }).catch(() => undefined);
      }
      throw err;
    }
  }

  private static async executeCheckoutAfterIdempotencyClaim(input: CreateOrderSubmissionInput) {
    // 2. Resolve items from Cart or session
    let itemsToProcess: Array<{ productId: string; variantId?: string; quantity: number }> = [];

    if (input.cartId) {
      const dbCart = await db.cart.findUnique({
        where: { id: input.cartId },
        include: { items: true },
      });
      if (!dbCart || dbCart.items.length === 0) {
        throw new Error('Shopping cart is empty or no longer available.');
      }
      itemsToProcess = dbCart.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId || undefined,
        quantity: i.quantity,
      }));
    } else {
      throw new Error('A valid cart session is required to proceed with checkout.');
    }

    // 3. Prepare Billing Address fallback
    const shippingAddr: AddressSnapshot = {
      ...input.shippingAddress,
      email: input.email,
      phone: input.phone || input.shippingAddress.phone,
    };

    const billingAddr: AddressSnapshot = input.useSameAddressForBilling !== false && !input.billingAddress
      ? shippingAddr
      : {
          ...(input.billingAddress || input.shippingAddress),
          email: input.email,
        };

    const country = shippingAddr.country || 'GB';
    const paymentMethod = input.paymentMethod || PaymentMethod.BANK_TRANSFER;

    // 4. Perform complete Order Transaction
    const transactionResult = await db.$transaction(async (tx) => {
      // a. Reload items with current prices & variants
      let subtotalPence = 0;
      const orderItemsSnapshots = [];

      for (const itemInput of itemsToProcess) {
        const product = await tx.product.findUnique({
          where: { id: itemInput.productId },
          include: { images: true, variants: true },
        });

        if (!product || !product.isPublished || product.deletedAt !== null) {
          throw new Error(`Product '${itemInput.productId}' is no longer available.`);
        }

        let variantName: string | undefined = undefined;
        let sku = product.sku;
        let unitPricePence = product.basePricePence;
        let variantAttributesJson: any = null;

        if (itemInput.variantId) {
          const variant = product.variants.find((v) => v.id === itemInput.variantId);
          if (!variant) {
            throw new Error(`Selected option for '${product.name}' is invalid.`);
          }
          variantName = variant.name;
          sku = variant.sku;
          unitPricePence = variant.pricePence;
          variantAttributesJson = variant.attributes;
        }

        // b. Reserve Inventory / Concurrency Check
        const reserved = await InventoryService.reserveStock(itemInput.productId, itemInput.variantId, itemInput.quantity);
        if (!reserved) {
          throw new Error(`Insufficient stock available for '${product.name}'. Please adjust quantity.`);
        }

        const lineTotalPence = unitPricePence * itemInput.quantity;
        subtotalPence += lineTotalPence;

        const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

        orderItemsSnapshots.push({
          productId: product.id,
          variantId: itemInput.variantId || null,
          productName: product.name,
          productSku: sku,
          variantName: variantName || null,
          imageSnapshotUrl: primaryImage ? primaryImage.url : null,
          unitPricePence,
          quantity: itemInput.quantity,
          subtotalPence: lineTotalPence,
          attributesSnapshotJson: variantAttributesJson,
        });
      }

      // c. Calculate Discount (promo codes + automatic 5% crypto)
      let promoDiscountPence = 0;

      if (input.discountCode) {
        const discountRes = await DiscountService.validateAndCalculate(input.discountCode, subtotalPence);
        if (discountRes.isValid) {
          promoDiscountPence = discountRes.discountPence;
        }
      }

      const merchandiseAfterPromo = Math.max(0, subtotalPence - promoDiscountPence);

      // d. Calculate Shipping
      const shippingPence = ShippingService.getShippingCost(input.shippingMethodId, country, subtotalPence);

      const taxableWithoutCrypto = merchandiseAfterPromo;
      const taxWithoutCrypto = TaxService.calculateTax(taxableWithoutCrypto);
      const totalWithoutCrypto = Math.max(
        0,
        taxableWithoutCrypto + shippingPence + (TaxService.getConfig().inclusive ? 0 : taxWithoutCrypto)
      );

      let resolvedPaymentMethod = paymentMethod;
      if (totalWithoutCrypto < 10000) {
        if (paymentMethod === PaymentMethod.BANK_TRANSFER) {
          throw new Error('Bank transfer is available on orders of £100 or more. Please pay by crypto.');
        }
        resolvedPaymentMethod = PaymentMethod.CRYPTO;
      }

      const cryptoOffPence = isCryptoPaymentMethod(resolvedPaymentMethod)
        ? cryptoDiscountPence(merchandiseAfterPromo)
        : 0;
      const discountPence = promoDiscountPence + cryptoOffPence;

      // e. Calculate Tax
      const taxableSubtotal = Math.max(0, subtotalPence - discountPence);
      const taxPence = TaxService.calculateTax(taxableSubtotal);

      // f. Calculate Grand Total
      const totalPence = Math.max(0, taxableSubtotal + shippingPence + (TaxService.getConfig().inclusive ? 0 : taxPence));

      // g. Generate Unique Identifiers
      const orderNumber = CheckoutService.generateOrderNumber();
      const trackingToken = AuthService.generateSecureToken('track');

      // h. Create Order
      const createdOrder = await tx.order.create({
        data: {
          orderNumber,
          trackingToken,
          userId: input.userId || null,
          guestEmail: input.email,
          status: OrderStatus.PENDING,
          paymentStatus: PaymentStatus.AWAITING_TRANSFER,
          paymentMethod: resolvedPaymentMethod,
          subtotalPence,
          discountPence,
          shippingPence,
          taxPence,
          totalPence,
          shippingAddressSnapshot: shippingAddr as object,
          billingAddressSnapshot: billingAddr as object,
          items: {
            create: orderItemsSnapshots,
          },
        },
        include: {
          items: true,
        },
      });

      // i. Generate Payment & Instructions
      const provider = PaymentProviderRegistry.getProvider(resolvedPaymentMethod);
      const instructions = await provider.generatePaymentInstructions(createdOrder.id, totalPence, orderNumber);

      const createdPayment = await tx.payment.create({
        data: {
          orderId: createdOrder.id,
          amountPence: totalPence,
          provider: resolvedPaymentMethod,
          status: PaymentStatus.AWAITING_TRANSFER,
          referenceCode: orderNumber,
          instructions: instructions as object,
        },
      });

      // j. Clear Purchased Cart Items
      if (input.cartId) {
        await tx.cartItem.deleteMany({
          where: { cartId: input.cartId },
        });
      }

      return {
        order: createdOrder,
        payment: createdPayment,
        instructions,
        trackingToken,
      };
    });

    // 5. Enqueue transactional notification OUTSIDE the DB transaction.
    // Provider delivery is handled asynchronously by the notification worker.
    await OrderNotificationService.notifyOrderCreated({
      orderId: transactionResult.order.id,
      orderNumber: transactionResult.order.orderNumber,
      createdAt: transactionResult.order.createdAt,
      guestEmail: input.email,
      userId: input.userId || null,
      customerName: input.shippingAddress?.recipient || input.email,
      totalPence: transactionResult.order.totalPence,
      subtotalPence: transactionResult.order.subtotalPence,
      shippingPence: transactionResult.order.shippingPence,
      taxPence: transactionResult.order.taxPence,
      discountPence: transactionResult.order.discountPence,
      paymentMethod: String(transactionResult.order.paymentMethod),
      paymentStatus: String(transactionResult.order.paymentStatus),
      paymentInstructions: transactionResult.instructions,
      itemsCount: transactionResult.order.items.length,
      items: transactionResult.order.items.map((i) => ({
        productName: i.productName,
        productSku: i.productSku,
        variantName: i.variantName,
        quantity: i.quantity,
        unitPricePence: i.unitPricePence,
        subtotalPence: i.subtotalPence,
      })),
      shippingAddress: {
        firstName: shippingAddr.recipient?.split(' ')[0],
        lastName: shippingAddr.recipient?.split(' ').slice(1).join(' ') || undefined,
        addressLine1: shippingAddr.line1,
        addressLine2: shippingAddr.line2,
        city: shippingAddr.city,
        county: shippingAddr.county,
        postcode: shippingAddr.postcode,
        country: shippingAddr.country,
      },
      trackingToken: transactionResult.trackingToken,
      shippingMethodName: input.shippingMethodId,
    });

    const responsePayload = {
      success: true,
      orderNumber: transactionResult.order.orderNumber,
      trackingToken: transactionResult.trackingToken,
      order: transactionResult.order,
      paymentInstructions: transactionResult.instructions,
    };

    // Durable idempotency: replace IN_PROGRESS claim with final response
    if (input.idempotencyKey) {
      await db.checkoutIdempotency.update({
        where: { key: input.idempotencyKey },
        data: {
          responseJson: responsePayload as object,
          orderId: transactionResult.order.id,
          orderNumber: transactionResult.order.orderNumber,
          expiresAt: new Date(Date.now() + IDEMPOTENCY_TTL_MS),
        },
      }).catch(() => undefined);
    }

    return responsePayload;
  }
}
