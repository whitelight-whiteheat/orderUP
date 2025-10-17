import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { logger } from '../config/logger';
import { ApiResponse } from '../utils/response';
import { RestaurantService } from '../services/restaurantService';
import { RestaurantQuery } from '../types/restaurant';

// Get all restaurants
export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit =10, search, city, minRating } = req.query;

        const restaurants = await RestaurantService.getRestaurants({
            page: Number(page),
            limit: Number(limit),
            search: search as string,
            city: city as string,
            minRating: minRating ? Number(minRating) : undefined
        });
        res.json(ApiResponse.success(restaurants, 'Restaurants fetched successfully'));
    } catch (error) {
        logger.error('Error fetching restaurants:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
}
};

// Get a restaurant by id
export const getRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const restaurant = await RestaurantService.getRestaurant(id);

        if (!restaurant) {
            res.status(404).json(ApiResponse.error('Restaurant not found', 404))
            return;
        }
        res.json(ApiResponse.success(restaurant, 'Restaurant fetched successfully'));
    } catch (error) {
        logger.error('Get restaurant error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
}

// Create a restaurant
export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurantData = req.body;
        const userId = (req as any).user?.userId;

        const restaurant = await RestaurantService.createRestaurant({
             ...restaurantData,
            ownerId: userId });

        logger.info(`New restaurant created: ${restaurant.name} by user ${userId}`);
        res.status(201).json(ApiResponse.success(restaurant, 'Restaurant created successfully'));
    } catch (error) {
        logger.error('Create restaurant error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
};

// Update a restaurant
export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData = req.body; // This is the data that will be used to update the restaurant
        const userId = (req as any).user?.userId;
        const userRole = (req as any).user?.role;

        const restaurant = await RestaurantService.updateRestaurant(id, updateData, userId, userRole);

        if (!restaurant) {
            res.status(404).json(ApiResponse.error('Restaurant not found or access denied', 404));
            return;
        }

        logger.info(`Restaurant updated: ${id} by user ${userId}`);
        res.json(ApiResponse.success(restaurant, 'Restaurant updated successfully'));
    } catch (error) {
        logger.error('Update restaurant error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
}

// Delete a restaurant
export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = (req as any).user?.userId;
        const userRole = (req as any).user?.role;

        const success = await RestaurantService.deleteRestaurant(id, userId, userRole);
        if (!success) {
            res.status(404).json(ApiResponse.error('Restaurant not found or access denied', 404));
            return;
    }

    logger.info(`Restaurant deleted: ${id} by user ${userId}`);
    res.json(ApiResponse.success(null, 'Restaurant deleted successfully'));
    } catch (error) {
        logger.error('Delete restaurant error:', error);
        res.status(500).json(ApiResponse.error('Internal server error'));
    }
};
