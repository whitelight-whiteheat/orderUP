import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string | undefined;
    }, {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string | undefined;
    };
}, {
    body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string | undefined;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
}, {
    body: {
        email: string;
        password: string;
    };
}>;
export declare const refreshSchema: z.ZodObject<{
    body: z.ZodObject<{
        refreshToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        refreshToken: string;
    }, {
        refreshToken: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        refreshToken: string;
    };
}, {
    body: {
        refreshToken: string;
    };
}>;
export declare const updateProfileSchema: z.ZodObject<{
    body: z.ZodObject<{
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        firstName?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
    }, {
        firstName?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        firstName?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
    };
}, {
    body: {
        firstName?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
    };
}>;
export declare const changePasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        currentPassword: z.ZodString;
        newPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        currentPassword: string;
        newPassword: string;
    }, {
        currentPassword: string;
        newPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        currentPassword: string;
        newPassword: string;
    };
}, {
    body: {
        currentPassword: string;
        newPassword: string;
    };
}>;
//# sourceMappingURL=authValidators.d.ts.map