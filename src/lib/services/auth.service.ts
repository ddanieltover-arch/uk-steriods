import { db } from '../db';
import { AuthService, AuthSessionUser } from '../auth';
import { SessionService } from '../auth/session';
import { RegisterUserSchema, LoginUserSchema } from '../validation';
import { NotificationEventType } from '@prisma/client';
import { NotificationService } from '../notifications/notification.service';

export class AuthenticationService {
  /**
   * Registers a new customer account securely
   */
  static async register(input: unknown): Promise<{ sessionId: string; user: AuthSessionUser }> {
    const parsed = RegisterUserSchema.safeParse(input);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => i.message).join(', ');
      throw new Error(`Registration validation failed: ${issues}`);
    }

    const { email, password, firstName, lastName, phone } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    // Account enumeration protection: Generic error if account exists
    const existing = await db.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    if (existing) {
      throw new Error('Unable to create account with provided details. Please try logging in.');
    }

    // Secure password hashing
    const passwordHash = await AuthService.hashPassword(password);

    const user = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        firstName,
        lastName,
        phone: phone || null,
        role: 'CUSTOMER',
      },
    });

    const session = await SessionService.createSession(user.id);

    // Transactional welcome email — never blocks registration
    try {
      await NotificationService.enqueueAccountEvent(
        NotificationEventType.ACCOUNT_CREATED,
        {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        { idempotencyParts: [user.id] }
      );
    } catch (err) {
      console.error('[AuthenticationService] ACCOUNT_CREATED enqueue failed');
    }

    return session;
  }

  /**
   * Authenticates customer credentials and creates a session
   */
  static async login(input: unknown): Promise<{ sessionId: string; user: AuthSessionUser }> {
    const parsed = LoginUserSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error('Invalid email or password.');
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Account enumeration protection: Generic failure message
    if (!user || !user.isActive || user.deletedAt) {
      throw new Error('Invalid email or password.');
    }

    const passwordMatch = await AuthService.verifyPassword(password, user.passwordHash);
    if (!passwordMatch) {
      throw new Error('Invalid email or password.');
    }

    const session = await SessionService.createSession(user.id);
    return session;
  }

  /**
   * Ends user session on logout
   */
  static async logout(sessionId: string | undefined): Promise<void> {
    await SessionService.destroySession(sessionId);
  }

  /**
   * Retrieves active session user
   */
  static async validateSession(sessionId: string | undefined): Promise<AuthSessionUser | null> {
    return SessionService.getSessionUser(sessionId);
  }
}
