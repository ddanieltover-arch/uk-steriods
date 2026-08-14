import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Role } from '@prisma/client';

export interface AuthSessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export class AuthService {
  /**
   * Hashes plain text passwords securely
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Verifies password against hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generates a high-entropy guest tracking or session token
   */
  static generateSecureToken(prefix: string = 'token'): string {
    const bytes = crypto.randomBytes(24).toString('hex');
    return `${prefix}_${bytes}`;
  }

  /**
   * Sanitizes user object to strip sensitive hash before returning to client
   */
  static sanitizeUser(user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
  }): AuthSessionUser {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }
}
