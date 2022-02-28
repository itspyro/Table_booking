import { Cuisine } from './cuisine.model';

export interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    pincode: string;
  };
  gstIn: string;
  contact: string;
  nonVeg: boolean;
  description: string;
  rating: number;
  openingTime: string;
  closingTime: string;
  cuisineNames: string[];
  userId?: number;
}
