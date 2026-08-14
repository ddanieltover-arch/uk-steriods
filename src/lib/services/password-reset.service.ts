import crypto from 'crypto';
import { NotificationEventType } from '@prisma/client';
import { db } from '../db';
import { AuthService } from '../auth';
import { SessionService } from '../auth/session';
import { NotificationService } from '../notifications/notification.service';
import { getSiteOrigin } from '../seo/site';
import { isValidEmail } from '../notifications/notification.types';

const RESET_TTL_MS = 30 * 60 * 1000; // 30 minutes
const GENERIC_RESPONSE =
  'If an account exists for this email address, password reset instructions will be sent.';

function hashToken(rawToken: string): string {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

export class PasswordResetService {
  /**
   * Always returns a generic message (no account enumeration).
   */
  static async requestReset(emailRaw: string): Promise<{ message: string }> {
    const email = (emailRaw || '').trim().toLowerCase();
    if (!isValidEmail(email)) {
      return { message: GENERIC_RESPONSE };
    }

    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, firstName: true, lastName: true, isActive: true, deletedAt: true },
    });

    if (!user || !user.isActive || user.deletedAt) {
      return { message: GENERIC_RESPONSE };
    }

    const rawToken = AuthService.generateSecureToken('pwr');
    const tokenHash = hashToken(rawToken);

    await db.$transaction(async (tx) => {
      // Invalidate prior unused tokens
      await tx.passwordResetToken.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      });

      await tx.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt: new Date(Date.now() + RESET_TTL_MS),
        },
      });
    });

    const resetUrl = `${getSiteOrigin()}/reset-password?token=${encodeURIComponent(rawToken)}`;

    try {
      await NotificationService.enqueueAccountEvent(
        NotificationEventType.PASSWORD_RESET_REQUESTED,
        {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          resetUrl,
        },
        {
          // Allow a new request periodically; key by minute bucket to limit spam while permitting retries
          idempotencyParts: [user.id, String(Math.floor(Date.now() / 60_000))],
        }
      );
    } catch (err) {
      console.error('[PasswordResetService] enqueue failed');
    }

    return { message: GENERIC_RESPONSE };
  }

  static async resetPassword(rawToken: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    if (!rawToken || typeof rawToken !== 'string') {
      throw new Error('Invalid or expired reset token.');
    }
    if (!newPassword || newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters.');
    }

    const tokenHash = hashToken(rawToken);
    const record = await db.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
      throw new Error('Invalid or expired reset token.');
    }

    const passwordHash = await AuthService.hashPassword(newPassword);

    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: record.userId },
        data: { passwordHash },
      });
      await tx.passwordResetToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      });
      // Invalidate any other outstanding tokens
      await tx.passwordResetToken.updateMany({
        where: { userId: record.userId, usedAt: null },
        data: { usedAt: new Date() },
      });
    });

    await SessionService.destroyUserSessions(record.userId);

    try {
      await NotificationService.enqueueAccountEvent(
        NotificationEventType.PASSWORD_CHANGED,
        {
          userId: record.userId,
          email: record.user.email,
          firstName: record.user.firstName,
          lastName: record.user.lastName,
          changedAt: new Date().toISOString(),
        },
        { idempotencyParts: [record.userId, record.id] }
      );
    } catch {
      /* never block password reset on notification */
    }

    return { success: true, message: 'Password updated. Please sign in with your new password.' };
  }
}
