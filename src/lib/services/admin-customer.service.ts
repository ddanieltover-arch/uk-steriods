import { db } from '../db';
import { Role } from '@prisma/client';

export class AdminCustomerService {
  /**
   * List all registered customers with lifetime value and order metrics
   */
  static async listCustomers(options: { search?: string; page?: number; limit?: number } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };

    if (options.search) {
      const q = options.search;
      where.OR = [
        { email: { contains: q, mode: 'insensitive' } },
        { firstName: { contains: q, mode: 'insensitive' } },
        { lastName: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: { select: { orders: true } },
          orders: {
            select: { totalPence: true, status: true },
            where: { status: { notIn: ['CANCELLED', 'REFUNDED'] } },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.user.count({ where }),
    ]);

    const formattedUsers = users.map((u) => {
      const lifetimeValuePence = u.orders.reduce((sum, o) => sum + o.totalPence, 0);
      const { orders, ...rest } = u;
      return {
        ...rest,
        orderCount: u._count.orders,
        lifetimeValuePence,
      };
    });

    return {
      customers: formattedUsers,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Get detailed customer profile with order history and saved addresses
   */
  static async getCustomerById(id: string) {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
        orders: {
          include: { items: true, shipments: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new Error(`Customer with ID '${id}' not found.`);
    }

    const lifetimeValuePence = user.orders
      .filter((o) => o.status !== 'CANCELLED' && o.status !== 'REFUNDED')
      .reduce((sum, o) => sum + o.totalPence, 0);

    return {
      ...user,
      orderCount: user.orders.length,
      lifetimeValuePence,
    };
  }

  /**
   * Update user administrative role (SUPER_ADMIN ONLY)
   */
  static async updateUserRole(targetUserId: string, newRole: Role, requestingUser: { id: string; role: Role }) {
    // 1. Strict SUPER_ADMIN check
    if (requestingUser.role !== Role.SUPER_ADMIN) {
      throw new Error('Forbidden: Only a SUPER_ADMIN can modify user roles.');
    }

    const targetUser = await db.user.findUnique({ where: { id: targetUserId } });
    if (!targetUser) {
      throw new Error(`User with ID '${targetUserId}' not found.`);
    }

    // 2. Prevent demoting/removing the final SUPER_ADMIN
    if (targetUser.role === Role.SUPER_ADMIN && newRole !== Role.SUPER_ADMIN) {
      const superAdminCount = await db.user.count({ where: { role: Role.SUPER_ADMIN, deletedAt: null } });
      if (superAdminCount <= 1) {
        throw new Error('Forbidden: Cannot demote the final SUPER_ADMIN. Assign another SUPER_ADMIN first.');
      }
    }

    return db.user.update({
      where: { id: targetUserId },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        updatedAt: true,
      },
    });
  }
}
