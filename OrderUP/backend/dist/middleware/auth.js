"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOwnership = exports.optionalAuth = exports.authorize = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const database_1 = require("../config/database");
const logger_1 = require("../config/logger");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Access token required'
            });
            return;
        }
        const token = authHeader.substring(7);
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        const user = await database_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true
            }
        });
        if (!user || !user.isActive) {
            res.status(401).json({
                success: false,
                message: 'Invalid or inactive user'
            });
            return;
        }
        req.user = {
            userId: user.id,
            email: user.email,
            role: user.role
        };
        next();
    }
    catch (error) {
        logger_1.logger.error('Authentication error:', error);
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Authentication failed'
            });
        }
    }
};
exports.authenticateToken = authenticateToken;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'Insufficient permissions'
            });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            next();
            return;
        }
        const token = authHeader.substring(7);
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        const user = await database_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true
            }
        });
        if (user && user.isActive) {
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role
            };
        }
        next();
    }
    catch (error) {
        logger_1.logger.warn('Optional authentication failed:', error);
        next();
    }
};
exports.optionalAuth = optionalAuth;
const checkOwnership = (resourceUserIdField = 'userId') => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
            return;
        }
        if (req.user.role === 'ADMIN' || req.params[resourceUserIdField] === req.user.id) {
            next();
            return;
        }
        res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    };
};
exports.checkOwnership = checkOwnership;
//# sourceMappingURL=auth.js.map