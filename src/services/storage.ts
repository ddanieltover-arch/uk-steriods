import { Product, Category, Brand, Order, CartItem, User, Review } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANDS, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/initialData';
import { normalizeProductText } from '../lib/text/product-text';

const KEYS = {
  PRODUCTS: 'ukp_products_v6',
  CATEGORIES: 'ukp_categories_v5',
  BRANDS: 'ukp_brands_v7',
  ORDERS: 'ukp_orders_v1',
  CART: 'ukp_cart_v1',
  WISHLIST: 'ukp_wishlist_v1',
  USER: 'ukp_user_v1',
  REVIEWS: 'ukp_reviews_v1',
};

function normalizeCachedProduct(product: Product): Product {
  return {
    ...product,
    name: normalizeProductText(product.name),
    shortDescription: normalizeProductText(product.shortDescription),
    description: normalizeProductText(product.description),
  };
}

// localStorage holds only non-secret storefront cache (catalogue snapshot, cart, wishlist, current user profile).
// Do not store passwords, payment details, session secrets, or full private order payloads here.

// Helper for localStorage safely
function getItem<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error('Error reading localStorage key', key, err);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error writing localStorage key', key, err);
  }
}

export const StorageService = {
  // --- Products ---
  getProducts(): Product[] {
    return getItem<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS).map(normalizeCachedProduct);
  },
  saveProducts(products: Product[]): void {
    setItem(KEYS.PRODUCTS, products.map(normalizeCachedProduct));
  },
  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug || p.id === slug);
  },
  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  },
  saveProduct(product: Product): Product {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...product, updatedAt: new Date().toISOString() };
    } else {
      products.unshift({
        ...product,
        id: product.id || 'prod-' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    this.saveProducts(products);
    return product;
  },
  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
  },

  // --- Categories & Brands ---
  getCategories(): Category[] {
    return getItem<Category[]>(KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },
  saveCategories(categories: Category[]): void {
    setItem(KEYS.CATEGORIES, categories);
  },
  getBrands(): Brand[] {
    return getItem<Brand[]>(KEYS.BRANDS, INITIAL_BRANDS);
  },
  saveBrands(brands: Brand[]): void {
    setItem(KEYS.BRANDS, brands);
  },

  // --- Orders ---
  getOrders(): Order[] {
    return getItem<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
  },
  saveOrders(orders: Order[]): void {
    setItem(KEYS.ORDERS, orders);
  },
  getOrderByNumber(orderNumber: string): Order | undefined {
    const cleanNumber = orderNumber.trim().toUpperCase();
    return this.getOrders().find(o => o.orderNumber.toUpperCase() === cleanNumber);
  },
  getOrderByNumberAndEmail(orderNumber: string, email: string): Order | undefined {
    const cleanNumber = orderNumber.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();
    return this.getOrders().find(
      o => o.orderNumber.toUpperCase() === cleanNumber && o.customerEmail.toLowerCase() === cleanEmail
    );
  },
  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const orders = this.getOrders();
    const count = orders.length + 892106;
    const newOrderNumber = `UKP-${count}`;
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber: newOrderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    this.saveOrders(orders);

    // Deduct stock levels for ordered items
    const products = this.getProducts();
    orderData.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        prod.stockQuantity = Math.max(0, prod.stockQuantity - item.quantity);
        if (prod.stockQuantity <= 5) {
          prod.isLowStock = true;
        }
      }
    });
    this.saveProducts(products);

    return newOrder;
  },
  updateOrderStatus(orderId: string, status: Order['status'], trackingNumber?: string, trackingCarrier?: string, adminNotes?: string): Order | undefined {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      if (status === 'shipped' || status === 'delivered') {
        order.paymentStatus = 'paid';
      }
      if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;
      if (trackingCarrier !== undefined) order.trackingCarrier = trackingCarrier;
      if (adminNotes !== undefined) order.adminNotes = adminNotes;
      order.updatedAt = new Date().toISOString();
      this.saveOrders(orders);
    }
    return order;
  },

  // --- Cart Persistence ---
  getCart(): CartItem[] {
    return getItem<CartItem[]>(KEYS.CART, []);
  },
  saveCart(cart: CartItem[]): void {
    setItem(KEYS.CART, cart);
  },

  // --- Wishlist ---
  getWishlist(): string[] {
    return getItem<string[]>(KEYS.WISHLIST, []);
  },
  saveWishlist(productIds: string[]): void {
    setItem(KEYS.WISHLIST, productIds);
  },
  toggleWishlist(productId: string): string[] {
    const wishlist = this.getWishlist();
    const index = wishlist.indexOf(productId);
    let updated: string[];
    if (index >= 0) {
      updated = wishlist.filter(id => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    this.saveWishlist(updated);
    return updated;
  },

  // --- Current User Session ---
  getCurrentUser(): User | null {
    return getItem<User | null>(KEYS.USER, null);
  },
  setCurrentUser(user: User | null): void {
    setItem(KEYS.USER, user);
  },

  // --- Newsletter Subscriptions ---
  getNewsletters(): string[] {
    return getItem<string[]>('ukp_newsletters_v1', []);
  },
  saveNewsletter(email: string): boolean {
    const list = this.getNewsletters();
    const clean = email.trim().toLowerCase();
    if (!list.includes(clean)) {
      list.push(clean);
      setItem('ukp_newsletters_v1', list);
      return true;
    }
    return false;
  },

  // --- Reviews ---
  getReviews(): Review[] {
    return getItem<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
  },
  addReview(review: Omit<Review, 'id' | 'date'>): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...review,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    reviews.unshift(newReview);
    setItem(KEYS.REVIEWS, reviews);
    return newReview;
  },

  // --- Recently Viewed Products ---
  getRecentlyViewedIds(): string[] {
    return getItem<string[]>('ukp_recently_viewed_v1', []);
  },
  addRecentlyViewedId(productId: string): void {
    if (!productId) return;
    const current = this.getRecentlyViewedIds().filter((id) => id !== productId);
    current.unshift(productId);
    setItem('ukp_recently_viewed_v1', current.slice(0, 8));
  },
};
