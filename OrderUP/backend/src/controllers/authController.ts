import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { config } from '../config';
import { logger } from '../config/logger';
import { ApiResponse } from '../utils/response';

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      res.status(400).json(ApiResponse.error('User already exists with this email', 400));
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: 'CUSTOMER'
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
    );

    logger.info(`New user registered: ${user.email}`);

    res.status(201).json(ApiResponse.success({
      user,
      accessToken,
      refreshToken
    }, 'User registered successfully'));
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json(ApiResponse.error('Internal server error', 500));
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json(ApiResponse.error('Invalid credentials', 401));
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json(ApiResponse.error('Account is deactivated', 401));
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json(ApiResponse.error('Invalid credentials', 401));
      return;
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
    );

    logger.info(`User logged in: ${user.email}`);

    res.json(ApiResponse.success({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      },
      accessToken,
      refreshToken
    }, 'Login successful'));
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json(ApiResponse.error('Internal server error', 500));
  }
};

// Get user profile
export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json(ApiResponse.error('Unauthorized', 401));
      return;
    }

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
          select: {
            id: true,
            street: true,
            city: true,
            state: true,
            zipCode: true,
            country: true,
            isDefault: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) {
      res.status(404).json(ApiResponse.error('User not found', 404));
      return;
    }

    res.json(ApiResponse.success(user, 'Profile retrieved successfully'));
  } catch (error) {
    logger.error('Profile error:', error);
    res.status(500).json(ApiResponse.error('Internal server error', 500));
  }
};

// Refresh access token
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json(ApiResponse.error('Refresh token required', 401));
      return;
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as any;

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true
      }
    });

    if (!user || !user.isActive) {
      res.status(401).json(ApiResponse.error('Invalid refresh token', 401));
      return;
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
    );

    res.json(ApiResponse.success({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive
      }
    }, 'Token refreshed successfully'));
  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(401).json(ApiResponse.error('Invalid refresh token', 401));
  }
};

// Logout user (client-side token removal)
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info(`User logged out: ${(req as any).user?.email}`);
    res.json(ApiResponse.success(null, 'Logout successful'));
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json(ApiResponse.error('Internal server error', 500));
  }
};
