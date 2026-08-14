import { db } from '../db';
import { AdminShippingConfigSchema } from '../validation';
import { z } from 'zod';

export type AdminShippingConfigInput = z.infer<typeof AdminShippingConfigSchema>;

export class AdminShippingService {
  static async listShippingConfigs() {
    return db.shippingMethodConfig.findMany({
      orderBy: { pricePence: 'asc' },
    });
  }

  static async createShippingConfig(input: AdminShippingConfigInput) {
    const existing = await db.shippingMethodConfig.findUnique({ where: { code: input.code } });
    if (existing) throw new Error(`Shipping method with code '${input.code}' already exists.`);

    return db.shippingMethodConfig.create({
      data: {
        code: input.code,
        displayName: input.displayName,
        description: input.description || null,
        pricePence: input.pricePence,
        freeThresholdPence: input.freeThresholdPence || null,
        minDeliveryDays: input.minDeliveryDays ?? 1,
        maxDeliveryDays: input.maxDeliveryDays ?? 3,
        countryCode: input.countryCode || 'GB',
        isActive: input.isActive ?? true,
      },
    });
  }

  static async updateShippingConfig(id: string, input: Partial<AdminShippingConfigInput>) {
    const config = await db.shippingMethodConfig.findUnique({ where: { id } });
    if (!config) throw new Error(`Shipping method configuration with ID '${id}' not found.`);

    if (input.code && input.code !== config.code) {
      const existing = await db.shippingMethodConfig.findUnique({ where: { code: input.code } });
      if (existing) throw new Error(`Shipping method code '${input.code}' already exists.`);
    }

    return db.shippingMethodConfig.update({
      where: { id },
      data: {
        ...(input.code && { code: input.code }),
        ...(input.displayName && { displayName: input.displayName }),
        ...(input.description !== undefined && { description: input.description || null }),
        ...(input.pricePence !== undefined && { pricePence: input.pricePence }),
        ...(input.freeThresholdPence !== undefined && { freeThresholdPence: input.freeThresholdPence }),
        ...(input.minDeliveryDays !== undefined && { minDeliveryDays: input.minDeliveryDays }),
        ...(input.maxDeliveryDays !== undefined && { maxDeliveryDays: input.maxDeliveryDays }),
        ...(input.countryCode && { countryCode: input.countryCode }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
    });
  }
}
