import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
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
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const updateProfileSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    avatar?: string | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    avatar?: string | undefined;
}>;
export declare class UserService {
    static register(userData: z.infer<typeof registerSchema>): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            id: string;
            avatar: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
    static login(credentials: z.infer<typeof loginSchema>): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            avatar: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: true;
            createdAt: Date;
        };
    }>;
    static getProfile(userId: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        addresses: {
            id: string;
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        }[];
    }>;
    static updateProfile(userId: string, updateData: z.infer<typeof updateProfileSchema>): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        isActive: boolean;
        updatedAt: Date;
    }>;
    static changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    private static generateTokens;
    static refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: string;
    }>;
    static deactivateAccount(userId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=userService.d.ts.map