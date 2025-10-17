import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
export declare const validateRequest: (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateBody: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateQuery: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateParams: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.d.ts.map