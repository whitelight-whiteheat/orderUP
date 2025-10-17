import { CreateRestaurantData, UpdateRestaurantData, RestaurantQuery } from '../types/restaurant';
export declare class RestaurantService {
    static getRestaurants(query: RestaurantQuery): Promise<{
        restaurants: {
            email: string;
            phone: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            _count: {
                reviews: number;
                menus: number;
            };
            address: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            description: string | null;
            image: string | null;
            latitude: number | null;
            longitude: number | null;
            rating: number;
            deliveryFee: number;
            minOrder: number;
            estimatedTime: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    static getRestaurant(id: string): Promise<{
        email: string;
        phone: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        reviews: {
            id: string;
            createdAt: Date;
            user: {
                firstName: string;
                lastName: string;
                id: string;
            };
            rating: number;
            comment: string | null;
        }[];
        name: string;
        _count: {
            reviews: number;
        };
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        description: string | null;
        image: string | null;
        latitude: number | null;
        longitude: number | null;
        rating: number;
        deliveryFee: number;
        minOrder: number;
        estimatedTime: string;
        menus: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            image: string | null;
            price: number;
            category: string;
            isVegetarian: boolean;
            isVegan: boolean;
            isGlutenFree: boolean;
            isSpicy: boolean;
            calories: number | null;
            allergens: string[];
        }[];
    } | null>;
    static createRestaurant(data: CreateRestaurantData): Promise<{
        email: string;
        phone: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        description: string | null;
        image: string | null;
        latitude: number | null;
        longitude: number | null;
        rating: number;
        deliveryFee: number;
        minOrder: number;
        estimatedTime: string;
    }>;
    static updateRestaurant(id: string, updateData: UpdateRestaurantData, userId: string, userRole: string): Promise<{
        email: string;
        phone: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        description: string | null;
        image: string | null;
        latitude: number | null;
        longitude: number | null;
        rating: number;
        deliveryFee: number;
        minOrder: number;
        estimatedTime: string;
    } | null>;
    static deleteRestaurant(id: string, userId: string, userRole: string): Promise<boolean>;
    static getRestaurantsByOwner(ownerId: string): Promise<{
        email: string;
        phone: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        description: string | null;
        image: string | null;
        rating: number;
        deliveryFee: number;
        minOrder: number;
        estimatedTime: string;
    }[]>;
}
//# sourceMappingURL=restaurantService.d.ts.map