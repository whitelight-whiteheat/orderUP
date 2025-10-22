import z from 'zod';

// Menu query validation schema
export const menuQuerySchema = z.object({
    query: z.object({
        page: z.string().transform(Number).optional(),
        limit: z.string().transform(Number).optional(),
        restaurantId: z.string().optional(),
        search: z.string().optional(),
        category: z.string().optional(),
        isAvailable: z.string().transform(val => val === 'true').optional(),
        isVegetarian: z.string().transform(val => val === 'true').optional(),
        isVegan: z.string().transform(val => val === 'true').optional(),
        isGlutenFree: z.string().transform(val => val === 'true').optional(),
        isSpicy: z.string().transform(val => val === 'true').optional(),
        minPrice: z.string().transform(Number).optional(),
        maxPrice: z.string().transform(Number).optional(),
    })
});

// Menu item validation schema
export const createMenuItemSchema = z.object({
    body: z.object({
        restaurantId: z.string().min(1, 'Restaurant ID is required'),
        name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
        description: z.string().max(500, 'Description too long').optional(),
        image: z.string().url('Invalid image URL').optional(),
        price: z.number().min(0, 'Price cannot be negative'),
        category: z.string().min(1, 'Category is required').max(50, 'Category too long'),
        isAvailable: z.boolean().optional(),
        isVegetarian: z.boolean().optional(),
        isVegan: z.boolean().optional(),
        isGlutenFree: z.boolean().optional(),
        isSpicy: z.boolean().optional(),
        calories: z.number().min(0, 'Calories cannot be negative').max(10000, 'Calories cannot be greater than 10000').optional(),
        allergens: z.array(z.string()).optional(),
    })
});

// Update menu item validation schema
export const updateMenuItemSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
        description: z.string().max(500, 'Description too long').optional(),
        image: z.string().url('Invalid image URL').optional(),
        price: z.number().min(0, 'Price cannot be negative').optional(),
        category: z.string().min(1, 'Category is required').max(50, 'Category too long').optional(),
        isAvailable: z.boolean().optional(),
        isVegetarian: z.boolean().optional(),
        isVegan: z.boolean().optional(),
        isGlutenFree: z.boolean().optional(),
        isSpicy: z.boolean().optional(),
        calories: z.number().min(0, 'Calories cannot be negative').optional(),
        allergens: z.array(z.string()).optional(),
    })
});

// Menu item ID validation schema
export const menuItemIdSchema = z.object({
    params: z.object({
        id: z.string().min(1, 'Menu item ID is required'),
    }),
});

// Restaurant ID validation schema
export const restaurantIdSchema = z.object({
    params: z.object({
        restaurantId: z.string().min(1, 'Restaurant ID is required'),
    }),
    query: z.object({
        page: z.string().transform(Number).optional(),
        limit: z.string().transform(Number).optional(),
        search: z.string().optional(),
        category: z.string().optional(),
        isAvailable: z.string().transform(val => val === 'true').optional(),
        isVegetarian: z.string().transform(val => val === 'true').optional(),
        isVegan: z.string().transform(val => val === 'true').optional(),
        isGlutenFree: z.string().transform(val => val === 'true').optional(),
        isSpicy: z.string().transform(val => val === 'true').optional(),
        minPrice: z.string().transform(Number).optional(),
        maxPrice: z.string().transform(Number).optional(),
    })
});

// Menu items by restaurant validation schema
export const menuItemsByRestaurantSchema = z.object({
    params: z.object({
        restaurantId: z.string().uuid('Invalid restaurant ID'),
    }),
    query: z.object({
        page: z.string().transform(Number).optional(),
        limit: z.string().transform(Number).optional(),
        search: z.string().optional(),
        category: z.string().optional(),
        isVegetarian: z.string().optional(),
        isVegan: z.string().optional(),
        isGlutenFree: z.string().optional(),
        isSpicy: z.string().optional(),
        minPrice: z.string().transform(Number).optional(),
        maxPrice: z.string().transform(Number).optional(),
    })
});