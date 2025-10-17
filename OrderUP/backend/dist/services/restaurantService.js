"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const database_1 = require("../config/database");
const logger_1 = require("../config/logger");
class RestaurantService {
    static async getRestaurants(query) {
        try {
            const { page, limit, search, city, minRating } = query;
            const skip = (page - 1) * limit;
            const where = {
                isActive: true
            };
            if (search) {
                where.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { city: { contains: search, mode: 'insensitive' } },
                ];
            }
            if (city) {
                where.city = { contains: city, mode: 'insensitive' };
            }
            if (minRating) {
                where.rating = { gte: minRating };
            }
            const [restaurants, total] = await Promise.all([
                database_1.prisma.restaurant.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        image: true,
                        phone: true,
                        email: true,
                        address: true,
                        city: true,
                        state: true,
                        zipCode: true,
                        country: true,
                        latitude: true,
                        longitude: true,
                        isActive: true,
                        rating: true,
                        deliveryFee: true,
                        minOrder: true,
                        estimatedTime: true,
                        createdAt: true,
                        updatedAt: true,
                        _count: {
                            select: {
                                menus: true,
                                reviews: true
                            }
                        }
                    }
                }),
                database_1.prisma.restaurant.count({ where })
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                restaurants,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            };
        }
        catch (error) {
            logger_1.logger.error('Get restaurants error:', error);
            throw error;
        }
    }
    static async getRestaurant(id) {
        try {
            const restaurant = await database_1.prisma.restaurant.findUnique({
                where: { id, isActive: true },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    phone: true,
                    email: true,
                    address: true,
                    city: true,
                    state: true,
                    zipCode: true,
                    country: true,
                    latitude: true,
                    longitude: true,
                    isActive: true,
                    rating: true,
                    deliveryFee: true,
                    minOrder: true,
                    estimatedTime: true,
                    createdAt: true,
                    updatedAt: true,
                    menus: {
                        where: { isAvailable: true },
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            image: true,
                            price: true,
                            category: true,
                            isVegetarian: true,
                            isVegan: true,
                            isGlutenFree: true,
                            isSpicy: true,
                            calories: true,
                            allergens: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                    reviews: {
                        select: {
                            id: true,
                            rating: true,
                            comment: true,
                            createdAt: true,
                            user: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                }
                            }
                        },
                        orderBy: { createdAt: 'desc' },
                        take: 10
                    },
                    _count: {
                        select: {
                            reviews: true
                        }
                    }
                }
            });
            return restaurant;
        }
        catch (error) {
            logger_1.logger.error('Get restaurant error:', error);
            throw error;
        }
    }
    static async createRestaurant(data) {
        try {
            const restaurant = await database_1.prisma.restaurant.create({
                data: {
                    name: data.name,
                    description: data.description,
                    image: data.image,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode,
                    country: data.country,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    deliveryFee: data.deliveryFee,
                    minOrder: data.minOrder,
                    estimatedTime: data.estimatedTime,
                    ownerId: data.ownerId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    phone: true,
                    email: true,
                    address: true,
                    city: true,
                    state: true,
                    zipCode: true,
                    country: true,
                    latitude: true,
                    longitude: true,
                    isActive: true,
                    rating: true,
                    deliveryFee: true,
                    minOrder: true,
                    estimatedTime: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
            logger_1.logger.info(`Restaurant created: ${restaurant.name} (${restaurant.id})`);
            return restaurant;
        }
        catch (error) {
            logger_1.logger.error('Create restaurant error:', error);
            throw error;
        }
    }
    static async updateRestaurant(id, updateData, userId, userRole) {
        try {
            const existingRestaurant = await database_1.prisma.restaurant.findUnique({
                where: { id }
            });
            if (!existingRestaurant) {
                return null;
            }
            if (userRole !== 'ADMIN' && existingRestaurant.id !== id) {
                return null;
            }
            const restaurant = await database_1.prisma.restaurant.update({
                where: { id },
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    phone: true,
                    email: true,
                    address: true,
                    city: true,
                    state: true,
                    zipCode: true,
                    country: true,
                    latitude: true,
                    longitude: true,
                    isActive: true,
                    rating: true,
                    deliveryFee: true,
                    minOrder: true,
                    estimatedTime: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
            logger_1.logger.info(`Restaurant updated: ${restaurant.name} (${restaurant.id})`);
            return restaurant;
        }
        catch (error) {
            logger_1.logger.error('Update restaurant error:', error);
            throw error;
        }
    }
    static async deleteRestaurant(id, userId, userRole) {
        try {
            const existingRestaurant = await database_1.prisma.restaurant.findUnique({
                where: { id }
            });
            if (!existingRestaurant) {
                return false;
            }
            if (userRole !== 'ADMIN' && existingRestaurant.id !== id) {
                return false;
            }
            await database_1.prisma.restaurant.update({
                where: { id },
                data: { isActive: false }
            });
            logger_1.logger.info(`Restaurant deleted: ${existingRestaurant.name} (${id})`);
            return true;
        }
        catch (error) {
            logger_1.logger.error('Delete restaurant error:', error);
            throw error;
        }
    }
    static async getRestaurantsByOwner(ownerId) {
        try {
            const restaurants = await database_1.prisma.restaurant.findMany({
                where: {
                    isActive: true
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    phone: true,
                    email: true,
                    address: true,
                    city: true,
                    state: true,
                    zipCode: true,
                    country: true,
                    isActive: true,
                    rating: true,
                    deliveryFee: true,
                    minOrder: true,
                    estimatedTime: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { createdAt: 'desc' }
            });
            return restaurants;
        }
        catch (error) {
            logger_1.logger.error('Get restaurants by owner error:', error);
            throw error;
        }
    }
}
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurantService.js.map