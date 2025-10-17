"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.updateProfileSchema = exports.loginSchema = exports.registerSchema = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const database_1 = require("../config/database");
const config_1 = require("../config");
const logger_1 = require("../config/logger");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    phone: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.updateProfileSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).optional(),
    lastName: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().optional(),
    avatar: zod_1.z.string().url().optional(),
});
class UserService {
    static async register(userData) {
        try {
            const existingUser = await database_1.prisma.user.findUnique({
                where: { email: userData.email }
            });
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            const hashedPassword = await bcryptjs_1.default.hash(userData.password, 12);
            const user = await database_1.prisma.user.create({
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
            const tokens = this.generateTokens(user.id, user.email, user.role);
            logger_1.logger.info(`New user registered: ${user.email}`);
            return {
                user,
                ...tokens
            };
        }
        catch (error) {
            logger_1.logger.error('Registration error:', error);
            throw error;
        }
    }
    static async login(credentials) {
        try {
            const user = await database_1.prisma.user.findUnique({
                where: { email: credentials.email }
            });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            if (!user.isActive) {
                throw new Error('Account is deactivated');
            }
            const isPasswordValid = await bcryptjs_1.default.compare(credentials.password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }
            const tokens = this.generateTokens(user.id, user.email, user.role);
            logger_1.logger.info(`User logged in: ${user.email}`);
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
        }
        catch (error) {
            logger_1.logger.error('Login error:', error);
            throw error;
        }
    }
    static async getProfile(userId) {
        try {
            const user = await database_1.prisma.user.findUnique({
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
        }
        catch (error) {
            logger_1.logger.error('Get profile error:', error);
            throw error;
        }
    }
    static async updateProfile(userId, updateData) {
        try {
            const user = await database_1.prisma.user.update({
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
            logger_1.logger.info(`User profile updated: ${user.email}`);
            return user;
        }
        catch (error) {
            logger_1.logger.error('Update profile error:', error);
            throw error;
        }
    }
    static async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await database_1.prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('User not found');
            }
            const isCurrentPasswordValid = await bcryptjs_1.default.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                throw new Error('Current password is incorrect');
            }
            const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, 12);
            await database_1.prisma.user.update({
                where: { id: userId },
                data: { password: hashedNewPassword }
            });
            logger_1.logger.info(`Password changed for user: ${user.email}`);
            return { message: 'Password updated successfully' };
        }
        catch (error) {
            logger_1.logger.error('Change password error:', error);
            throw error;
        }
    }
    static generateTokens(userId, email, role) {
        const accessToken = jsonwebtoken_1.default.sign({ userId, email, role }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const refreshToken = jsonwebtoken_1.default.sign({ userId, email, role }, config_1.config.jwt.refreshSecret, { expiresIn: config_1.config.jwt.refreshExpiresIn });
        return {
            accessToken,
            refreshToken,
            expiresIn: config_1.config.jwt.expiresIn
        };
    }
    static async refreshToken(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.jwt.refreshSecret);
            const user = await database_1.prisma.user.findUnique({
                where: { id: decoded.userId },
                select: { id: true, email: true, role: true, isActive: true }
            });
            if (!user || !user.isActive) {
                throw new Error('Invalid refresh token');
            }
            const tokens = this.generateTokens(user.id, user.email, user.role);
            return tokens;
        }
        catch (error) {
            logger_1.logger.error('Refresh token error:', error);
            throw new Error('Invalid refresh token');
        }
    }
    static async deactivateAccount(userId) {
        try {
            await database_1.prisma.user.update({
                where: { id: userId },
                data: { isActive: false }
            });
            logger_1.logger.info(`Account deactivated: ${userId}`);
            return { message: 'Account deactivated successfully' };
        }
        catch (error) {
            logger_1.logger.error('Deactivate account error:', error);
            throw error;
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map