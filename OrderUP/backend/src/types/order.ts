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

export type OrderStatus =
| 'PENDING'
| 'CONFIRMED'
| 'PREPARING'
| 'READY'
| 'OUT_FOR_DELIVERY'
| 'DELIVERED'
| 'CANCELLED';

export interface CreateOrderInput {
    restaurantId: string;
    addressId: string;
    items: {
        menuId: string;
        quantity: number;
    }[];
    notes?: string;
    tip?: number;
}

export interface UpdateOrderInput {
    status?: OrderStatus;
    notes?: string;
    tip?: number;
    estimatedTime?: string;
}

export interface OrderQuery {
    page: number;
    limit: number;
    sort: 'asc' | 'desc';
    sortBy: 'createdAt' | 'updatedAt' | 'total';
    search?: string;
    status?: OrderStatus;
    restaurantId?: string;
    userId?: string;
    addressId?: string;
    startDate?: Date;
    endDate?: Date;
}