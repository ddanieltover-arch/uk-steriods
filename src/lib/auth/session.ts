import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import { AuthService, AuthSessionUser } from './index';
import { db } from '../db';

export interface SessionData {
  sessionId: string;
  userId: string;
  user: AuthSessionUser;
  createdAt: Date;
  expiresAt: Date;
}

function hashSessionToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

function generateRawSessionToken(): string {
  return `sess_${randomBytes(32).toString('hex')}`;
}

export class SessionService {
  private static SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

  /**
   * Creates a durable DB-backed session. Returns the raw token for the cookie only —
   * the database stores a SHA-256 hash, never the raw token.
   */
  static async createSession(
    userId: string,
    meta?: { userAgent?: string; ipAddress?: string }
  ): Promise<{ sessionId: string; user: AuthSessionUser }> {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        deletedAt: true,
      },
    });

    if (!user || !user.isActive || user.deletedAt) {
      throw new Error('User not found');
    }

    const sessionId = generateRawSessionToken();
    const tokenHash = hashSessionToken(sessionId);
    const expiresAt = new Date(Date.now() + this.SESSION_TTL_MS);
    const safeUser = AuthService.sanitizeUser(user);

    await db.authSession.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
        userAgent: meta?.userAgent?.slice(0, 512) || null,
        ipAddress: meta?.ipAddress?.slice(0, 64) || null,
      },
    });

    return { sessionId, user: safeUser };
  }

  /**
   * Validates a session token and returns active user or null.
   */
  static async getSessionUser(sessionId: string | undefined): Promise<AuthSessionUser | null> {
    if (!sessionId || typeof sessionId !== 'string' || sessionId.length < 16) {
      return null;
    }

    const tokenHash = hashSessionToken(sessionId);
    const session = await db.authSession.findUnique({
      where: { tokenHash },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
            deletedAt: true,
          },
        },
      },
    });

    if (!session) return null;

    if (new Date() > session.expiresAt) {
      await db.authSession.delete({ where: { id: session.id } }).catch(() => undefined);
      return null;
    }

    if (!session.user.isActive || session.user.deletedAt) {
      await db.authSession.deleteMany({ where: { userId: session.userId } }).catch(() => undefined);
      return null;
    }

    // Touch lastSeenAt occasionally (best-effort, non-blocking)
    void db.authSession
      .update({
        where: { id: session.id },
        data: { lastSeenAt: new Date() },
      })
      .catch(() => undefined);

    return AuthService.sanitizeUser(session.user);
  }

  /**
   * Destroys a single session by raw token.
   */
  static async destroySession(sessionId: string | undefined): Promise<void> {
    if (!sessionId) return;
    const tokenHash = hashSessionToken(sessionId);
    await db.authSession.deleteMany({ where: { tokenHash } });
  }

  /**
   * Destroys all sessions for a user (e.g. password change / reset).
   */
  static async destroyUserSessions(userId: string): Promise<void> {
    await db.authSession.deleteMany({ where: { userId } });
  }

  /** Test helper: constant-time compare for token hashes */
  static tokensEqual(a: string, b: string): boolean {
    const ba = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  }
}
