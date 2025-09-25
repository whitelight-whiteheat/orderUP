import { Response } from 'express';
import { ApiResponse } from '../types';

// Success response helper
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data
  };

  return res.status(statusCode).json(response);
};

// Error response helper
export const sendError = (
  res: Response,
  message: string = 'Internal Server Error',
  statusCode: number = 500,
  error?: any
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    ...(error && { error: error.toString() })
  };

  return res.status(statusCode).json(response);
};

// Validation error response
export const sendValidationError = (
  res: Response,
  errors: any[],
  message: string = 'Validation failed'
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    error: 'Validation Error',
    data: { errors }
  };

  return res.status(400).json(response);
};

// Not found response
export const sendNotFound = (
  res: Response,
  message: string = 'Resource not found'
): Response => {
  return sendError(res, message, 404);
};

// Unauthorized response
export const sendUnauthorized = (
  res: Response,
  message: string = 'Unauthorized access'
): Response => {
  return sendError(res, message, 401);
};

// Forbidden response
export const sendForbidden = (
  res: Response,
  message: string = 'Access forbidden'
): Response => {
  return sendError(res, message, 403);
};

// Conflict response
export const sendConflict = (
  res: Response,
  message: string = 'Resource already exists'
): Response => {
  return sendError(res, message, 409);
};

// Too many requests response
export const sendTooManyRequests = (
  res: Response,
  message: string = 'Too many requests'
): Response => {
  return sendError(res, message, 429);
};

// Paginated response helper
export const sendPaginatedResponse = <T>(
  res: Response,
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  },
  message: string = 'Success'
): Response => {
  const response: ApiResponse<T[]> = {
    success: true,
    message,
    data,
    pagination
  };

  return res.status(200).json(response);
};
