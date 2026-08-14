import { Express, Request, Response, NextFunction } from 'express';
import { RBACService, Permission } from '../services/rbac.service';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { AdminProductService } from '../services/admin-product.service';
import { AdminCategoryService } from '../services/admin-category.service';
import { AdminBrandService } from '../services/admin-brand.service';
import { InventoryAdminService } from '../services/inventory-admin.service';
import { AdminOrderService } from '../services/admin-order.service';
import { AdminCustomerService } from '../services/admin-customer.service';
import { AdminDiscountService } from '../services/admin-discount.service';
import { AdminReviewService } from '../services/admin-review.service';
import { AdminShippingService } from '../services/admin-shipping.service';
import { AdminStoreSettingsService } from '../services/admin-settings.service';
import { AuditService } from '../services/audit.service';
import { NotificationService } from '../notifications/notification.service';
import { NotificationEventType, NotificationStatus } from '@prisma/client';
import {
  getDemoAccountContext,
  getDemoOrderContext,
  renderNotificationEmail,
} from '../notifications/email.registry';
import { rateLimit } from '../middleware/rate-limit';
import {
  AdminProductSchema,
  AdminCategorySchema,
  AdminBrandSchema,
  AdminInventoryAdjustmentSchema,
  AdminOrderStatusUpdateSchema,
  AdminPaymentStatusUpdateSchema,
  AdminShipmentUpdateSchema,
  AdminCustomerRoleUpdateSchema,
  AdminDiscountSchema,
  AdminModerateReviewSchema,
  AdminShippingConfigSchema,
  AdminStoreSettingSchema,
} from '../validation';

