import { db } from '../db';

export interface LogActionParams {
  userId?: string | null;
  action: string;
  entity: string;
  entityId: string;
  metadata?: Record<string, any> | null;
  ipAddress?: string | null;
}

export interface AuditLogQueryParams {
  userId?: string;
  action?: string;
  entity?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  page?: number;
  limit?: number;
}

export class AuditService {
  /**
   * Creates an audit log entry for sensitive admin actions.
   * Strips out passwords, secrets, and session tokens from metadata.
   */
  static async logAction(params: LogActionParams): Promise<void> {
    try {
      const sanitizedMetadata = params.metadata
        ? this.sanitizeMetadata(params.metadata)
        : null;

      await db.auditLog.create({
        data: {
          userId: params.userId || null,
          action: params.action,
          entity: params.entity,
          entityId: params.entityId,
          metadata: sanitizedMetadata ?? undefined,
          ipAddress: params.ipAddress || null,
        },
      });
    } catch (err) {
      console.error('Failed to create audit log entry:', err);
    }
  }

  /**
   * Queries audit logs with pagination and filters.
   */
  static async getLogs(query: AuditLogQueryParams = {}) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, Math.max(1, query.limit || 20));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.userId) {
      where.userId = query.userId;
    }
    if (query.action) {
      where.action = { contains: query.action, mode: 'insensitive' };
    }
    if (query.entity) {
      where.entity = { contains: query.entity, mode: 'insensitive' };
    }
    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) {
        where.createdAt.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.createdAt.lte = new Date(query.endDate);
      }
    }

    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.auditLog.count({ where }),
    ]);

    return {
      logs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Helper to strip secret fields from metadata before persisting
   */
  private static sanitizeMetadata(metadata: Record<string, any>): Record<string, any> {
    const sensitiveKeys = ['password', 'passwordHash', 'token', 'secret', 'cardNumber', 'cvv'];
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(metadata)) {
      if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        sanitized[key] = this.sanitizeMetadata(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }
}
