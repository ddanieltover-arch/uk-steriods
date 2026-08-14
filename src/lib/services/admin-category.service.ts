import { db } from '../db';
import { AdminCategoryInput } from '../validation';

export class AdminCategoryService {
  /**
   * List all categories with hierarchy and product counts
   */
  static async listCategories() {
    const categories = await db.category.findMany({
      include: {
        parent: true,
        children: true,
        _count: { select: { products: true } },
      },
      orderBy: { name: 'asc' },
    });

    return categories.map((c) => ({
      ...c,
      productCount: c._count.products,
    }));
  }

  /**
   * Get category detail by ID
   */
  static async getCategoryById(id: string) {
    const category = await db.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        products: {
          select: { id: true, name: true, sku: true, isPublished: true },
        },
      },
    });

    if (!category) {
      throw new Error(`Category with ID '${id}' not found.`);
    }

    return category;
  }

  /**
   * Create a new category
   */
  static async createCategory(input: AdminCategoryInput) {
    const existingSlug = await db.category.findUnique({ where: { slug: input.slug } });
    if (existingSlug) {
      throw new Error(`Category slug '${input.slug}' is already in use.`);
    }

    if (input.parentId) {
      const parent = await db.category.findUnique({ where: { id: input.parentId } });
      if (!parent) {
        throw new Error(`Parent category with ID '${input.parentId}' does not exist.`);
      }
    }

    return db.category.create({
      data: {
        name: input.name,
        slug: input.slug,
        description: input.description || null,
        imageUrl: input.imageUrl || null,
        parentId: input.parentId || null,
      },
    });
  }

  /**
   * Update category with circular reference protection
   */
  static async updateCategory(id: string, input: Partial<AdminCategoryInput>) {
    const category = await db.category.findUnique({ where: { id } });
    if (!category) {
      throw new Error(`Category with ID '${id}' not found.`);
    }

    if (input.slug && input.slug !== category.slug) {
      const existingSlug = await db.category.findUnique({ where: { slug: input.slug } });
      if (existingSlug) {
        throw new Error(`Category slug '${input.slug}' is already in use.`);
      }
    }

    // Circular parent check: Category A cannot be parent of itself or grandparent of itself
    if (input.parentId) {
      if (input.parentId === id) {
        throw new Error('A category cannot be its own parent.');
      }
      const isCircular = await this.detectCircularParent(id, input.parentId);
      if (isCircular) {
        throw new Error('Invalid hierarchy: Setting this parent creates a circular category relationship.');
      }
    }

    return db.category.update({
      where: { id },
      data: {
        ...(input.name && { name: input.name }),
        ...(input.slug && { slug: input.slug }),
        ...(input.description !== undefined && { description: input.description || null }),
        ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl || null }),
        ...(input.parentId !== undefined && { parentId: input.parentId || null }),
      },
    });
  }

  /**
   * Delete category safely (fails if category contains products unless reassigned)
   */
  static async deleteCategory(id: string, reassignCategoryId?: string) {
    const category = await db.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (!category) {
      throw new Error(`Category with ID '${id}' not found.`);
    }

    const productCount = category._count.products;

    if (productCount > 0) {
      if (!reassignCategoryId) {
        throw new Error(`Cannot delete category '${category.name}' because it contains ${productCount} products. Please specify a reassignment category.`);
      }

      if (reassignCategoryId === id) {
        throw new Error('Reassignment category cannot be the category being deleted.');
      }

      const targetCategory = await db.category.findUnique({ where: { id: reassignCategoryId } });
      if (!targetCategory) {
        throw new Error(`Target reassignment category '${reassignCategoryId}' not found.`);
      }

      // Transactionally reassign products then delete category
      return db.$transaction(async (tx) => {
        await tx.product.updateMany({
          where: { categoryId: id },
          data: { categoryId: reassignCategoryId },
        });

        return tx.category.delete({ where: { id } });
      });
    }

    return db.category.delete({ where: { id } });
  }

  /**
   * Helper function to traverse parent hierarchy and detect loops
   */
  private static async detectCircularParent(categoryId: string, candidateParentId: string): Promise<boolean> {
    let currentId: string | null = candidateParentId;
    const visited = new Set<string>();

    while (currentId) {
      if (currentId === categoryId) {
        return true;
      }
      if (visited.has(currentId)) {
        return true;
      }
      visited.add(currentId);

      const parentCategory = await db.category.findUnique({
        where: { id: currentId },
        select: { parentId: true },
      });

      currentId = parentCategory?.parentId || null;
    }

    return false;
  }
}
