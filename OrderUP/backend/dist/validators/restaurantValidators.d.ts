import { z } from 'zod';
export declare const restaurantQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
        limit: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
        search: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        minRating: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    }, "strip", z.ZodTypeAny, {
        city?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        minRating?: number | undefined;
    }, {
        city?: string | undefined;
        page?: string | undefined;
        limit?: string | undefined;
        search?: string | undefined;
        minRating?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        city?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        minRating?: number | undefined;
    };
}, {
    query: {
        city?: string | undefined;
        page?: string | undefined;
        limit?: string | undefined;
        search?: string | undefined;
        minRating?: string | undefined;
    };
}>;
export declare const createRestaurantSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        phone: z.ZodString;
        email: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
    }, {
        email: string;
        phone: string;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        phone: string;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
    };
}, {
    body: {
        email: string;
        phone: string;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
    };
}>;
export declare const updateRestaurantSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        zipCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        latitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
        deliveryFee: z.ZodOptional<z.ZodNumber>;
        minOrder: z.ZodOptional<z.ZodNumber>;
        estimatedTime: z.ZodOptional<z.ZodString>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        isActive?: boolean | undefined;
        name?: string | undefined;
        address?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
        country?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
        deliveryFee?: number | undefined;
        minOrder?: number | undefined;
        estimatedTime?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        isActive?: boolean | undefined;
        name?: string | undefined;
        address?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
        country?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
        deliveryFee?: number | undefined;
        minOrder?: number | undefined;
        estimatedTime?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email?: string | undefined;
        phone?: string | undefined;
        isActive?: boolean | undefined;
        name?: string | undefined;
        address?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
        country?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
        deliveryFee?: number | undefined;
        minOrder?: number | undefined;
        estimatedTime?: string | undefined;
    };
}, {
    body: {
        email?: string | undefined;
        phone?: string | undefined;
        isActive?: boolean | undefined;
        name?: string | undefined;
        address?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
        country?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
        deliveryFee?: number | undefined;
        minOrder?: number | undefined;
        estimatedTime?: string | undefined;
    };
}>;
export declare const restaurantIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
}, {
    params: {
        id: string;
    };
}>;
//# sourceMappingURL=restaurantValidators.d.ts.map