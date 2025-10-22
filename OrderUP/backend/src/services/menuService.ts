import { prisma } from '../config/database';
import { logger } from '../config/logger';
import {
    MenuItem,
    CreateMenuItemData,
    UpdateMenuItemData,
    MenuQuery,
} from '../types/menu';

    // Menu service class
export class MenuService {
    // Get all menu items with filtering and pagination
    static async getMenuItems(query: MenuQuery) {
        try {
            const { page, limit, restaurantId, search, category, isVegetarian, isVegan, isGlutenFree, isSpicy, minPrice, maxPrice } = query;
            const skip = (page - 1) * limit;

    // Build where clause for filtering
           const where: any = {};
           
           if (restaurantId) {
            where.restaurantId = restaurantId;
           }

           if (category) {
            where.category = { contains: category, mode: 'insensitive'};
           }
           if (search) {
            where.OR = [
                {name: { contains: search, mode: 'insensitive'}},
                {description: { contains: search, mode: 'insensitive'}},
            ];
           }

           if (isAvailable !== undefined) {
           where.isAvailable = isAvailable;
           }

           if (isVegetarian !== undefined) {
            where.isVegetarian = isVegetarian;
           }
           if (isVegan !== undefined) {
            where.isVegan = isVegan;
           }
           if (isSpicy !== undefined) {
            where.isSpicy = isSpicy;
           }
           if (isGlutenFree !== undefined) {
            where.isGlutenFree = isGlutenFree;
           }
           if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) where.price.gte = minPrice; {
            if (maxPrice !== undefined) where.price.lte = maxPrice;
            }
            
            // Get menu items with pagination
            const [menuItems, total] = await Promise.all([
            prisma.menu.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    restaurant: { select: { id: true, name: true, isActive: true } },
                },
            }),
            prisma.menu.count({ where }),
            ]);
         
      const pages = Math.ceil(total / limit);

      return {
        menuItems,
        pagination: {
            page,
            limit,
            total,
            pages,
        },
      };
    } catch (error) {
        logger.error('Get menu items error:', error);
        throw error;
    }
}

// Get menu item by ID
static async getMenuItem(id: string) {
    try {
        const menuItem = await prisma.menu.findUnique({
            where: { id },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        isActive: true,
                    },
                },
            },
        });
    
        if (!menuItem || menuItem.restaurant.isActive) {
            return null;
        }
        
        return menuItem;
    } catch (error) {
        logger.error('Get menu item error:', error);
        throw error;
    }
}

// Create menu item
static async createMenuItem(data: CreateMenuItemData, userId: string) {
    try {
        // Check if user owns the restaurant
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                ownerId: userId,
            },
        });

        if(!restaurant) {
            throw new Error('Restaurant not found or access denied')
        }

        const menuItem = await prisma.menu.create({
            data: {
                restaurantId: data.restaurantId,
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                isAvailable: data.isAvailable,
                isVegetarian: data.isVegetarian,
                isVegan: data.isVegan,
                isGlutenFree: data.isGlutenFree,
                isSpicy: data.isSpicy,
                calories: data.calories,
                allergens: data.allergens ?? [],
            },
            include: {
                restaurant: {
                    select:{
                        id: true,
                        name: true,
                    },
                },
            },
        });

        logger.info(`Menu item created: ${menuItem.name} for restaurant ${menuItem.restaurant.name}`);
        return menuItem;
    } catch (error) {
        logger.error('Create menu item error:', error);
        throw error;
    }
}

// Update menu item
static async updateMenuItem(id: string, data: UpdateMenuItemData, userId: string, userRole: string) {
    try {
        // Check if user can update the menu item
        const existingMenuItem = await prisma.menu.findUnique({
            where: { id },
            include: {
                restaurant: true,
            },
        });

        if(!existingMenuItem) {
            return null;
        }

        // Check ownership or admin role
        if (existingMenuItem.restaurant.ownerId !== userId && userRole !== 'ADMIN') {
            throw new Error('Access denied');
        }

        const menuItem = await prisma.menu.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name}),
                ...(data.description !== undefined && { description: data.description}),
                ...(data.image !== undefined && { image: data.image}),
                ...(data.price !== undefined && { price: data.price}),
                ...(data.category !== undefined && { category: data.category}),
                ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable}),
                ...(data.isVegetarian !== undefined && { isVegetarian: data.isVegetarian}),
                ...(data.isVegan !== undefined && { isVegan: data.isVegan}),
                ...(data.isGlutenFree !== undefined && { isGlutenFree: data.isGlutenFree}),
                ...(data.isSpicy !== undefined && { isSpicy: data.isSpicy}),
                ...(data.calories !== undefined && { calories: data.calories}),
                ...(data.allergens !== undefined && { allergens: data.allergens}),
            },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        logger.info(`Menu item updated: ${id} by ${userId}`);
        return menuItem;
    } catch (error) {
        logger.error('Update menu item error:', error);
        throw error;
    }
}


    // Delete menu item
    static async deleteMenuItem(id: string, userId: string, userRole: string) {
        try {
            // Check if user can delete the menu item
            const existingMenuItem = await prisma.menu.findUnique({
                where: { id },
                include: {
                    restaurant: true,
                },
            });

            if(!existingMenuItem) {
                return false;
            }

            // Check ownership or admin role
            if (existingMenuItem.restaurant.ownerId !== userId && userRole !== 'ADMIN') {
                throw new Error('Access denied');
            }
            
            await prisma.menu.delete({
                where: { id },
            });

            logger.info(`Menu item deleted: ${id} by ${userId}`);
            return true;
        } catch (error) {
            logger.error('Delete menu item error:', error);
            throw error;
        }
    }

    // Get menu items by restaurant
    static async getMenuItemsByRestaurant(restaurantId: string, query: Omit<MenuQuery, 'restaurantId'>) {
        try {
            return await this.getMenuItems({
                ...query,
                restaurantId,
            });
        } catch (error) {
            logger.info('Get menu items by restaurant error:', error);
            throw error;
        }
    }
}