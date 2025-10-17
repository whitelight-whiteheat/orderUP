import { prisma } from '../config/database';
import { logger } from '../config/logger';
import { z } from 'zod';
import {
    Restaurant,
    CreateRestaurantData,
    UpdateRestaurantData,
    RestaurantQuery,
} from '../types/restaurant';

// All restaurant interfaces are now imported from '../types/restaurant'

// Restaurant service class
export class RestaurantService {
    // Get all restaurants with filtering and pagination
    static async getRestaurants(query: RestaurantQuery) {
        try {
            const { page, limit, search, city, minRating } = query;
            const skip = (page - 1) * limit;

            //Build where clause for filtering
            const where: any = {
                isActive: true
            };

            if (search) {
                where.OR = [
                    {name: { contains: search, mode: 'insensitive'}},
                    {description: { contains: search, mode: 'insensitive'}},
                    {city: { contains: search, mode: 'insensitive'}},
                ];
            }

            if (city) {
                where.city = { contains: city, mode: 'insensitive'};
            }

            if (minRating) {
                where.rating = { gte: minRating};
            }

            // Get restaurants with pagination
            const [restaurants, total] = await Promise.all([
                prisma.restaurant.findMany({
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

                prisma.restaurant.count({ where })
            ])

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
            }
        } catch (error) {
            logger.error('Get restaurants error:', error);
            throw error;
        }
    }
    // Get restaurant by ID
    static async getRestaurant(id: string) {
        try {
            const restaurant = await prisma.restaurant.findUnique({
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
        } catch (error) {
            logger.error('Get restaurant error:', error);
            throw error;
        }
        }

    // Create new restaurant
    static async createRestaurant(data: CreateRestaurantData) {
        try {
            const restaurant = await prisma.restaurant.create({
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

            logger.info(`Restaurant created: ${restaurant.name} (${restaurant.id})`);
            return restaurant;
        } catch (error) {
            logger.error('Create restaurant error:', error);
            throw error;
        }
       }

       // Update restaurant
       static async updateRestaurant(
        id: string,
        updateData: UpdateRestaurantData,
        userId: string,
        userRole: string
       ) {
        try {
            // Check if restaurant exists
            const existingRestaurant = await prisma.restaurant.findUnique({
                where: { id }
        });

        if (!existingRestaurant) {
            return null;
       }

       // Check permissions (owner or admin)
       if (userRole !== 'ADMIN' && existingRestaurant.id !== id) {
        return null;
       }

    const restaurant = await prisma.restaurant.update({
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

    logger.info(`Restaurant updated: ${restaurant.name} (${restaurant.id})`);
    return restaurant;
} catch (error) {
    logger.error('Update restaurant error:', error);
    throw error;
    }
}

    // Delete restaurant
    static async deleteRestaurant (id: string, userId: string, userRole: string) {
        try {
            const existingRestaurant = await prisma.restaurant.findUnique({
                where: { id }
            });

            if (!existingRestaurant) {
                return false;
            }

    // Check permissions (owner or admin)
    if (userRole !== 'ADMIN' && existingRestaurant.id !== id) {
        return false;
    }

    // soft delete by setting isActive to false
    await prisma.restaurant.update({
        where: { id },
        data: { isActive: false }
    });

    logger.info(`Restaurant deleted: ${existingRestaurant.name} (${id})`);
    return true;
} catch (error) {
    logger.error('Delete restaurant error:', error);
    throw error;
}
}

    // Get restaurants by owner
    static async getRestaurantsByOwner(ownerId: string) {
        try {
            const restaurants = await prisma.restaurant.findMany({
                where: {
                    // Note: Need to add ownerId field to schema
                    // For now, this is a placeholder
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
        } catch (error) {
            logger.error('Get restaurants by owner error:', error);
            throw error;
        }
     }
}
