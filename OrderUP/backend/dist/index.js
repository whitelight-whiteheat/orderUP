"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const logger_1 = require("./config/logger");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.config.server.isDevelopment
        ? ['http://localhost:3000', 'http://localhost:3001']
        : ['https://yourdomain.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.config.rateLimit.windowMs,
    max: config_1.config.rateLimit.maxRequests,
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, morgan_1.default)('combined', { stream: logger_1.morganStream }));
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'OrderUP API is running',
        timestamp: new Date().toISOString(),
        environment: config_1.config.server.nodeEnv,
        version: '1.0.0'
    });
});
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to OrderUP API',
        version: '1.0.0',
        documentation: '/api-docs'
    });
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/restaurants', restaurantRoutes_1.default);
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
    });
});
app.use((error, req, res, next) => {
    logger_1.logger.error('Unhandled error:', error);
    res.status(error.status || 500).json({
        success: false,
        message: config_1.config.server.isDevelopment ? error.message : 'Internal server error',
        ...(config_1.config.server.isDevelopment && { stack: error.stack })
    });
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        const server = app.listen(config_1.config.server.port, () => {
            logger_1.logger.info(`🚀 Server running on port ${config_1.config.server.port}`);
            logger_1.logger.info(`📊 Environment: ${config_1.config.server.nodeEnv}`);
            logger_1.logger.info(`🔗 Health check: http://localhost:${config_1.config.server.port}/health`);
        });
        const gracefulShutdown = () => {
            logger_1.logger.info('Received shutdown signal, closing server gracefully...');
            server.close(() => {
                logger_1.logger.info('Server closed');
                process.exit(0);
            });
        };
        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map