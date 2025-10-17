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
                
            ]
           }

           }
}
