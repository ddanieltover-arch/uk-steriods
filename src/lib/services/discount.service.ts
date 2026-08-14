import { db } from '../db';
import { DiscountType } from '@prisma/client';

export interface DiscountResult {
  isValid: boolean;
  code: string;
  discountPence: number;
  message: string;
}

export class DiscountService {
  /**
   * Validates discount code server-side and calculates exact discount amount in pence
   */
  static async validateAndCalculate(code: string, subtotalPence: number): Promise<DiscountResult> {
    const discount = await db.discount.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!discount || !discount.isActive) {
      return { isValid: false, code, discountPence: 0, message: 'Invalid or inactive promotional code.' };
    }

    const now = new Date();
    if (now < discount.startsAt) {
      return { isValid: false, code, discountPence: 0, message: 'Promotion code is not active yet.' };
    }

    if (discount.endsAt && now > discount.endsAt) {
      return { isValid: false, code, discountPence: 0, message: 'Promotion code has expired.' };
    }

    if (discount.maxUses && discount.usedCount >= discount.maxUses) {
      return { isValid: false, code, discountPence: 0, message: 'Promotion code usage limit reached.' };
    }

    if (subtotalPence < discount.minOrderPence) {
      const minGbp = (discount.minOrderPence / 100).toFixed(2);
      return {
        isValid: false,
        code,
        discountPence: 0,
        message: `Minimum order amount of £${minGbp} required for this promotion.`,
      };
    }

    let calculatedDiscountPence = 0;
    if (discount.type === DiscountType.PERCENTAGE) {
      calculatedDiscountPence = Math.round((subtotalPence * discount.valuePenceOrPercent) / 100);
    } else if (discount.type === DiscountType.FIXED_AMOUNT) {
      calculatedDiscountPence = Math.min(subtotalPence, discount.valuePenceOrPercent);
    }

    return {
      isValid: true,
      code: discount.code,
      discountPence: calculatedDiscountPence,
      message: 'Discount applied successfully.',
    };
  }
}
