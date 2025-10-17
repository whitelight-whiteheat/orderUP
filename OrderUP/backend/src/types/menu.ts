export interface MenuItem {
    id: string;
    restaurantId: string;
    name: string;
    description?: string;
    image?: string;
    price: number;
    category: string;
    isAvailable: boolean;
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    isSpicy: boolean;
    calories?: number;
    allergens: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateMenuItemData {
    restaurantId: string;
    name: string;
    description?: string;
    image?: string;
    price: number;
    category: string;
    isAvailable: boolean;
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    isSpicy: boolean;
}

export interface UpdateMenuItemData {
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    isAvailable?: boolean;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    isSpicy?: boolean;
    calories?: number;
    allergens?: string[];
}

export interface MenuQuery {
    page: number;
    limit: number;
    restaurantId?: string;
    search?: string;
    category?: string;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    isSpicy?: boolean;
    minPrice?: number;
    maxPrice?: number;
}