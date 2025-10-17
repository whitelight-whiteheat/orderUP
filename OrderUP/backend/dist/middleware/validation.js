"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateBody = exports.validateRequest = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessages = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                res.status(400).json(response_1.ApiResponse.error('Validation failed', 400, errorMessages));
            }
            else {
                res.status(400).json(response_1.ApiResponse.error('Invalid request data', 400));
            }
        }
    };
};
exports.validateRequest = validateRequest;
const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessages = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                res.status(400).json(response_1.ApiResponse.error('Validation failed', 400, errorMessages));
            }
            else {
                res.status(400).json(response_1.ApiResponse.error('Invalid request data', 400));
            }
        }
    };
};
exports.validateBody = validateBody;
const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessages = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                res.status(400).json(response_1.ApiResponse.error('Validation failed', 400, errorMessages));
            }
            else {
                res.status(400).json(response_1.ApiResponse.error('Invalid query parameters', 400));
            }
        }
    };
};
exports.validateQuery = validateQuery;
const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            req.params = schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessages = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                res.status(400).json(response_1.ApiResponse.error('Validation failed', 400, errorMessages));
            }
            else {
                res.status(400).json(response_1.ApiResponse.error('Invalid route parameters', 400));
            }
        }
    };
};
exports.validateParams = validateParams;
//# sourceMappingURL=validation.js.map