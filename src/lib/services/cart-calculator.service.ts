import { ShippingService, ShippingRate } from './shipping.service';
import { Product, ProductVariant } from '../../types';
import { CatalogueService } from './catalogue.service';
import type { DiscountResult } from './discount.service';

async function validateDiscount(code: string, subtotalPence: number): Promise<DiscountResult> {
  if (typeof window !== 'undefined') {
    const res = await fetch('/api/v1/discounts/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotalPence }),
    });
    if (!res.ok) {
      return {
        isValid: false,
        code,
        discountPence: 0,
        message: 'Unable to validate promotional code.',
      };
    }
    return res.json();
  }

  const { DiscountService } = await import('./discount.service');
  return DiscountService.validateAndCalculate(code, subtotalPence);
}

export interface ReconciledCartItem {
  id: string;
  productId: string;
  variantId?: string;
  productName: string;
  productSlug: string;
  productImageUrl?: string;
  brandName?: string;
  sku: string;
  selectedVariantName?: string;
  unitPricePence: number;
  quantity: number;
  lineTotalPence: number;
  availableStock: number;
  isOutOfStock: boolean;
  priceChanged?: boolean;
  oldPricePence?: number;
  status: 'OK' | 'ADJUSTED_STOCK' | 'OUT_OF_STOCK' | 'PRICE_CHANGED' | 'UNPUBLISHED';
}

export interface CartCalculationInput {
  items: Array<{
    id?: string;
    productId: string;
    variantId?: string;
    quantity: number;
    unitPricePence?: number;
  }>;
  discountCode?: string;
  shippingRateId?: string;
  country?: string;
  customProducts?: Product[];
}

export interface CartCalculationResult {
  items: ReconciledCartItem[];
  subtotalPence: number;
  discountPence: number;
  appliedDiscountCode?: string;
  discountMessage?: string;
  isDiscountValid: boolean;
  shippingPence: number;
  selectedShippingRate?: ShippingRate;
  totalPence: number;
  reconciliationNotes: string[];
  hasChanges: boolean;
  validItemCount: number;
  totalQuantity: number;
}

export class CartCalculatorService {
  /**
   * Primary authoritative server-side calculation engine for Cart, Checkout, and Orders
   */
  static async calculate(input: CartCalculationInput): Promise<CartCalculationResult> {
    const reconciliationNotes: string[] = [];
    let hasChanges = false;
    const reconciledItems: ReconciledCartItem[] = [];

    // 1. Process and reconcile each cart item against current catalogue data
    for (const rawItem of input.items) {
      const product = CatalogueService.getProductById(rawItem.productId, input.customProducts);

      if (!product || !product.isPublished) {
        reconciliationNotes.push(`An item in your basket is no longer available and was removed.`);
        hasChanges = true;
        continue;
      }

      // Check variant if variantId is provided or if product has variants
      let selectedVariant: ProductVariant | undefined = undefined;
      if (rawItem.variantId && product.variants) {
        selectedVariant = product.variants.find((v) => v.id === rawItem.variantId);
        if (!selectedVariant) {
          reconciliationNotes.push(`Selected option for "${product.name}" is no longer available.`);
          hasChanges = true;
          continue;
        }
      } else if (product.variants && product.variants.length > 0) {
        // Default to first variant if none passed
        selectedVariant = product.variants[0];
      }

      // Authoritative Price Calculation in Pence
      const activePriceGbp = selectedVariant?.priceGbp || product.salePriceGbp || product.priceGbp;
      const currentPricePence = Math.round(activePriceGbp * 100);

      // Check for client price discrepancies
      let priceChanged = false;
      let oldPricePence: number | undefined = undefined;
      if (rawItem.unitPricePence !== undefined && rawItem.unitPricePence !== currentPricePence) {
        priceChanged = true;
        oldPricePence = rawItem.unitPricePence;
        reconciliationNotes.push(
          `Price for "${product.name}" was updated to £${(currentPricePence / 100).toFixed(2)}.`
        );
        hasChanges = true;
      }

      // Authoritative Stock Checking
      const availableStock = selectedVariant
        ? selectedVariant.stockQuantity
        : product.stockQuantity;

      let validQuantity = Math.max(1, Math.floor(rawItem.quantity || 1));
      let itemStatus: ReconciledCartItem['status'] = 'OK';

      if (availableStock <= 0) {
        itemStatus = 'OUT_OF_STOCK';
        reconciliationNotes.push(`"${product.name}" is currently out of stock.`);
        hasChanges = true;
      } else if (validQuantity > availableStock) {
        validQuantity = availableStock;
        itemStatus = 'ADJUSTED_STOCK';
        reconciliationNotes.push(
          `Quantity for "${product.name}" adjusted to ${availableStock} (maximum available stock).`
        );
        hasChanges = true;
      } else if (priceChanged) {
        itemStatus = 'PRICE_CHANGED';
      }

      const lineTotalPence = currentPricePence * validQuantity;

      reconciledItems.push({
        id: rawItem.id || `cart-item-${product.id}-${selectedVariant?.id || 'default'}`,
        productId: product.id,
        variantId: selectedVariant?.id,
        productName: product.name,
        productSlug: product.slug,
        productImageUrl: product.images[0] || '',
        brandName: product.brandName,
        sku: selectedVariant?.sku || product.sku,
        selectedVariantName: selectedVariant?.name,
        unitPricePence: currentPricePence,
        quantity: validQuantity,
        lineTotalPence,
        availableStock,
        isOutOfStock: availableStock <= 0,
        priceChanged,
        oldPricePence,
        status: itemStatus,
      });
    }

    // 2. Subtotal calculation (only include in-stock items)
    const inStockItems = reconciledItems.filter((i) => !i.isOutOfStock);
    const subtotalPence = inStockItems.reduce((sum, item) => sum + item.lineTotalPence, 0);
    const totalQuantity = inStockItems.reduce((sum, item) => sum + item.quantity, 0);

    // 3. Discount Code Validation via DiscountService
    let discountPence = 0;
    let discountMessage: string | undefined = undefined;
    let isDiscountValid = false;
    let appliedDiscountCode: string | undefined = undefined;

    if (input.discountCode && input.discountCode.trim().length > 0) {
      const cleanCode = input.discountCode.trim().toUpperCase();
      const discountResult = await validateDiscount(cleanCode, subtotalPence);

      isDiscountValid = discountResult.isValid;
      discountMessage = discountResult.message;

      if (discountResult.isValid) {
        discountPence = discountResult.discountPence;
        appliedDiscountCode = discountResult.code;
      }
    }

    // 4. Shipping Calculation via ShippingService
    const country = input.country || 'GB';
    const rates = ShippingService.getShippingMethods(country, subtotalPence);
    const requestedRateId = input.shippingRateId || 'standard-delivery';
    const selectedShippingRate =
      rates.find((r) => r.id === requestedRateId) || rates[0];

    const shippingPence = subtotalPence > 0 && selectedShippingRate ? selectedShippingRate.pricePence : 0;

    // 5. Final Grand Total Calculation
    const discountedSubtotal = Math.max(0, subtotalPence - discountPence);
    const totalPence = subtotalPence > 0 ? discountedSubtotal + shippingPence : 0;

    return {
      items: reconciledItems,
      subtotalPence,
      discountPence,
      appliedDiscountCode,
      discountMessage,
      isDiscountValid,
      shippingPence,
      selectedShippingRate,
      totalPence,
      reconciliationNotes,
      hasChanges,
      validItemCount: inStockItems.length,
      totalQuantity,
    };
  }
}
