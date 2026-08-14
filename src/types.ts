export type Role = 'super_admin' | 'admin' | 'staff' | 'customer';

/** Browser-safe copy of the Prisma StockStatus enum. Do not import @prisma/client in UI code. */
export const StockStatus = {
  IN_STOCK: 'IN_STOCK',
  LOW_STOCK: 'LOW_STOCK',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  DISCONTINUED: 'DISCONTINUED',
} as const;

export type StockStatus = (typeof StockStatus)[keyof typeof StockStatus];

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
  createdAt: string;
}

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county: string;
  postcode: string;
  country: string; // Default GB
  phone?: string;
}

export interface Category {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  productCount: number;
  featured?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  productCount: number;
  isFeatured?: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string; // e.g. "10ml Vial (250mg/ml)" or "100 Tablets (10mg)"
  priceGbp: number;
  stockQuantity: number;
  dosage?: string;
  volume?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  priceGbp: number;
  salePriceGbp?: number;
  stockQuantity: number;
  isPublished: boolean;
  isFeatured: boolean;
  isBestseller?: boolean;
  isLowStock?: boolean;
  ratingAvg: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  images: string[];
  tags: string[];
  purityScore?: string; // e.g. "99.4% HPLC Tested"
  variants?: ProductVariant[];
  specifications?: ProductSpecification[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  product?: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  productId?: string;
  productName?: string;
  variantName?: string;
  unitPricePence?: number;
  productImageUrl?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'awaiting_transfer' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'bank_transfer' | 'crypto_btc' | 'crypto_usdt';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  variantName?: string;
  unitPriceGbp: number;
  quantity: number;
  totalGbp: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "UKP-2026-89104"
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress?: Address;
  items: OrderItem[];
  subtotalGbp: number;
  shippingCostGbp: number;
  discountGbp: number;
  totalGbp: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentReference: string;
  shippingMethodName: string;
  trackingNumber?: string;
  trackingCarrier?: string; // Royal Mail / DPD
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface FilterState {
  searchQuery: string;
  categorySlug: string;
  brandIds: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  verifiedPurchase: boolean;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

export function formatGbp(penceOrPounds: number, isPence: boolean = true): string {
  const pounds = isPence ? penceOrPounds / 100 : penceOrPounds;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pounds);
}

