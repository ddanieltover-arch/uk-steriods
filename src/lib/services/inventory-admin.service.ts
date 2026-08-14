import { db } from '../db';
import { StockStatus } from '@prisma/client';
import { AdminInventoryAdjustmentInput } from '../validation';

export class InventoryAdminService {
  /**
   * List single-source inventory records across products and variants with search & filters
   */
  static async listInventory(options: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));

    // Retrieve Product Inventories
    const productInventories = await db.productInventory.findMany({
      include: {
        product: {
          include: {
            brand: true,
            category: true,
          },
        },
      },
    });

    // Retrieve Variant Inventories
    const variantInventories = await db.variantInventory.findMany({
      include: {
        variant: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
          },
        },
      },
    });

    // Normalize into flat array
    let items = [
      ...productInventories.map((pi) => ({
        id: pi.id,
        type: 'product' as const,
        productId: pi.productId,
        variantId: null,
        sku: pi.product.sku,
        productName: pi.product.name,
        variantName: null,
        brandName: pi.product.brand.name,
        categoryName: pi.product.category.name,
        quantity: pi.quantity,
        reservedQuantity: pi.reservedQuantity,
        availableQuantity: pi.availableQuantity,
        lowStockThreshold: pi.lowStockThreshold,
        stockStatus: pi.stockStatus,
        updatedAt: pi.updatedAt,
      })),
      ...variantInventories.map((vi) => ({
        id: vi.id,
        type: 'variant' as const,
        productId: vi.variant.productId,
        variantId: vi.variantId,
        sku: vi.variant.sku,
        productName: vi.variant.product.name,
        variantName: vi.variant.name,
        brandName: vi.variant.product.brand.name,
        categoryName: vi.variant.product.category.name,
        quantity: vi.quantity,
        reservedQuantity: vi.reservedQuantity,
        availableQuantity: vi.availableQuantity,
        lowStockThreshold: vi.lowStockThreshold,
        stockStatus: vi.stockStatus,
        updatedAt: vi.updatedAt,
      })),
    ];

    // Filter by stock status
    if (options.status) {
      const statusUpper = options.status.toUpperCase();
      if (statusUpper === 'IN_STOCK') {
        items = items.filter((i) => i.stockStatus === StockStatus.IN_STOCK);
      } else if (statusUpper === 'LOW_STOCK') {
        items = items.filter((i) => i.stockStatus === StockStatus.LOW_STOCK);
      } else if (statusUpper === 'OUT_OF_STOCK') {
        items = items.filter((i) => i.stockStatus === StockStatus.OUT_OF_STOCK);
      } else if (statusUpper === 'DISCONTINUED') {
        items = items.filter((i) => i.stockStatus === StockStatus.DISCONTINUED);
      }
    }

    // Filter by search query (product name, SKU, brand)
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter(
        (i) =>
          i.productName.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q) ||
          i.brandName.toLowerCase().includes(q) ||
          (i.variantName && i.variantName.toLowerCase().includes(q))
      );
    }

    // Sort by updatedAt descending
    items.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    const total = items.length;
    const paginatedItems = items.slice((page - 1) * limit, page * limit);

    return {
      inventory: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Adjust inventory quantity with transaction safety and full audit logging
   */
  static async adjustStock(input: AdminInventoryAdjustmentInput, adminUserId: string) {
    return db.$transaction(async (tx) => {
      let previousQuantity = 0;
      let resultingQuantity = 0;
      let productInventoryId: string | null = null;
      let variantInventoryId: string | null = null;

      if (input.variantId) {
        const inv = await tx.variantInventory.findUnique({ where: { variantId: input.variantId } });
        if (!inv) {
          throw new Error(`Variant inventory for variant ID '${input.variantId}' not found.`);
        }

        previousQuantity = inv.quantity;
        resultingQuantity = Math.max(0, previousQuantity + input.adjustment);
        variantInventoryId = inv.id;

        const newAvailable = Math.max(0, resultingQuantity - inv.reservedQuantity);
        let newStatus: StockStatus = inv.stockStatus;

        if (resultingQuantity === 0) {
          newStatus = StockStatus.OUT_OF_STOCK;
        } else if (resultingQuantity <= inv.lowStockThreshold) {
          newStatus = StockStatus.LOW_STOCK;
        } else {
          newStatus = StockStatus.IN_STOCK;
        }

        await tx.variantInventory.update({
          where: { variantId: input.variantId },
          data: {
            quantity: resultingQuantity,
            availableQuantity: newAvailable,
            stockStatus: newStatus,
          },
        });
      } else if (input.productId) {
        const inv = await tx.productInventory.findUnique({ where: { productId: input.productId } });
        if (!inv) {
          throw new Error(`Product inventory for product ID '${input.productId}' not found.`);
        }

        previousQuantity = inv.quantity;
        resultingQuantity = Math.max(0, previousQuantity + input.adjustment);
        productInventoryId = inv.id;

        const newAvailable = Math.max(0, resultingQuantity - inv.reservedQuantity);
        let newStatus: StockStatus = inv.stockStatus;

        if (resultingQuantity === 0) {
          newStatus = StockStatus.OUT_OF_STOCK;
        } else if (resultingQuantity <= inv.lowStockThreshold) {
          newStatus = StockStatus.LOW_STOCK;
        } else {
          newStatus = StockStatus.IN_STOCK;
        }

        await tx.productInventory.update({
          where: { productId: input.productId },
          data: {
            quantity: resultingQuantity,
            availableQuantity: newAvailable,
            stockStatus: newStatus,
          },
        });
      } else {
        throw new Error('Either productId or variantId is required for inventory adjustment.');
      }

      // Record audit entry in InventoryAdjustment
      const adjustmentRecord = await tx.inventoryAdjustment.create({
        data: {
          productInventoryId,
          variantInventoryId,
          previousQuantity,
          adjustment: input.adjustment,
          resultingQuantity,
          reason: input.reason,
          reference: input.reference || null,
          userId: adminUserId,
        },
      });

      return {
        adjustmentRecord,
        previousQuantity,
        adjustment: input.adjustment,
        resultingQuantity,
      };
    });
  }

  /**
   * Get audit log of inventory adjustments
   */
  static async getAdjustmentHistory(options: { page?: number; limit?: number } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      db.inventoryAdjustment.findMany({
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.inventoryAdjustment.count(),
    ]);

    return {
      history: records,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
