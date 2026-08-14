import { db } from '../db';
import { AdminDiscountSchema } from '../validation';
import { z } from 'zod';

export type AdminDiscountInput = z.infer<typeof AdminDiscountSchema>;

export class AdminDiscountService {
  static async listDiscounts() {
    return db.discount.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createDiscount(input: AdminDiscountInput) {
    const existing = await db.discount.findUnique({ where: { code: input.code } });
    if (existing) {
      throw new Error(`Discount code '${input.code}' already exists.`);
    }

    return db.discount.create({
      data: {
        code: input.code,
        type: input.type,
        valuePenceOrPercent: input.valuePenceOrPercent,
        minOrderPence: input.minOrderPence || 0,
        maxUses: input.maxUses || null,
        startsAt: new Date(input.startsAt),
        endsAt: input.endsAt ? new Date(input.endsAt) : null,
        isActive: input.isActive ?? true,
      },
    });
  }

  static async updateDiscount(id: string, input: Partial<AdminDiscountInput>) {
    const discount = await db.discount.findUnique({ where: { id } });
    if (!discount) {
      throw new Error(`Discount with ID '${id}' not found.`);
    }

    if (input.code && input.code !== discount.code) {
      const existing = await db.discount.findUnique({ where: { code: input.code } });
      if (existing) throw new Error(`Discount code '${input.code}' already exists.`);
    }

    return db.discount.update({
      where: { id },
      data: {
        ...(input.code && { code: input.code }),
        ...(input.type && { type: input.type }),
        ...(input.valuePenceOrPercent !== undefined && { valuePenceOrPercent: input.valuePenceOrPercent }),
        ...(input.minOrderPence !== undefined && { minOrderPence: input.minOrderPence }),
        ...(input.maxUses !== undefined && { maxUses: input.maxUses }),
        ...(input.startsAt && { startsAt: new Date(input.startsAt) }),
        ...(input.endsAt !== undefined && { endsAt: input.endsAt ? new Date(input.endsAt) : null }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
    });
  }
}
