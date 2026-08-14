import { db } from '../db';
import { AuthService, AuthSessionUser } from '../auth';
import { SessionService } from '../auth/session';
import { UpdateProfileSchema, ChangePasswordSchema } from '../validation';
import { NotificationEventType } from '@prisma/client';
import { NotificationService } from '../notifications/notification.service';

export class AccountService {
  /**
   * Retrieves full customer profile summary (without sensitive fields)
   */
  static async getProfile(userId: string) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        addresses: {
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
        },
        _count: {
          select: {
            orders: true,
            addresses: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User profile not found.');
    }

    // Get count of wishlist items
    const wishlist = await db.wishlist.findUnique({
      where: { userId },
      include: {
        _count: {
          select: { items: true },
        },
      },
    });

    const wishlistCount = wishlist?._count.items || 0;

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        emailVerified: !!user.emailVerified,
        createdAt: user.createdAt,
      },
      orderCount: user._count.orders,
      addressCount: user._count.addresses,
      wishlistCount,
      defaultAddress: user.addresses.find((a) => a.isDefault) || user.addresses[0] || null,
    };
  }

  /**
   * Updates customer profile
   */
  static async updateProfile(userId: string, input: unknown): Promise<AuthSessionUser> {
    const parsed = UpdateProfileSchema.safeParse(input);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => i.message).join(', ');
      throw new Error(`Invalid profile data: ${issues}`);
    }

    const { firstName, lastName, phone, email } = parsed.data;

    const currentUser = await db.user.findUnique({ where: { id: userId } });
    if (!currentUser) throw new Error('User not found.');

    const emailChanged = email && email.toLowerCase() !== currentUser.email.toLowerCase();

    if (emailChanged) {
      const existingEmail = await db.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (existingEmail && existingEmail.id !== userId) {
        throw new Error('Email address is already registered.');
      }
    }

    const updated = await db.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone: phone || null,
        ...(emailChanged ? { email: email.toLowerCase(), emailVerified: null } : {}),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    return AuthService.sanitizeUser(updated);
  }

  /**
   * Updates customer password and invalidates sessions
   */
  static async changePassword(userId: string, input: unknown): Promise<{ success: boolean; message: string }> {
    const parsed = ChangePasswordSchema.safeParse(input);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => i.message).join(', ');
      throw new Error(`Password change failed: ${issues}`);
    }

    const { currentPassword, newPassword } = parsed.data;

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found.');

    const isMatch = await AuthService.verifyPassword(currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new Error('Current password is incorrect.');
    }

    const newHash = await AuthService.hashPassword(newPassword);

    await db.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    // Invalidate sessions for security
    await SessionService.destroyUserSessions(userId);

    try {
      await NotificationService.enqueueAccountEvent(
        NotificationEventType.PASSWORD_CHANGED,
        {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          changedAt: new Date().toISOString(),
        },
        { idempotencyParts: [user.id, String(Date.now())] }
      );
    } catch {
      /* never block password change */
    }

    return { success: true, message: 'Password changed successfully. Please log in with your new password.' };
  }
}
