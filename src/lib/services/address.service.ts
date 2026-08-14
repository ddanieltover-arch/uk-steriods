import { db } from '../db';
import { SavedAddressSchema } from '../validation';

export class AddressService {
  /**
   * Retrieves all saved addresses for the authenticated customer
   */
  static async getAddresses(userId: string) {
    return db.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  /**
   * Creates a new saved address for the authenticated customer
   */
  static async createAddress(userId: string, input: unknown) {
    const parsed = SavedAddressSchema.safeParse(input);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Address validation failed: ${issues}`);
    }

    const addressData = parsed.data;

    const existingCount = await db.address.count({ where: { userId } });
    const isFirstAddress = existingCount === 0;

    const shouldBeDefault = addressData.isDefault || isFirstAddress;

    return db.$transaction(async (tx) => {
      if (shouldBeDefault) {
        await tx.address.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      return tx.address.create({
        data: {
          userId,
          recipient: addressData.recipient,
          line1: addressData.line1,
          line2: addressData.line2 || null,
          city: addressData.city,
          county: addressData.county || null,
          postcode: addressData.postcode.toUpperCase(),
          country: addressData.country || 'UK',
          isDefault: shouldBeDefault,
        },
      });
    });
  }

  /**
   * Updates an existing address with IDOR ownership check
   */
  static async updateAddress(userId: string, addressId: string, input: unknown) {
    // 1. Verify address exists and belongs strictly to userId
    const address = await db.address.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      throw new Error('Address not found or access denied.');
    }

    const parsed = SavedAddressSchema.safeParse(input);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Address validation failed: ${issues}`);
    }

    const addressData = parsed.data;

    return db.$transaction(async (tx) => {
      if (addressData.isDefault && !address.isDefault) {
        await tx.address.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      return tx.address.update({
        where: { id: addressId },
        data: {
          recipient: addressData.recipient,
          line1: addressData.line1,
          line2: addressData.line2 || null,
          city: addressData.city,
          county: addressData.county || null,
          postcode: addressData.postcode.toUpperCase(),
          country: addressData.country || 'UK',
          isDefault: addressData.isDefault,
        },
      });
    });
  }

  /**
   * Deletes a saved address with IDOR ownership check
   */
  static async deleteAddress(userId: string, addressId: string) {
    const address = await db.address.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      throw new Error('Address not found or access denied.');
    }

    return db.$transaction(async (tx) => {
      await tx.address.delete({ where: { id: addressId } });

      if (address.isDefault) {
        const remaining = await tx.address.findFirst({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        });
        if (remaining) {
          await tx.address.update({
            where: { id: remaining.id },
            data: { isDefault: true },
          });
        }
      }

      return { success: true };
    });
  }

  /**
   * Sets an address as the default address
   */
  static async setDefaultAddress(userId: string, addressId: string) {
    const address = await db.address.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      throw new Error('Address not found or access denied.');
    }

    return db.$transaction(async (tx) => {
      await tx.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });

      return tx.address.update({
        where: { id: addressId },
        data: { isDefault: true },
      });
    });
  }
}
