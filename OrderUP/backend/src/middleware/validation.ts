import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ApiResponse } from '../utils/response';

// Validation middleware factory
export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        res.status(400).json(ApiResponse.error(
          'Validation failed',
          400,
          errorMessages
        ));
      } else {
        res.status(400).json(ApiResponse.error('Invalid request data', 400));
      }
    }
  };
};

// Body validation middleware
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        res.status(400).json(ApiResponse.error(
          'Validation failed',
          400,
          errorMessages
        ));
      } else {
        res.status(400).json(ApiResponse.error('Invalid request data', 400));
      }
    }
  };
};

// Query validation middleware
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        res.status(400).json(ApiResponse.error(
          'Validation failed',
          400,
          errorMessages
        ));
      } else {
        res.status(400).json(ApiResponse.error('Invalid query parameters', 400));
      }
    }
  };
};

// Params validation middleware
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        res.status(400).json(ApiResponse.error(
          'Validation failed',
          400,
          errorMessages
        ));
      } else {
        res.status(400).json(ApiResponse.error('Invalid route parameters', 400));
      }
    }
  };
};
