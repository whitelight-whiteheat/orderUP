import { Response } from 'express';
export declare class ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    errors?: any;
    constructor(success: boolean, message: string, data?: T, error?: string, errors?: any);
    static success<T>(data: T, message?: string): ApiResponse<T>;
    static error(message: string, statusCode?: number, errors?: any): ApiResponse;
}
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number) => Response;
export declare const sendError: (res: Response, message?: string, statusCode?: number, error?: any) => Response;
export declare const sendValidationError: (res: Response, errors: any[], message?: string) => Response;
export declare const sendNotFound: (res: Response, message?: string) => Response;
export declare const sendUnauthorized: (res: Response, message?: string) => Response;
export declare const sendForbidden: (res: Response, message?: string) => Response;
export declare const sendConflict: (res: Response, message?: string) => Response;
export declare const sendTooManyRequests: (res: Response, message?: string) => Response;
export declare const sendPaginatedResponse: <T>(res: Response, data: T[], pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
}, message?: string) => Response;
//# sourceMappingURL=response.d.ts.map