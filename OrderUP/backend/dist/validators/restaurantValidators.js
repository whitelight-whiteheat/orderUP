"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantIdSchema = exports.updateRestaurantSchema = exports.createRestaurantSchema = exports.restaurantQuerySchema = void 0;
const zod_1 = require("zod");
exports.restaurantQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().transform(Number).optional(),
        limit: zod_1.z.string().transform(Number).optional(),
        search: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        minRating: zod_1.z.string().transform(Number).optional()
    })
});
exports.createRestaurantSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Restaurant name is required').max(100, 'Name too long'),
        description: zod_1.z.string().max(500, 'Description too long').optional(),
        image: zod_1.z.string().url('Invalid image URL').optional(),
        phone: zod_1.z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number too long'),
        email: zod_1.z.string().email('Invalid email format'),
        address: zod_1.z.string().min(5, 'Address is required').max(200, 'Address too long'),
        city: zod_1.z.string().min(1, 'City is required').max(50, 'City name too long'),
        state: zod_1.z.string().min(2, 'State is required').max(50, 'State name too long'),
        zipCode: zod_1.z.string().min(5, 'ZIP code must be at least 5 digits').max(10, 'ZIP code too long'),
        country: zod_1.z.string().max(50, 'Country name too long').optional(),
    })
});
exports.updateRestaurantSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Restaurant name is required').max(100, 'Name too long').optional(),
        description: zod_1.z.string().max(500, 'Description too long').optional(),
        image: zod_1.z.string().url('Invalid image URL').optional(),
        phone: zod_1.z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number too long').optional(),
        email: zod_1.z.string().email('Invalid email format').optional(),
        address: zod_1.z.string().min(5, 'Address is required').max(200, 'Address too long').optional(),
        city: zod_1.z.string().min(1, 'City is required').max(50, 'City name too long').optional(),
        state: zod_1.z.string().min(2, 'State is required').max(50, 'State name too long').optional(),
        zipCode: zod_1.z.string().min(5, 'ZIP code must be at least 5 digits').max(10, 'ZIP code too long').optional(),
        country: zod_1.z.string().max(50, 'Country name too long').optional(),
        latitude: zod_1.z.number().min(-90).max(90).optional(),
        longitude: zod_1.z.number().min(-180).max(180).optional(),
        deliveryFee: zod_1.z.number().min(0, 'Delivery fee cannot be negative').max(50, 'Delivery fee too high').optional(),
        minOrder: zod_1.z.number().min(0, 'Minimum order cannot be negative').max(1000, 'Minimum order too high').optional(),
        estimatedTime: zod_1.z.string().max(50, 'Estimated time too long').optional(),
        isActive: zod_1.z.boolean().optional()
    })
});
exports.restaurantIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Restaurant ID is required')
    })
});
//# sourceMappingURL=restaurantValidators.js.map