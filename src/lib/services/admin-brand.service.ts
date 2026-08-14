import { db } from '../db';
import { AdminBrandInput } from '../validation';

export class AdminBrandService {
  /**
   * List all brands with product counts
   */
  static async listBrands() {
    const brands = await db.brand.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: 'asc' },
    });

    return brands.map((b) => ({
      ...b,
      productCount: b._count.products,
    }));
  }

  /**
   * Get brand detail by ID
   */
  static async getBrandById(id: string) {
    const brand = await db.brand.findUnique({
      where: { id },
      include: {
        _count: { select: { products: true } },
        products: {
          select: { id: true, name: true, sku: true, isPublished: true },
        },
      },
    });

    if (!brand) {
      throw new Error(`Brand with ID '${id}' not found.`);
    }

    return brand;
  }

  /**
   * Create brand
   */
  static async createBrand(input: AdminBrandInput) {
    const existingName = await db.brand.findUnique({ where: { name: input.name } });
    if (existingName) throw new Error(`Brand with name '${input.name}' already exists.`);

    const existingSlug = await db.brand.findUnique({ where: { slug: input.slug } });
    if (existingSlug) throw new Error(`Brand with slug '${input.slug}' already exists.`);

    return db.brand.create({
      data: {
        name: input.name,
        slug: input.slug,
        description: input.description || null,
        logoUrl: input.logoUrl || null,
        isFeatured: input.isFeatured ?? false,
      },
    });
  }

  /**
   * Update brand
   */
  static async updateBrand(id: string, input: Partial<AdminBrandInput>) {
    const brand = await db.brand.findUnique({ where: { id } });
    if (!brand) throw new Error(`Brand with ID '${id}' not found.`);

    if (input.name && input.name !== brand.name) {
      const existingName = await db.brand.findUnique({ where: { name: input.name } });
      if (existingName) throw new Error(`Brand with name '${input.name}' already exists.`);
    }

    if (input.slug && input.slug !== brand.slug) {
      const existingSlug = await db.brand.findUnique({ where: { slug: input.slug } });
      if (existingSlug) throw new Error(`Brand with slug '${input.slug}' already exists.`);
    }

    return db.brand.update({
      where: { id },
      data: {
        ...(input.name && { name: input.name }),
        ...(input.slug && { slug: input.slug }),
        ...(input.description !== undefined && { description: input.description || null }),
        ...(input.logoUrl !== undefined && { logoUrl: input.logoUrl || null }),
        ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }),
      },
    });
  }

  /**
   * Delete brand safely (prevent deletion if products exist)
   */
  static async deleteBrand(id: string) {
    const brand = await db.brand.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (!brand) throw new Error(`Brand with ID '${id}' not found.`);

    if (brand._count.products > 0) {
      throw new Error(`Cannot delete brand '${brand.name}' because ${brand._count.products} products are associated with it.`);
    }

    return db.brand.delete({ where: { id } });
  }
}
