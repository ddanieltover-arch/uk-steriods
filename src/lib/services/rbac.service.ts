import { Role } from '@prisma/client';

export type Permission =
  | 'dashboard:read'
  | 'product:read'
  | 'product:create'
  | 'product:update'
  | 'product:archive'
  | 'product:delete'
  | 'category:read'
  | 'category:manage'
  | 'brand:read'
  | 'brand:manage'
  | 'inventory:read'
  | 'inventory:adjust'
  | 'inventory:manage'
  | 'order:read'
  | 'order:update_status'
  | 'order:update_payment'
  | 'order:update_shipment'
  | 'order:cancel'
  | 'customer:read'
  | 'customer:manage'
  | 'discount:read'
  | 'discount:manage'
  | 'review:read'
  | 'review:moderate'
  | 'shipping:read'
  | 'shipping:manage'
  | 'settings:read'
  | 'settings:manage'
  | 'role:manage'
  | 'audit:read'
  | 'notification:read'
  | 'notification:resend'
  | 'notification:preview';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    'dashboard:read',
    'product:read',
    'product:create',
    'product:update',
    'product:archive',
    'product:delete',
    'category:read',
    'category:manage',
    'brand:read',
    'brand:manage',
    'inventory:read',
    'inventory:adjust',
    'inventory:manage',
    'order:read',
    'order:update_status',
    'order:update_payment',
    'order:update_shipment',
    'order:cancel',
    'customer:read',
    'customer:manage',
    'discount:read',
    'discount:manage',
    'review:read',
    'review:moderate',
    'shipping:read',
    'shipping:manage',
    'settings:read',
    'settings:manage',
    'role:manage',
    'audit:read',
    'notification:read',
    'notification:resend',
    'notification:preview',
  ],
  ADMIN: [
    'dashboard:read',
    'product:read',
    'product:create',
    'product:update',
    'product:archive',
    'product:delete',
    'category:read',
    'category:manage',
    'brand:read',
    'brand:manage',
    'inventory:read',
    'inventory:adjust',
    'inventory:manage',
    'order:read',
    'order:update_status',
    'order:update_payment',
    'order:update_shipment',
    'order:cancel',
    'customer:read',
    'customer:manage',
    'discount:read',
    'discount:manage',
    'review:read',
    'review:moderate',
    'shipping:read',
    'shipping:manage',
    'settings:read',
    'settings:manage',
    'audit:read',
    'notification:read',
    'notification:resend',
    'notification:preview',
  ],
  STAFF: [
    'dashboard:read',
    'product:read',
    'inventory:read',
    'inventory:adjust',
    'order:read',
    'order:update_status',
    'order:update_shipment',
    'notification:read',
  ],
  CUSTOMER: [],
};

export class RBACService {
  /**
   * Checks if user role has a specific granular permission
   */
  static hasPermission(role: Role, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
  }

  /**
   * Enforces server-side authorization guard
   */
  static authorize(role: Role, permission: Permission): void {
    if (!this.hasPermission(role, permission)) {
      throw new Error(`Forbidden: Role '${role}' lacks required permission '${permission}'`);
    }
  }

  /**
   * Return full permission matrix map
   */
  static getPermissionMatrix() {
    return ROLE_PERMISSIONS;
  }
}
