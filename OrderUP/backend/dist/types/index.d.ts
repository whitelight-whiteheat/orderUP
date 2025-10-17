export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface SearchQuery extends PaginationQuery {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
}
export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
}
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
export interface Order {
    id: string;
    userId: string;
    restaurantId: string;
    addressId: string;
    status: OrderStatus;
    subtotal: number;
    tax: number;
    deliveryFee: number;
    tip?: number;
    total: number;
    notes?: string;
    estimatedTime?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface OrderItem {
    id: string;
    orderId: string;
    menuId: string;
    quantity: number;
    price: number;
    notes?: string;
}
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
export interface Payment {
    id: string;
    orderId: string;
    userId: string;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
    stripeId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CARD' | 'CASH' | 'WALLET';
export interface Address {
    id: string;
    userId: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Review {
    id: string;
    userId: string;
    restaurantId: string;
    orderId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}
export interface DatabaseConfig {
    url: string;
}
export interface JWTConfig {
    secret: string;
    refreshSecret: string;
    expiresIn: string;
    refreshExpiresIn: string;
}
export interface ServiceResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
//# sourceMappingURL=index.d.ts.map