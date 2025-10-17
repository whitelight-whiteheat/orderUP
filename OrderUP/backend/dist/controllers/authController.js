"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.profile = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const config_1 = require("../config");
const logger_1 = require("../config/logger");
const response_1 = require("../utils/response");
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        const existingUser = await database_1.prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            res.status(400).json(response_1.ApiResponse.error('User already exists with this email', 400));
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = await database_1.prisma.user.create({
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
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.config.jwt.refreshSecret, { expiresIn: config_1.config.jwt.refreshExpiresIn });
        logger_1.logger.info(`New user registered: ${user.email}`);
        res.status(201).json(response_1.ApiResponse.success({
            user,
            accessToken,
            refreshToken
        }, 'User registered successfully'));
    }
    catch (error) {
        logger_1.logger.error('Registration error:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error', 500));
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await database_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            res.status(401).json(response_1.ApiResponse.error('Invalid credentials', 401));
            return;
        }
        if (!user.isActive) {
            res.status(401).json(response_1.ApiResponse.error('Account is deactivated', 401));
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json(response_1.ApiResponse.error('Invalid credentials', 401));
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.config.jwt.refreshSecret, { expiresIn: config_1.config.jwt.refreshExpiresIn });
        logger_1.logger.info(`User logged in: ${user.email}`);
        res.json(response_1.ApiResponse.success({
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
    }
    catch (error) {
        logger_1.logger.error('Login error:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error', 500));
    }
};
exports.login = login;
const profile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json(response_1.ApiResponse.error('Unauthorized', 401));
            return;
        }
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
            res.status(404).json(response_1.ApiResponse.error('User not found', 404));
            return;
        }
        res.json(response_1.ApiResponse.success(user, 'Profile retrieved successfully'));
    }
    catch (error) {
        logger_1.logger.error('Profile error:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error', 500));
    }
};
exports.profile = profile;
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(401).json(response_1.ApiResponse.error('Refresh token required', 401));
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.jwt.refreshSecret);
        const user = await database_1.prisma.user.findUnique({
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
            res.status(401).json(response_1.ApiResponse.error('Invalid refresh token', 401));
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        res.json(response_1.ApiResponse.success({
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
    }
    catch (error) {
        logger_1.logger.error('Token refresh error:', error);
        res.status(401).json(response_1.ApiResponse.error('Invalid refresh token', 401));
    }
};
exports.refresh = refresh;
const logout = async (req, res) => {
    try {
        logger_1.logger.info(`User logged out: ${req.user?.email}`);
        res.json(response_1.ApiResponse.success(null, 'Logout successful'));
    }
    catch (error) {
        logger_1.logger.error('Logout error:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error', 500));
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map