export function registerAdminRoutes(
  app: Express,
  getAuthenticatedUser: (req: Request) => Promise<any>
) {
  // Middleware to require authentication
  async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await getAuthenticatedUser(req);
      if (!user) {
        return res.status(401).json({ error: 'Authentication required. Please log in.' });
      }
      (req as any).user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid session.' });
    }
  }

  // Middleware to require specific granular permission
  function requirePermission(permission: Permission) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({ error: 'Authentication required.' });
      }
      if (!RBACService.hasPermission(user.role, permission)) {
        return res.status(403).json({
          error: `Forbidden. Role '${user.role}' lacks required permission '${permission}'.`,
        });
      }
      next();
    };
  }

  // ==========================================
  // 1. DASHBOARD
  // ==========================================
  app.get(
    '/api/v1/admin/dashboard',
    requireAuth,
    requirePermission('dashboard:read'),
    async (_req, res) => {
      try {
        const metrics = await AdminDashboardService.getMetrics();
        res.json(metrics);
      } catch (err: any) {
        console.error('Admin dashboard error:', err);
        res.status(500).json({ error: 'Failed to retrieve admin dashboard metrics.' });
      }
    }
  );

  // ==========================================
  // 2. PRODUCT MANAGEMENT
  // ==========================================
  app.get(
    '/api/v1/admin/products',
    requireAuth,
    requirePermission('product:read'),
    async (req, res) => {
      try {
        const search = req.query.search as string;
        const categoryId = req.query.categoryId as string;
        const brandId = req.query.brandId as string;
        const includeArchived = req.query.includeArchived === 'true';
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;

        const result = await AdminProductService.listProducts({
          search,
          categoryId,
          brandId,
          includeArchived,
          page,
          limit,
        });

        res.json(result);
      } catch (err: any) {
        console.error('List admin products error:', err);
        res.status(500).json({ error: 'Failed to list products.' });
      }
    }
  );

  app.get(
    '/api/v1/admin/products/:id',
    requireAuth,
    requirePermission('product:read'),
    async (req, res) => {
      try {
        const product = await AdminProductService.getProductById(req.params.id);
        res.json({ product });
      } catch (err: any) {
        res.status(404).json({ error: err?.message || 'Product not found.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/products',
    requireAuth,
    requirePermission('product:create'),
    async (req, res) => {
      try {
        const parsed = AdminProductSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const product = await AdminProductService.createProduct(parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'PRODUCT_CREATED',
          entity: 'Product',
          entityId: product.id,
          metadata: { name: product.name, sku: product.sku, pricePence: product.basePricePence },
          ipAddress: req.ip,
        });

        res.status(201).json({ success: true, product });
      } catch (err: any) {
        console.error('Create product error:', err);
        res.status(400).json({ error: err?.message || 'Failed to create product.' });
      }
    }
  );

  app.patch(
    '/api/v1/admin/products/:id',
    requireAuth,
    requirePermission('product:update'),
    async (req, res) => {
      try {
        const parsed = AdminProductSchema.partial().safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const updated = await AdminProductService.updateProduct(req.params.id, parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'PRODUCT_UPDATED',
          entity: 'Product',
          entityId: req.params.id,
          metadata: parsed.data,
          ipAddress: req.ip,
        });

        res.json({ success: true, product: updated });
      } catch (err: any) {
        console.error('Update product error:', err);
        res.status(400).json({ error: err?.message || 'Failed to update product.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/products/:id/archive',
    requireAuth,
    requirePermission('product:archive'),
    async (req, res) => {
      try {
        const user = (req as any).user;
        const archived = await AdminProductService.archiveProduct(req.params.id);

        await AuditService.logAction({
          userId: user.id,
          action: 'PRODUCT_ARCHIVED',
          entity: 'Product',
          entityId: req.params.id,
          metadata: { isPublished: false, archivedAt: new Date() },
          ipAddress: req.ip,
        });

        res.json({ success: true, message: 'Product archived successfully.', product: archived });
      } catch (err: any) {
        console.error('Archive product error:', err);
        res.status(400).json({ error: err?.message || 'Failed to archive product.' });
      }
    }
  );

  // ==========================================
  // 3. CATEGORY MANAGEMENT
  // ==========================================
  app.get(
    '/api/v1/admin/categories',
    requireAuth,
    requirePermission('category:read'),
    async (_req, res) => {
      try {
        const categories = await AdminCategoryService.listCategories();
        res.json({ categories });
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve categories.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/categories',
    requireAuth,
    requirePermission('category:manage'),
    async (req, res) => {
      try {
        const parsed = AdminCategorySchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const category = await AdminCategoryService.createCategory(parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'CATEGORY_UPDATED',
          entity: 'Category',
          entityId: category.id,
          metadata: { name: category.name, slug: category.slug },
          ipAddress: req.ip,
        });

        res.status(201).json({ success: true, category });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to create category.' });
      }
    }
  );

  app.patch(
    '/api/v1/admin/categories/:id',
    requireAuth,
    requirePermission('category:manage'),
    async (req, res) => {
      try {
        const parsed = AdminCategorySchema.partial().safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const category = await AdminCategoryService.updateCategory(req.params.id, parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'CATEGORY_UPDATED',
          entity: 'Category',
          entityId: req.params.id,
          metadata: parsed.data,
          ipAddress: req.ip,
        });

        res.json({ success: true, category });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to update category.' });
      }
    }
  );

  app.delete(
    '/api/v1/admin/categories/:id',
    requireAuth,
    requirePermission('category:manage'),
    async (req, res) => {
      try {
        const reassignCategoryId = req.query.reassignCategoryId as string | undefined;
        const user = (req as any).user;
        await AdminCategoryService.deleteCategory(req.params.id, reassignCategoryId);

        await AuditService.logAction({
          userId: user.id,
          action: 'CATEGORY_UPDATED',
          entity: 'Category',
          entityId: req.params.id,
          metadata: { deleted: true, reassignedTo: reassignCategoryId || null },
          ipAddress: req.ip,
        });

        res.json({ success: true, message: 'Category deleted successfully.' });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to delete category.' });
      }
    }
  );

  // ==========================================
  // 4. BRAND MANAGEMENT
  // ==========================================
  app.get(
    '/api/v1/admin/brands',
    requireAuth,
    requirePermission('brand:read'),
    async (_req, res) => {
      try {
        const brands = await AdminBrandService.listBrands();
        res.json({ brands });
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve brands.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/brands',
    requireAuth,
    requirePermission('brand:manage'),
    async (req, res) => {
      try {
        const parsed = AdminBrandSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const brand = await AdminBrandService.createBrand(parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'BRAND_UPDATED',
          entity: 'Brand',
          entityId: brand.id,
          metadata: { name: brand.name, slug: brand.slug },
          ipAddress: req.ip,
        });

        res.status(201).json({ success: true, brand });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to create brand.' });
      }
    }
  );

  app.patch(
    '/api/v1/admin/brands/:id',
    requireAuth,
    requirePermission('brand:manage'),
    async (req, res) => {
      try {
        const parsed = AdminBrandSchema.partial().safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const brand = await AdminBrandService.updateBrand(req.params.id, parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'BRAND_UPDATED',
          entity: 'Brand',
          entityId: req.params.id,
          metadata: parsed.data,
          ipAddress: req.ip,
        });

        res.json({ success: true, brand });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to update brand.' });
      }
    }
  );

  app.delete(
    '/api/v1/admin/brands/:id',
    requireAuth,
    requirePermission('brand:manage'),
    async (req, res) => {
      try {
        const user = (req as any).user;
        await AdminBrandService.deleteBrand(req.params.id);

        await AuditService.logAction({
          userId: user.id,
          action: 'BRAND_UPDATED',
          entity: 'Brand',
          entityId: req.params.id,
          metadata: { deleted: true },
          ipAddress: req.ip,
        });

        res.json({ success: true, message: 'Brand deleted successfully.' });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to delete brand.' });
      }
    }
  );

  // ==========================================
  // 5. INVENTORY MANAGEMENT
  // ==========================================
  app.get(
    '/api/v1/admin/inventory',
    requireAuth,
    requirePermission('inventory:read'),
    async (req, res) => {
      try {
        const status = req.query.status as string;
        const search = req.query.search as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;

        const result = await InventoryAdminService.listInventory({ status, search, page, limit });
        res.json(result);
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve inventory dashboard.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/inventory/adjust',
    requireAuth,
    requirePermission('inventory:adjust'),
    async (req, res) => {
      try {
        const parsed = AdminInventoryAdjustmentSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const result = await InventoryAdminService.adjustStock(parsed.data, user.id);

        await AuditService.logAction({
          userId: user.id,
          action: 'INVENTORY_ADJUSTED',
          entity: parsed.data.variantId ? 'VariantInventory' : 'ProductInventory',
          entityId: (parsed.data.variantId || parsed.data.productId)!,
          metadata: {
            previousQuantity: result.previousQuantity,
            adjustment: result.adjustment,
            resultingQuantity: result.resultingQuantity,
            reason: parsed.data.reason,
            reference: parsed.data.reference,
          },
          ipAddress: req.ip,
        });

        res.json({ success: true, result });
      } catch (err: any) {
        console.error('Inventory adjustment error:', err);
        res.status(400).json({ error: err?.message || 'Failed to adjust inventory.' });
      }
    }
  );

  app.get(
    '/api/v1/admin/inventory/history',
    requireAuth,
    requirePermission('inventory:read'),
    async (req, res) => {
      try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;
        const history = await InventoryAdminService.getAdjustmentHistory({ page, limit });
        res.json(history);
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve inventory adjustment history.' });
      }
    }
  );

  // ==========================================
  // 6. ORDER & FULFILLMENT MANAGEMENT
  // ==========================================
  app.get(
    '/api/v1/admin/orders',
    requireAuth,
    requirePermission('order:read'),
    async (req, res) => {
      try {
        const status = req.query.status as any;
        const paymentStatus = req.query.paymentStatus as any;
        const search = req.query.search as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;

        const result = await AdminOrderService.listOrders({
          status,
          paymentStatus,
          search,
          page,
          limit,
        });

        res.json(result);
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve admin orders list.' });
      }
    }
  );

  app.get(
    '/api/v1/admin/orders/:orderNumber',
    requireAuth,
    requirePermission('order:read'),
    async (req, res) => {
      try {
        const order = await AdminOrderService.getOrderByNumber(req.params.orderNumber);
        res.json({ order });
      } catch (err: any) {
        res.status(404).json({ error: err?.message || 'Order not found.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/orders/:orderNumber/status',
    requireAuth,
    requirePermission('order:update_status'),
    async (req, res) => {
      try {
        const parsed = AdminOrderStatusUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const updatedOrder = await AdminOrderService.updateOrderStatus(
          req.params.orderNumber,
          parsed.data.status
        );

        await AuditService.logAction({
          userId: user.id,
          action: 'ORDER_STATUS_CHANGED',
          entity: 'Order',
          entityId: updatedOrder.id,
          metadata: {
            orderNumber: req.params.orderNumber,
            newStatus: parsed.data.status,
            note: parsed.data.note || null,
          },
          ipAddress: req.ip,
        });

        res.json({ success: true, order: updatedOrder });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to update order status.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/orders/:orderNumber/payment',
    requireAuth,
    requirePermission('order:update_payment'),
    async (req, res) => {
      try {
        const parsed = AdminPaymentStatusUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const updatedOrder = await AdminOrderService.updatePaymentStatus(
          req.params.orderNumber,
          parsed.data.paymentStatus
        );

        await AuditService.logAction({
          userId: user.id,
          action: 'PAYMENT_STATUS_CHANGED',
          entity: 'Order',
          entityId: updatedOrder.id,
          metadata: {
            orderNumber: req.params.orderNumber,
            paymentStatus: parsed.data.paymentStatus,
            note: parsed.data.note || null,
          },
          ipAddress: req.ip,
        });

        res.json({ success: true, order: updatedOrder });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to update payment status.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/orders/:orderNumber/shipment',
    requireAuth,
    requirePermission('order:update_shipment'),
    async (req, res) => {
      try {
        const parsed = AdminShipmentUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const shipment = await AdminOrderService.updateShipment(
          req.params.orderNumber,
          parsed.data
        );

        await AuditService.logAction({
          userId: user.id,
          action: 'SHIPMENT_UPDATED',
          entity: 'Shipment',
          entityId: shipment.id,
          metadata: {
            orderNumber: req.params.orderNumber,
            trackingNumber: parsed.data.trackingNumber,
            provider: parsed.data.provider,
            status: shipment.status,
          },
          ipAddress: req.ip,
        });

        res.json({ success: true, shipment });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to update shipment tracking.' });
      }
    }
  );

  // ==========================================
  // 7. CUSTOMER & ROLE MANAGEMENT
  // ==========================================
  app.get(
    '/api/v1/admin/customers',
    requireAuth,
    requirePermission('customer:read'),
    async (req, res) => {
      try {
        const search = req.query.search as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;

        const result = await AdminCustomerService.listCustomers({ search, page, limit });
        res.json(result);
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve customers.' });
      }
    }
  );

  app.get(
    '/api/v1/admin/customers/:id',
    requireAuth,
    requirePermission('customer:read'),
    async (req, res) => {
      try {
        const customer = await AdminCustomerService.getCustomerById(req.params.id);
        res.json({ customer });
      } catch (err: any) {
        res.status(404).json({ error: err?.message || 'Customer not found.' });
      }
    }
  );

  app.patch(
    '/api/v1/admin/customers/:id/role',
    requireAuth,
    requirePermission('role:manage'),
    async (req, res) => {
      try {
        const parsed = AdminCustomerRoleUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const updatedUser = await AdminCustomerService.updateUserRole(
          req.params.id,
          parsed.data.role,
          user
        );

        await AuditService.logAction({
          userId: user.id,
          action: 'USER_ROLE_CHANGED',
          entity: 'User',
          entityId: req.params.id,
          metadata: { targetUserId: req.params.id, newRole: parsed.data.role },
          ipAddress: req.ip,
        });

        res.json({ success: true, user: updatedUser });
      } catch (err: any) {
        res.status(403).json({ error: err?.message || 'Failed to update user role.' });
      }
    }
  );

  // ==========================================
  // 8. DISCOUNTS MANAGEMENT
  // ==========================================
  app.get(
    '/api/v1/admin/discounts',
    requireAuth,
    requirePermission('discount:read'),
    async (_req, res) => {
      try {
        const discounts = await AdminDiscountService.listDiscounts();
        res.json({ discounts });
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve discounts.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/discounts',
    requireAuth,
    requirePermission('discount:manage'),
    async (req, res) => {
      try {
        const parsed = AdminDiscountSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const discount = await AdminDiscountService.createDiscount(parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'DISCOUNT_CREATED',
          entity: 'Discount',
          entityId: discount.id,
          metadata: { code: discount.code, type: discount.type, value: discount.valuePenceOrPercent },
          ipAddress: req.ip,
        });

        res.status(201).json({ success: true, discount });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to create discount.' });
      }
    }
  );

  app.patch(
    '/api/v1/admin/discounts/:id',
    requireAuth,
    requirePermission('discount:manage'),
    async (req, res) => {
      try {
        const parsed = AdminDiscountSchema.partial().safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const discount = await AdminDiscountService.updateDiscount(req.params.id, parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'DISCOUNT_UPDATED',
          entity: 'Discount',
          entityId: req.params.id,
          metadata: parsed.data,
          ipAddress: req.ip,
        });

        res.json({ success: true, discount });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to update discount.' });
      }
    }
  );

  // ==========================================
  // 9. REVIEWS MODERATION
  // ==========================================
  app.get(
    '/api/v1/admin/reviews',
    requireAuth,
    requirePermission('review:read'),
    async (req, res) => {
      try {
        const isApproved = req.query.isApproved !== undefined ? req.query.isApproved === 'true' : undefined;
        const productId = req.query.productId as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;

        const result = await AdminReviewService.listReviews({ isApproved, productId, page, limit });
        res.json(result);
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve reviews.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/reviews/:id/moderate',
    requireAuth,
    requirePermission('review:moderate'),
    async (req, res) => {
      try {
        const parsed = AdminModerateReviewSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({ error: 'Valid isApproved boolean is required.' });
        }

        const user = (req as any).user;
        const review = await AdminReviewService.moderateReview(req.params.id, parsed.data.isApproved);

        await AuditService.logAction({
          userId: user.id,
          action: 'REVIEW_MODERATED',
          entity: 'Review',
          entityId: req.params.id,
          metadata: { isApproved: parsed.data.isApproved },
          ipAddress: req.ip,
        });

        res.json({ success: true, review });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to moderate review.' });
      }
    }
  );

  app.delete(
    '/api/v1/admin/reviews/:id',
    requireAuth,
    requirePermission('review:moderate'),
    async (req, res) => {
      try {
        const user = (req as any).user;
        await AdminReviewService.deleteReview(req.params.id);

        await AuditService.logAction({
          userId: user.id,
          action: 'REVIEW_MODERATED',
          entity: 'Review',
          entityId: req.params.id,
          metadata: { deleted: true },
          ipAddress: req.ip,
        });

        res.json({ success: true, message: 'Review deleted successfully.' });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to delete review.' });
      }
    }
  );

  // ==========================================
  // 10. SHIPPING CONFIGURATION
  // ==========================================
  app.get(
    '/api/v1/admin/shipping',
    requireAuth,
    requirePermission('shipping:read'),
    async (_req, res) => {
      try {
        const shippingConfigs = await AdminShippingService.listShippingConfigs();
        res.json({ shippingConfigs });
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve shipping configurations.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/shipping',
    requireAuth,
    requirePermission('shipping:manage'),
    async (req, res) => {
      try {
        const parsed = AdminShippingConfigSchema.safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const config = await AdminShippingService.createShippingConfig(parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'SETTINGS_CHANGED',
          entity: 'ShippingMethodConfig',
          entityId: config.id,
          metadata: { code: config.code, displayName: config.displayName, pricePence: config.pricePence },
          ipAddress: req.ip,
        });

        res.status(201).json({ success: true, config });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to create shipping configuration.' });
      }
    }
  );

  app.patch(
    '/api/v1/admin/shipping/:id',
    requireAuth,
    requirePermission('shipping:manage'),
    async (req, res) => {
      try {
        const parsed = AdminShippingConfigSchema.partial().safeParse(req.body);
        if (!parsed.success) {
          const errors = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
          return res.status(400).json({ error: 'Validation failed', errors });
        }

        const user = (req as any).user;
        const config = await AdminShippingService.updateShippingConfig(req.params.id, parsed.data);

        await AuditService.logAction({
          userId: user.id,
          action: 'SETTINGS_CHANGED',
          entity: 'ShippingMethodConfig',
          entityId: req.params.id,
          metadata: parsed.data,
          ipAddress: req.ip,
        });

        res.json({ success: true, config });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to update shipping configuration.' });
      }
    }
  );

  // ==========================================
  // 11. STORE SETTINGS
  // ==========================================
  app.get(
    '/api/v1/admin/settings',
    requireAuth,
    requirePermission('settings:read'),
    async (_req, res) => {
      try {
        const settings = await AdminStoreSettingsService.getSettings();
        res.json({ settings });
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve store settings.' });
      }
    }
  );

  app.patch(
    '/api/v1/admin/settings',
    requireAuth,
    requirePermission('settings:manage'),
    async (req, res) => {
      try {
        const user = (req as any).user;
        const settings = await AdminStoreSettingsService.updateSettings(req.body || {});

        await AuditService.logAction({
          userId: user.id,
          action: 'SETTINGS_CHANGED',
          entity: 'StoreSetting',
          entityId: 'global',
          metadata: req.body,
          ipAddress: req.ip,
        });

        res.json({ success: true, settings });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Failed to update store settings.' });
      }
    }
  );

  // ==========================================
  // 12. AUDIT LOGS
  // ==========================================
  app.get(
    '/api/v1/admin/audit-log',
    requireAuth,
    requirePermission('audit:read'),
    async (req, res) => {
      try {
        const userId = req.query.userId as string;
        const action = req.query.action as string;
        const entity = req.query.entity as string;
        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;

        const result = await AuditService.getLogs({
          userId,
          action,
          entity,
          startDate,
          endDate,
          page,
          limit,
        });

        res.json(result);
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve audit log.' });
      }
    }
  );

  // ==========================================
  // 13. NOTIFICATIONS
  // ==========================================
  const resendLimit = rateLimit({
    windowMs: 60_000,
    max: 10,
    message: 'Too many resend attempts. Please wait.',
  });

  app.get(
    '/api/v1/admin/notifications',
    requireAuth,
    requirePermission('notification:read'),
    async (req, res) => {
      try {
        const status = req.query.status as NotificationStatus | undefined;
        const eventType = req.query.eventType as NotificationEventType | undefined;
        const orderId = req.query.orderId as string | undefined;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 20;
        const result = await NotificationService.listForAdmin({ status, eventType, orderId, page, limit });
        res.json(result);
      } catch (err: any) {
        res.status(500).json({ error: 'Failed to list notifications.' });
      }
    }
  );

  app.post(
    '/api/v1/admin/notifications/:id/resend',
    requireAuth,
    requirePermission('notification:resend'),
    resendLimit,
    async (req, res) => {
      try {
        const user = (req as any).user;
        const result = await NotificationService.resend(req.params.id, user.id);

        await AuditService.logAction({
          userId: user.id,
          action: 'NOTIFICATION_MANUALLY_RESENT',
          entity: 'Notification',
          entityId: result.created?.id || req.params.id,
          metadata: {
            sourceNotificationId: result.sourceId,
            newNotificationId: result.created?.id,
            eventType: result.created?.eventType,
          },
          ipAddress: req.ip,
        });

        res.json({
          success: true,
          notification: result.created
            ? {
                id: result.created.id,
                eventType: result.created.eventType,
                status: result.created.status,
                recipient: NotificationService.maskRecipient(result.created.recipient),
                createdAt: result.created.createdAt,
              }
            : null,
        });
      } catch (err: any) {
        const message = err?.message || 'Failed to resend notification.';
        const status = message.includes('not found') ? 404 : 400;
        res.status(status).json({ error: message });
      }
    }
  );

  app.get(
    '/api/v1/admin/notifications/preview/:eventType',
    requireAuth,
    requirePermission('notification:preview'),
    async (req, res) => {
      try {
        if (process.env.NODE_ENV === 'production' && process.env.ALLOW_EMAIL_PREVIEW !== 'true') {
          return res.status(403).json({ error: 'Email preview is disabled in production.' });
        }

        const eventType = req.params.eventType as NotificationEventType;
        const allowed = Object.values(NotificationEventType);
        if (!allowed.includes(eventType)) {
          return res.status(400).json({ error: 'Unknown event type.' });
        }

        const accountEvents: NotificationEventType[] = [
          NotificationEventType.ACCOUNT_CREATED,
          NotificationEventType.PASSWORD_CHANGED,
          NotificationEventType.PASSWORD_RESET_REQUESTED,
        ];
        const isAccount = accountEvents.includes(eventType);

        const rendered = renderNotificationEmail(
          eventType,
          isAccount
            ? { kind: 'account', data: getDemoAccountContext() }
            : { kind: 'order', data: getDemoOrderContext() }
        );

        res.json({
          demo: true,
          eventType,
          subject: rendered.subject,
          html: rendered.html,
          text: rendered.text,
        });
      } catch (err: any) {
        res.status(400).json({ error: err?.message || 'Preview failed.' });
      }
    }
  );
}
