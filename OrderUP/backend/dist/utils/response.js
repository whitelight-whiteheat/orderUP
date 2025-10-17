"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaginatedResponse = exports.sendTooManyRequests = exports.sendConflict = exports.sendForbidden = exports.sendUnauthorized = exports.sendNotFound = exports.sendValidationError = exports.sendError = exports.sendSuccess = exports.ApiResponse = void 0;
class ApiResponse {
    constructor(success, message, data, error, errors) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
        this.errors = errors;
    }
    static success(data, message = 'Success') {
        return new ApiResponse(true, message, data);
    }
    static error(message, statusCode = 500, errors) {
        return new ApiResponse(false, message, undefined, message, errors);
    }
}
exports.ApiResponse = ApiResponse;
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
    const response = {
        success: true,
        message,
        data
    };
    return res.status(statusCode).json(response);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message = 'Internal Server Error', statusCode = 500, error) => {
    const response = {
        success: false,
        message,
        ...(error && { error: error.toString() })
    };
    return res.status(statusCode).json(response);
};
exports.sendError = sendError;
const sendValidationError = (res, errors, message = 'Validation failed') => {
    const response = {
        success: false,
        message,
        error: 'Validation Error',
        data: { errors }
    };
    return res.status(400).json(response);
};
exports.sendValidationError = sendValidationError;
const sendNotFound = (res, message = 'Resource not found') => {
    return (0, exports.sendError)(res, message, 404);
};
exports.sendNotFound = sendNotFound;
const sendUnauthorized = (res, message = 'Unauthorized access') => {
    return (0, exports.sendError)(res, message, 401);
};
exports.sendUnauthorized = sendUnauthorized;
const sendForbidden = (res, message = 'Access forbidden') => {
    return (0, exports.sendError)(res, message, 403);
};
exports.sendForbidden = sendForbidden;
const sendConflict = (res, message = 'Resource already exists') => {
    return (0, exports.sendError)(res, message, 409);
};
exports.sendConflict = sendConflict;
const sendTooManyRequests = (res, message = 'Too many requests') => {
    return (0, exports.sendError)(res, message, 429);
};
exports.sendTooManyRequests = sendTooManyRequests;
const sendPaginatedResponse = (res, data, pagination, message = 'Success') => {
    const response = {
        success: true,
        message,
        data,
        pagination
    };
    return res.status(200).json(response);
};
exports.sendPaginatedResponse = sendPaginatedResponse;
//# sourceMappingURL=response.js.map