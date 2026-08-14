import { db } from '../db';
import { AuthService } from '../auth';

export class CartService {
  /**
   * Retrieves or creates a cart for user or guest
   */
  static async getOrCreateCart(userId?: string, guestSessionToken?: string) {
    if (userId) {
      let cart = await db.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                include: { images: true },
              },
              variant: true,
            },
          },
        },
      });

      if (!cart) {
        cart = await db.cart.create({
          data: { userId },
          include: {
            items: {
              include: {
                product: { include: { images: true } },
                variant: true,
              },
            },
          },
        });
      }
      return cart;
    }

    const token = guestSessionToken || AuthService.generateSecureToken('guest_cart');
    let cart = await db.cart.findUnique({
      where: { guestSessionToken: token },
      include: {
        items: {
          include: {
            product: { include: { images: true } },
            variant: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { guestSessionToken: token },
        include: {
          items: {
            include: {
              product: { include: { images: true } },
              variant: true,
            },
          },
        },
      });
    }

    return cart;
  }

  /**
   * Adds item to cart enforcing strict uniqueness for (productId + variantId)
   */
  static async addItem(cartId: string, productId: string, variantId?: string, qty: number = 1) {
    // Find matching existing cart item considering nullable variantId
    const existingItems = await db.cartItem.findMany({
      where: {
        cartId,
        productId,
      },
    });

    const matchingItem = existingItems.find((item) => {
      if (variantId) return item.variantId === variantId;
      return item.variantId === null || item.variantId === undefined;
    });

    if (matchingItem) {
      return db.cartItem.update({
        where: { id: matchingItem.id },
        data: { quantity: matchingItem.quantity + qty },
      });
    } else {
      return db.cartItem.create({
        data: {
          cartId,
          productId,
          variantId: variantId || null,
          quantity: qty,
        },
      });
    }
  }

  /**
   * Merges guest cart into authenticated user cart upon login
   */
  static async mergeGuestCart(userId: string, guestSessionToken: string) {
    const guestCart = await db.cart.findUnique({
      where: { guestSessionToken },
      include: { items: true },
    });

    if (!guestCart || guestCart.items.length === 0) return;

    const userCart = await this.getOrCreateCart(userId);

    for (const item of guestCart.items) {
      await this.addItem(userCart.id, item.productId, item.variantId || undefined, item.quantity);
    }

    // Clean up guest cart after merging
    await db.cart.delete({ where: { id: guestCart.id } });
  }
}
