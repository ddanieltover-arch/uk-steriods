import { z } from 'zod';

// Order Shipping & Billing Address Schema
export const AddressSnapshotSchema = z.object({
  recipient: z.string().min(2, 'Recipient name is required'),
  line1: z.string().min(3, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  county: z.string().optional(),
  postcode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, 'Invalid UK postcode format'),
  country: z.string().default('UK'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address'),
});

export type AddressSnapshot = z.infer<typeof AddressSnapshotSchema>;

// User Authentication Schemas
export const RegisterUserSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().optional(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().optional(),
  })
  .refine((data) => !data.confirmPassword || data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const LoginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const SavedAddressSchema = z.object({
  recipient: z.string().min(2, 'Recipient name is required'),
  line1: z.string().min(3, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  county: z.string().optional(),
  postcode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, 'Invalid UK postcode format'),
  country: z.string().default('UK'),
  phone: z.string().optional(),
  isDefault: z.boolean().optional().default(false),
});

export type SavedAddressInput = z.infer<typeof SavedAddressSchema>;

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password confirmation is required'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const TrackOrderSchema = z.object({
  orderNumber: z.string().min(3, 'Order number is required'),
  trackingToken: z.string().min(6, 'Tracking token is required'),
});

// Cart Action Schema
export const AddToCartSchema = z.object({
  cartId: z.string().optional(),
  guestSessionToken: z.string().optional(),
  productId: z.string().uuid('Invalid product ID'),
  variantId: z.string().uuid('Invalid variant ID').optional(),
  quantity: z.number().int().positive('Quantity must be at least 1'),
});

// Checkout Submission Schema
export const CheckoutSchema = z.object({
  cartId: z.string().uuid('Invalid cart ID'),
  guestEmail: z.string().email('Email is required for receipt and tracking').optional(),
  shippingAddress: AddressSnapshotSchema,
  billingAddress: AddressSnapshotSchema,
  paymentMethod: z.enum(['BANK_TRANSFER', 'CARD', 'CRYPTO']).default('BANK_TRANSFER'),
  discountCode: z.string().optional(),
});

// Discount Validation Schema
export const ApplyDiscountSchema = z.object({
  code: z.string().min(1, 'Discount code required'),
  subtotalPence: z.number().int().nonnegative(),
});

// Catalogue Query & Search Schema
export const CatalogueSortOptions = z.enum([
  'featured',
  'newest',
  'price_asc',
  'price_desc',
  'name_asc',
  'name_desc',
  'bestselling',
]);

export const CatalogueQuerySchema = z.object({
  search: z.string().optional().default(''),
  category: z.string().optional().default(''),
  brand: z.string().optional().default(''),
  brandIds: z.array(z.string()).optional().default([]),
  minPrice: z.number().nonnegative().optional().default(0),
  maxPrice: z.number().nonnegative().optional().default(1000),
  availability: z.enum(['all', 'in_stock', 'on_sale']).optional().default('all'),
  tags: z.array(z.string()).optional().default([]),
  sort: CatalogueSortOptions.optional().default('featured'),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().min(1).max(48).optional().default(12),
});

export type CatalogueQuery = z.infer<typeof CatalogueQuerySchema>;

export const CatalogueSearchQuerySchema = z.object({
  q: z.string().trim().min(2, 'Search query must be at least 2 characters').max(80, 'Search query is too long'),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(48).optional().default(24),
});

export const CatalogueSuggestionQuerySchema = z.object({
  q: z.string().trim().min(2, 'Query must be at least 2 characters').max(80, 'Query is too long'),
});

// ==========================================
// ADMIN MUTATION & VALIDATION SCHEMAS
// ==========================================

export const AdminProductVariantSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(2, 'SKU must be at least 2 characters'),
  name: z.string().min(1, 'Variant name is required'),
  pricePence: z.number().int().positive('Variant price must be greater than 0'),
  attributes: z.record(z.string(), z.string()).optional().default({}),
  quantity: z.number().int().min(0).optional().default(0),
});

export const AdminProductImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url('Invalid image URL'),
  altText: z.string().optional().default(''),
  isPrimary: z.boolean().optional().default(false),
  displayOrder: z.number().int().min(0).optional().default(0),
});

