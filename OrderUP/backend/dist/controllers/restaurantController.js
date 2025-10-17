"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getRestaurant = exports.getRestaurants = void 0;
const logger_1 = require("../config/logger");
const response_1 = require("../utils/response");
const restaurantService_1 = require("../services/restaurantService");
const getRestaurants = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, city, minRating } = req.query;
        const restaurants = await restaurantService_1.RestaurantService.getRestaurants({
            page: Number(page),
            limit: Number(limit),
            search: search,
            city: city,
            minRating: minRating ? Number(minRating) : undefined
        });
        res.json(response_1.ApiResponse.success(restaurants, 'Restaurants fetched successfully'));
    }
    catch (error) {
        logger_1.logger.error('Error fetching restaurants:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error'));
    }
};
exports.getRestaurants = getRestaurants;
const getRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await restaurantService_1.RestaurantService.getRestaurant(id);
        if (!restaurant) {
            res.status(404).json(response_1.ApiResponse.error('Restaurant not found', 404));
            return;
        }
        res.json(response_1.ApiResponse.success(restaurant, 'Restaurant fetched successfully'));
    }
    catch (error) {
        logger_1.logger.error('Get restaurant error:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error'));
    }
};
exports.getRestaurant = getRestaurant;
const createRestaurant = async (req, res) => {
    try {
        const restaurantData = req.body;
        const userId = req.user?.userId;
        const restaurant = await restaurantService_1.RestaurantService.createRestaurant({
            ...restaurantData,
            ownerId: userId
        });
        logger_1.logger.info(`New restaurant created: ${restaurant.name} by user ${userId}`);
        res.status(201).json(response_1.ApiResponse.success(restaurant, 'Restaurant created successfully'));
    }
    catch (error) {
        logger_1.logger.error('Create restaurant error:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error'));
    }
};
exports.createRestaurant = createRestaurant;
const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const userId = req.user?.userId;
        const userRole = req.user?.role;
        const restaurant = await restaurantService_1.RestaurantService.updateRestaurant(id, updateData, userId, userRole);
        if (!restaurant) {
            res.status(404).json(response_1.ApiResponse.error('Restaurant not found or access denied', 404));
            return;
        }
        logger_1.logger.info(`Restaurant updated: ${id} by user ${userId}`);
        res.json(response_1.ApiResponse.success(restaurant, 'Restaurant updated successfully'));
    }
    catch (error) {
        logger_1.logger.error('Update restaurant error:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error'));
    }
};
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const userRole = req.user?.role;
        const success = await restaurantService_1.RestaurantService.deleteRestaurant(id, userId, userRole);
        if (!success) {
            res.status(404).json(response_1.ApiResponse.error('Restaurant not found or access denied', 404));
            return;
        }
        logger_1.logger.info(`Restaurant deleted: ${id} by user ${userId}`);
        res.json(response_1.ApiResponse.success(null, 'Restaurant deleted successfully'));
    }
    catch (error) {
        logger_1.logger.error('Delete restaurant error:', error);
        res.status(500).json(response_1.ApiResponse.error('Internal server error'));
    }
};
exports.deleteRestaurant = deleteRestaurant;
//# sourceMappingURL=restaurantController.js.map