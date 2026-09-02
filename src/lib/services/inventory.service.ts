import { db } from '../db';
import { Prisma, StockStatus } from '@prisma/client';

export interface StockCheckResult {
  hasVariant: boolean;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  stockStatus: StockStatus;
  isAvailable: boolean;
}

export class InventoryService {
  /**
   * Retrieves single source of truth stock levels for product or variant
   */
  static async getStockLevel(productId: string, variantId?: string): Promise<StockCheckResult> {
    if (variantId) {
      const inv = await db.variantInventory.findUnique({
        where: { variantId },
      });

      if (!inv) {
        return {
          hasVariant: true,
          quantity: 0,
          reservedQuantity: 0,
          availableQuantity: 0,
          stockStatus: StockStatus.OUT_OF_STOCK,
          isAvailable: false,
        };
      }

      const availableQuantity = Math.max(0, inv.quantity - inv.reservedQuantity);
      return {
        hasVariant: true,
        quantity: inv.quantity,
        reservedQuantity: inv.reservedQuantity,
        availableQuantity,
        stockStatus: inv.stockStatus,
        isAvailable: availableQuantity > 0 && inv.stockStatus !== StockStatus.OUT_OF_STOCK,
      };
    } else {
      const inv = await db.productInventory.findUnique({
        where: { productId },
      });

      if (!inv) {
        return {
          hasVariant: false,
          quantity: 0,
          reservedQuantity: 0,
          availableQuantity: 0,
          stockStatus: StockStatus.OUT_OF_STOCK,
          isAvailable: false,
        };
      }

      const availableQuantity = Math.max(0, inv.quantity - inv.reservedQuantity);
      return {
        hasVariant: false,
        quantity: inv.quantity,
        reservedQuantity: inv.reservedQuantity,
        availableQuantity,
        stockStatus: inv.stockStatus,
        isAvailable: availableQuantity > 0 && inv.stockStatus !== StockStatus.OUT_OF_STOCK,
      };
    }
  }

  /**
   * Transactionally reserves inventory during checkout to prevent overselling
   */
  static async reserveStock(productId: string, variantId: string | undefined, qty: number): Promise<boolean> {
    return db.$transaction(async (tx) => this.reserveStockWithTx(tx, productId, variantId, qty));
  }

  /** Reserve stock using an existing Prisma transaction (avoids nested transactions during checkout). */
  static async reserveStockWithTx(
    tx: Prisma.TransactionClient,
    productId: string,
    variantId: string | undefined,
    qty: number
  ): Promise<boolean> {
    if (variantId) {
      const inv = await tx.variantInventory.findUnique({ where: { variantId } });
      if (!inv) return false;

      const available = inv.quantity - inv.reservedQuantity;
      if (available < qty) return false;

      const newReserved = inv.reservedQuantity + qty;
      await tx.variantInventory.update({
        where: { variantId },
        data: {
          reservedQuantity: newReserved,
          availableQuantity: inv.quantity - newReserved,
        },
      });
      return true;
    }

    const inv = await tx.productInventory.findUnique({ where: { productId } });
    if (!inv) return false;

    const available = inv.quantity - inv.reservedQuantity;
    if (available < qty) return false;

    const newReserved = inv.reservedQuantity + qty;
    await tx.productInventory.update({
      where: { productId },
      data: {
        reservedQuantity: newReserved,
        availableQuantity: inv.quantity - newReserved,
      },
    });
    return true;
  }

  /**
   * Releases reserved stock when an order is cancelled
   */
  static async releaseStock(productId: string, variantId: string | undefined, qty: number): Promise<void> {
    await db.$transaction(async (tx) => {
      if (variantId) {
        const inv = await tx.variantInventory.findUnique({ where: { variantId } });
        if (!inv) return;

        const newReserved = Math.max(0, inv.reservedQuantity - qty);
        const newAvailable = Math.max(0, inv.quantity - newReserved);

        await tx.variantInventory.update({
          where: { variantId },
          data: {
            reservedQuantity: newReserved,
            availableQuantity: newAvailable,
          },
        });
      } else {
        const inv = await tx.productInventory.findUnique({ where: { productId } });
        if (!inv) return;

        const newReserved = Math.max(0, inv.reservedQuantity - qty);
        const newAvailable = Math.max(0, inv.quantity - newReserved);

        await tx.productInventory.update({
          where: { productId },
          data: {
            reservedQuantity: newReserved,
            availableQuantity: newAvailable,
          },
        });
      }
    });
  }

  /**
   * Deducts quantity permanently when order is confirmed
   */
  static async finalizeDeduction(productId: string, variantId: string | undefined, qty: number): Promise<void> {
    await db.$transaction(async (tx) => {
      if (variantId) {
        const inv = await tx.variantInventory.findUnique({ where: { variantId } });
        if (!inv) return;

        const newQty = Math.max(0, inv.quantity - qty);
        const newReserved = Math.max(0, inv.reservedQuantity - qty);
        const newAvailable = Math.max(0, newQty - newReserved);

        let newStatus = inv.stockStatus;
        if (newQty === 0) newStatus = StockStatus.OUT_OF_STOCK;
        else if (newQty <= inv.lowStockThreshold) newStatus = StockStatus.LOW_STOCK;

        await tx.variantInventory.update({
          where: { variantId },
          data: {
            quantity: newQty,
            reservedQuantity: newReserved,
            availableQuantity: newAvailable,
            stockStatus: newStatus,
          },
        });
      } else {
        const inv = await tx.productInventory.findUnique({ where: { productId } });
        if (!inv) return;

        const newQty = Math.max(0, inv.quantity - qty);
        const newReserved = Math.max(0, inv.reservedQuantity - qty);
        const newAvailable = Math.max(0, newQty - newReserved);

        let newStatus = inv.stockStatus;
        if (newQty === 0) newStatus = StockStatus.OUT_OF_STOCK;
        else if (newQty <= inv.lowStockThreshold) newStatus = StockStatus.LOW_STOCK;

        await tx.productInventory.update({
          where: { productId },
          data: {
            quantity: newQty,
            reservedQuantity: newReserved,
            availableQuantity: newAvailable,
            stockStatus: newStatus,
          },
        });
      }
    });
  }
}
