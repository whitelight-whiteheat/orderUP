import { Request, Response } from 'express';
import { logger } from '../config/logger';
import { ApiResponse } from '../utils/response';
import { MenuService } from '../services/menuService';
import { MenuQuery } from '../types/menu';

// Get all menu items
export const getAllMenuItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10, restaurantId, search, category, isVegetarian, isVegan, isGlutenFree, isSpicy, minPrice, maxPrice } = req.query;

        const result = await MenuService.getMenuItems({
            page: Number(page),
            limit: Number(limit),
            restaurantId: restaurantId as string,
            search: search as string,
            category: category as string,
            isVegetarian: isVegetarian === 'true',
            isVegan: isVegan === 'true',
            isGlutenFree: isGlutenFree === 'true',
            isSpicy: isSpicy === 'true',
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
        });

        res.json(ApiResponse.success(result, 'Menu items fetched successfully'));
    } catch (error) {
        logger.error('Get all menu items error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
};

// Get menu item by ID
export const getMenuItemById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const menuItem = await MenuService.getMenuItem(id);

        if (!menuItem) {
            res.status(404).json(ApiResponse.error('Menu item not found', 404));
            return;
        }

        res.json(ApiResponse.success(menuItem, 'Menu item fetched successfully'));
    } catch (error) {
        logger.error('Get menu item by ID error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
};

// Create menu item
export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuData = req.body;
        const userId = (req as any).user?.userId;

        const menuItem = await MenuService.createMenuItem(menuData, userId);

        logger.info(`New menu item created: ${menuItem.name} by user ${userId}`);
        res.status(201).json(ApiResponse.success(menuItem, 'Menu item created successfully'));
    } catch (error) {
        logger.error('Create menu item error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
};

// Update menu item
export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const userId = (req as any).user?.userId;
        const userRole = (req as any).user?.role;

        const menuItem = await MenuService.updateMenuItem(id, updateData, userId, userRole);

        if (!menuItem) {
            res.status(404).json(ApiResponse.error('Menu item not found or access denied', 404));
            return;
        }

        logger.info(`Menu item updated: ${id} by user ${userId}`);
        res.json(ApiResponse.success(menuItem, 'Menu item updated successfully'));
    } catch (error) {
        logger.error('Update menu item error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
};

// Delete menu item
export const deleteMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = (req as any).user?.userId;
        const userRole = (req as any).user?.role;

        const success = await MenuService.deleteMenuItem(id, userId, userRole);

        if (!success) {
            res.status(404).json(ApiResponse.error('Menu item not found or access denied', 404));
            return;
    }

    logger.info(`Menu item deleted: ${id} by user ${userId}`);
    res.json(ApiResponse.success(null, 'Menu item deleted successfully'));
    } catch (error) {
        logger.error('Delete menu item error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
};

// Get menu items by restaurant
export const getMenuItemsByRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantId } = req.params;
        const { page = 1, limit = 10, search, category, isVegetarian, isVegan, isGlutenFree, isSpicy, minPrice, maxPrice } = req.query;

        const result = await MenuService.getMenuItemsByRestaurant(restaurantId, {
            page: Number(page),
            limit: Number(limit),
            search: search as string,
            category: category as string,
            isVegetarian: isVegetarian === 'true',
            isVegan: isVegan === 'true',
            isGlutenFree: isGlutenFree === 'true',
            isSpicy: isSpicy === 'true',
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
        });

        res.json(ApiResponse.success(result, 'Menu items fetched successfully'));
    } catch (error) {
        logger.error('Get menu items by restaurant error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
};