export const AdminProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2, 'Valid slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  sku: z.string().min(2, 'Valid SKU is required'),
  description: z.string().min(5, 'Description is required'),
  shortDescription: z.string().min(5, 'Short description is required'),
  basePricePence: z.number().int().positive('Price must be greater than 0'),
  isPublished: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  hasVariants: z.boolean().optional().default(false),
  brandId: z.string().uuid('Valid Brand ID is required'),
  categoryId: z.string().uuid('Valid Category ID is required'),
  images: z.array(AdminProductImageSchema).optional().default([]),
  variants: z.array(AdminProductVariantSchema).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  initialQuantity: z.number().int().min(0).optional().default(0),
});

export type AdminProductInput = z.infer<typeof AdminProductSchema>;

export const AdminCategorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  slug: z.string().min(2, 'Valid slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().optional().default(''),
  imageUrl: z.string().url().optional().or(z.literal('')),
  parentId: z.string().uuid().nullable().optional(),
});

export type AdminCategoryInput = z.infer<typeof AdminCategorySchema>;

export const AdminBrandSchema = z.object({
  name: z.string().min(2, 'Brand name is required'),
  slug: z.string().min(2, 'Valid slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().optional().default(''),
  logoUrl: z.string().url().optional().or(z.literal('')),
  isFeatured: z.boolean().optional().default(false),
});

export type AdminBrandInput = z.infer<typeof AdminBrandSchema>;

export const AdminInventoryAdjustmentSchema = z.object({
  productId: z.string().uuid().optional(),
  variantId: z.string().uuid().optional(),
  adjustment: z.number().int().refine((val) => val !== 0, 'Adjustment cannot be zero'),
  reason: z.enum(['RESTOCK', 'DAMAGE', 'CORRECTION', 'RETURN', 'OTHER']),
  reference: z.string().optional().default(''),
}).refine((data) => data.productId || data.variantId, {
  message: 'Either productId or variantId must be provided',
});

export type AdminInventoryAdjustmentInput = z.infer<typeof AdminInventoryAdjustmentSchema>;

export const AdminOrderStatusUpdateSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']),
  note: z.string().optional(),
});

export const AdminPaymentStatusUpdateSchema = z.object({
  paymentStatus: z.enum(['PENDING', 'AWAITING_TRANSFER', 'PAID', 'FAILED', 'REFUNDED']),
  note: z.string().optional(),
});

export const AdminShipmentUpdateSchema = z.object({
  provider: z.string().min(1, 'Provider is required'),
  shippingMethod: z.string().min(1, 'Shipping method is required'),
  trackingNumber: z.string().min(1, 'Tracking number is required'),
  status: z.enum(['PENDING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'FAILED_DELIVERY', 'RETURNED']).optional().default('DISPATCHED'),
  estimatedDeliveryAt: z.string().optional(),
});

export const AdminCustomerRoleUpdateSchema = z.object({
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'STAFF', 'CUSTOMER']),
});

export const AdminDiscountSchema = z.object({
  code: z.string().min(2, 'Discount code must be at least 2 characters').toUpperCase(),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']),
  valuePenceOrPercent: z.number().int().positive('Value must be positive'),
  minOrderPence: z.number().int().min(0).optional().default(0),
  maxUses: z.number().int().positive().nullable().optional(),
  startsAt: z.string().or(z.date()),
  endsAt: z.string().or(z.date()).nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export const AdminModerateReviewSchema = z.object({
  isApproved: z.boolean(),
});

export const AdminShippingConfigSchema = z.object({
  code: z.string().min(2, 'Method code required'),
  displayName: z.string().min(2, 'Display name required'),
  description: z.string().optional().default(''),
  pricePence: z.number().int().min(0, 'Price must be non-negative'),
  freeThresholdPence: z.number().int().min(0).nullable().optional(),
  minDeliveryDays: z.number().int().positive().default(1),
  maxDeliveryDays: z.number().int().positive().default(3),
  countryCode: z.string().default('GB'),
  isActive: z.boolean().optional().default(true),
});

export const AdminStoreSettingSchema = z.object({
  key: z.string().min(1, 'Setting key is required'),
  value: z.string(),
});

export const AdminBlogCategorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  slug: z.string().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const AdminBlogPostSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().optional(),
  excerpt: z.string().min(10, 'Excerpt is required'),
  bodyMarkdown: z.string().min(20, 'Body is required'),
  coverImageUrl: z.string().optional().nullable(),
  authorName: z.string().min(2, 'Author is required'),
  authorBio: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional().default('DRAFT'),
  featured: z.boolean().optional().default(false),
  publishedAt: z.string().nullable().optional(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  faq: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional()
    .default([]),
  categoryIds: z.array(z.string().uuid()).optional().default([]),
  productIds: z.array(z.string().uuid()).optional().default([]),
});


