"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gracefulShutdown = exports.disconnectDatabase = exports.connectDatabase = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const index_1 = require("./index");
const logger_1 = require("./logger");
exports.prisma = new client_1.PrismaClient({
    log: index_1.config.server.isDevelopment
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'],
    errorFormat: 'pretty',
});
const connectDatabase = async () => {
    try {
        await exports.prisma.$connect();
        logger_1.logger.info('Database connected successfully');
    }
    catch (error) {
        logger_1.logger.error('Failed to connect to database:', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await exports.prisma.$disconnect();
        logger_1.logger.info('Database disconnected successfully');
    }
    catch (error) {
        logger_1.logger.error('Error disconnecting from database:', error);
    }
};
exports.disconnectDatabase = disconnectDatabase;
const gracefulShutdown = async () => {
    logger_1.logger.info('Starting graceful shutdown...');
    try {
        await (0, exports.disconnectDatabase)();
        logger_1.logger.info('Graceful shutdown completed');
        process.exit(0);
    }
    catch (error) {
        logger_1.logger.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
};
exports.gracefulShutdown = gracefulShutdown;
process.on('SIGINT', exports.gracefulShutdown);
process.on('SIGTERM', exports.gracefulShutdown);
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception:', error);
    (0, exports.gracefulShutdown)();
});
process.on('unhandledRejection', (reason, promise) => {
    logger_1.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    (0, exports.gracefulShutdown)();
});
exports.default = exports.prisma;
//# sourceMappingURL=database.js.map