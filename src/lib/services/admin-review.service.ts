import { db } from '../db';

export class AdminReviewService {
  static async listReviews(options: { isApproved?: boolean; productId?: string; page?: number; limit?: number } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options.isApproved !== undefined) where.isApproved = options.isApproved;
    if (options.productId) where.productId = options.productId;

    const [reviews, total] = await Promise.all([
      db.review.findMany({
        where,
        include: {
          product: { select: { id: true, name: true, slug: true } },
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.review.count({ where }),
    ]);

    return {
      reviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  static async moderateReview(id: string, isApproved: boolean) {
    const review = await db.review.findUnique({ where: { id } });
    if (!review) throw new Error(`Review with ID '${id}' not found.`);

    return db.review.update({
      where: { id },
      data: { isApproved },
    });
  }

  static async deleteReview(id: string) {
    const review = await db.review.findUnique({ where: { id } });
    if (!review) throw new Error(`Review with ID '${id}' not found.`);

    return db.review.delete({ where: { id } });
  }
}
