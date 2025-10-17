import { z } from 'zod';

// Restaurant query validation schema
export const restaurantQuerySchema = z.object({
    query: z.object({
        page: z.string().transform(Number).optional(),
        limit: z.string().transform(Number).optional(),
        search: z.string().optional(),
        city: z.string().optional(),
        minRating: z.string().transform(Number).optional()
    })
});

// Create restaurant validation schema
export const createRestaurantSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Restaurant name is required').max(100, 'Name too long'),
        description: z.string().max(500, 'Description too long').optional(),
        image: z.string().url('Invalid image URL').optional(),
        phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number too long'),
        email: z.string().email('Invalid email format'),
        address: z.string().min(5, 'Address is required').max(200, 'Address too long'),
        city: z.string().min(1, 'City is required').max(50, 'City name too long'),
        state: z.string().min(2, 'State is required').max(50, 'State name too long'),
        zipCode: z.string().min(5, 'ZIP code must be at least 5 digits').max(10, 'ZIP code too long'),
        country: z.string().max(50, 'Country name too long').optional(),
    })
});

// Update restaurant validation schema
// This schema is used to validate the request body for the updateRestaurant endpoint
export const updateRestaurantSchema = z.object({
    body: z.object({
    name: z.string().min(1, 'Restaurant name is required').max(100, 'Name too long').optional(),
    description: z.string().max(500, 'Description too long').optional(),
    image: z.string().url('Invalid image URL').optional(),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number too long').optional(),
    email: z.string().email('Invalid email format').optional(),
    address: z.string().min(5, 'Address is required').max(200, 'Address too long').optional(),
    city: z.string().min(1, 'City is required').max(50, 'City name too long').optional(),
    state: z.string().min(2, 'State is required').max(50, 'State name too long').optional(),
    zipCode: z.string().min(5, 'ZIP code must be at least 5 digits').max(10, 'ZIP code too long').optional(),
    country: z.string().max(50, 'Country name too long').optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    deliveryFee: z.number().min(0, 'Delivery fee cannot be negative').max(50, 'Delivery fee too high').optional(),
    minOrder: z.number().min(0, 'Minimum order cannot be negative').max(1000, 'Minimum order too high').optional(),
    estimatedTime: z.string().max(50, 'Estimated time too long').optional(),
    isActive: z.boolean().optional()
    })
});

// Restaurant ID validation schema
export const restaurantIdSchema = z.object({
    params: z.object({
    id: z.string().min(1, 'Restaurant ID is required')
    })
});