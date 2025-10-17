import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../config/database';
import { config } from '../config';
import { logger } from '../config/logger';

// Validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
});

// User service class
export class UserService {
  // Register new user
  static async register(userData: z.infer<typeof registerSchema>) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          avatar: true,
          role: true,
          isActive: true,
          createdAt: true,
        }
      });

      // Generate tokens
      const tokens = this.generateTokens(user.id, user.email, user.role);

      logger.info(`New user registered: ${user.email}`);

      return {
        user,
        ...tokens
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  static async login(credentials: z.infer<typeof loginSchema>) {
    try {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email: credentials.email }
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate tokens
      const tokens = this.generateTokens(user.id, user.email, user.role);

      logger.info(`User logged in: ${user.email}`);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
        },
        ...tokens
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  // Get user profile
  static async getProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          avatar: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          addresses: {
            where: { isDefault: true },
            select: {
              id: true,
              street: true,
              city: true,
              state: true,
              zipCode: true,
              country: true,
            }
          }
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      logger.error('Get profile error:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(userId: string, updateData: z.infer<typeof updateProfileSchema>) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          avatar: true,
          role: true,
          isActive: true,
          updatedAt: true,
        }
      });

      logger.info(`User profile updated: ${user.email}`);

      return user;
    } catch (error) {
      logger.error('Update profile error:', error);
      throw error;
    }
  }

  // Change password
  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isCurrentPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword }
      });

      logger.info(`Password changed for user: ${user.email}`);

      return { message: 'Password updated successfully' };
    } catch (error) {
      logger.error('Change password error:', error);
      throw error;
    }
  }

  // Generate JWT tokens
  private static generateTokens(userId: string, email: string, role: string) {
    const accessToken = jwt.sign(
      { userId, email, role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId, email, role },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: config.jwt.expiresIn
    };
  }

  // Refresh access token
  static async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as any;
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, role: true, isActive: true }
      });

      if (!user || !user.isActive) {
        throw new Error('Invalid refresh token');
      }

      const tokens = this.generateTokens(user.id, user.email, user.role);

      return tokens;
    } catch (error) {
      logger.error('Refresh token error:', error);
      throw new Error('Invalid refresh token');
    }
  }

  // Deactivate user account
  static async deactivateAccount(userId: string) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { isActive: false }
      });

      logger.info(`Account deactivated: ${userId}`);

      return { message: 'Account deactivated successfully' };
    } catch (error) {
      logger.error('Deactivate account error:', error);
      throw error;
    }
  }
}
