// Restaurant-specific types
export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  image?: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  rating: number;
  deliveryFee: number;
  minOrder: number;
  estimatedTime: string;
  createdAt: Date;
  updatedAt: Date;
}

// DTOs for operations
export interface CreateRestaurantData {
  name: string;
  description?: string;
  image?: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  deliveryFee?: number;
  minOrder?: number;
  estimatedTime?: string;
  ownerId: string;
}

export interface UpdateRestaurantData {
  name?: string;
  description?: string;
  image?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  deliveryFee?: number;
  minOrder?: number;
  estimatedTime?: string;
  isActive?: boolean;
}

export interface RestaurantQuery {
  page: number;
  limit: number;
  search?: string;
  city?: string;
  minRating?: number;
}