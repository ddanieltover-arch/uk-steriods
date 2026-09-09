import { db } from '../db';
import { AdminProductInput } from '../validation';
import { StockStatus } from '@prisma/client';

export class AdminProductService {
  /**
   * List all products for admin management (includes drafts, published, archived)
   */
  static async listProducts(options: { search?: string; categoryId?: string; brandId?: string; includeArchived?: boolean; page?: number; limit?: number } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (!options.includeArchived) {
      where.deletedAt = null;
    }

    if (options.categoryId) {
      where.categoryId = options.categoryId;
    }

    if (options.brandId) {
      where.brandId = options.brandId;
    }

    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { sku: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
          images: { orderBy: { displayOrder: 'asc' } },
          inventory: true,
          variants: {
            include: { inventory: true },
          },
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    return { products, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  /**
   * Get single product detail by ID (admin view)
   */
  static async getProductById(id: string) {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { displayOrder: 'asc' } },
        inventory: true,
        variants: {
          include: { inventory: true },
        },
        tags: { include: { tag: true } },
      },
    });

    if (!product) {
      throw new Error(`Product with ID '${id}' not found.`);
    }

    return product;
  }

  /**
   * Create a new product with images, variants, tags, and single-source inventory
   */
  static async createProduct(input: AdminProductInput) {
    // 1. Check for duplicate slug or SKU
    const existingSlug = await db.product.findUnique({ where: { slug: input.slug } });
    if (existingSlug) {
      throw new Error(`Product slug '${input.slug}' is already in use.`);
    }

    const existingSku = await db.product.findUnique({ where: { sku: input.sku } });
    if (existingSku) {
      throw new Error(`Product SKU '${input.sku}' is already in use.`);
    }

    // Check brand and category existence
    const brand = await db.brand.findUnique({ where: { id: input.brandId } });
    if (!brand) throw new Error(`Brand ID '${input.brandId}' does not exist.`);

    const category = await db.category.findUnique({ where: { id: input.categoryId } });
    if (!category) throw new Error(`Category ID '${input.categoryId}' does not exist.`);

    return db.$transaction(async (tx) => {
      // Create base product
      const product = await tx.product.create({
        data: {
          name: input.name,
          slug: input.slug,
          sku: input.sku,
          description: input.description,
          shortDescription: input.shortDescription,
          seoTitle: input.seoTitle || null,
          seoDescription: input.seoDescription || null,
          basePricePence: input.basePricePence,
          isPublished: input.isPublished ?? true,
          isFeatured: input.isFeatured ?? false,
          hasVariants: input.hasVariants ?? false,
          brandId: input.brandId,
          categoryId: input.categoryId,
        },
      });

      // Images
      if (input.images && input.images.length > 0) {
        await tx.productImage.createMany({
          data: input.images.map((img, idx) => ({
            productId: product.id,
            url: img.url,
            altText: img.altText || input.name,
            isPrimary: img.isPrimary ?? idx === 0,
            displayOrder: img.displayOrder ?? idx,
          })),
        });
      }

      // Single-source inventory handling
      if (input.hasVariants && input.variants && input.variants.length > 0) {
        for (const variantData of input.variants) {
          // Check variant SKU uniqueness
          const existingVariantSku = await tx.productVariant.findUnique({ where: { sku: variantData.sku } });
          if (existingVariantSku) {
            throw new Error(`Variant SKU '${variantData.sku}' is already in use.`);
          }

          const variant = await tx.productVariant.create({
            data: {
              productId: product.id,
              sku: variantData.sku,
              name: variantData.name,
              pricePence: variantData.pricePence,
              attributes: variantData.attributes || {},
            },
          });

          const qty = variantData.quantity || 0;
          const status = qty === 0 ? StockStatus.OUT_OF_STOCK : qty <= 5 ? StockStatus.LOW_STOCK : StockStatus.IN_STOCK;

          await tx.variantInventory.create({
            data: {
              variantId: variant.id,
              quantity: qty,
              reservedQuantity: 0,
              availableQuantity: qty,
              lowStockThreshold: 5,
              stockStatus: status,
            },
          });
        }
      } else {
        // Non-variant inventory
        const qty = input.initialQuantity || 0;
        const status = qty === 0 ? StockStatus.OUT_OF_STOCK : qty <= 5 ? StockStatus.LOW_STOCK : StockStatus.IN_STOCK;

        await tx.productInventory.create({
          data: {
            productId: product.id,
            quantity: qty,
            reservedQuantity: 0,
            availableQuantity: qty,
            lowStockThreshold: 5,
            stockStatus: status,
          },
        });
      }

      // Tags
      if (input.tags && input.tags.length > 0) {
        for (const tagName of input.tags) {
          const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          let tag = await tx.tag.findUnique({ where: { slug: tagSlug } });
          if (!tag) {
            tag = await tx.tag.create({ data: { name: tagName, slug: tagSlug } });
          }
          await tx.productTag.create({
            data: { productId: product.id, tagId: tag.id },
          });
        }
      }

      return this.getProductById(product.id);
    });
  }

  /**
   * Update an existing product
   */
  static async updateProduct(id: string, input: Partial<AdminProductInput>) {
    const existing = await db.product.findUnique({ where: { id } });
    if (!existing) {
      throw new Error(`Product with ID '${id}' not found.`);
    }

    if (input.slug && input.slug !== existing.slug) {
      const existingSlug = await db.product.findUnique({ where: { slug: input.slug } });
      if (existingSlug) throw new Error(`Product slug '${input.slug}' is already in use.`);
    }

    if (input.sku && input.sku !== existing.sku) {
      const existingSku = await db.product.findUnique({ where: { sku: input.sku } });
      if (existingSku) throw new Error(`Product SKU '${input.sku}' is already in use.`);
    }

    return db.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: {
          ...(input.name && { name: input.name }),
          ...(input.slug && { slug: input.slug }),
          ...(input.sku && { sku: input.sku }),
          ...(input.description && { description: input.description }),
          ...(input.shortDescription && { shortDescription: input.shortDescription }),
          ...(input.seoTitle !== undefined && { seoTitle: input.seoTitle || null }),
          ...(input.seoDescription !== undefined && { seoDescription: input.seoDescription || null }),
          ...(input.basePricePence !== undefined && { basePricePence: input.basePricePence }),
          ...(input.isPublished !== undefined && { isPublished: input.isPublished }),
          ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }),
          ...(input.brandId && { brandId: input.brandId }),
          ...(input.categoryId && { categoryId: input.categoryId }),
        },
      });

      // Update images if provided
      if (input.images !== undefined) {
        await tx.productImage.deleteMany({ where: { productId: id } });
        if (input.images.length > 0) {
          await tx.productImage.createMany({
            data: input.images.map((img, idx) => ({
              productId: id,
              url: img.url,
              altText: img.altText || input.name || existing.name,
              isPrimary: img.isPrimary ?? idx === 0,
              displayOrder: img.displayOrder ?? idx,
            })),
          });
        }
      }

      return this.getProductById(id);
    });
  }

  /**
   * Soft-delete / Archive a product to keep database integrity and historical order snapshots safe
   */
  static async archiveProduct(id: string) {
    const product = await db.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID '${id}' not found.`);
    }

    return db.product.update({
      where: { id },
      data: {
        isPublished: false,
        deletedAt: new Date(),
      },
    });
  }
}
