import { Recipe } from './recipe.model';
import { Review } from './review.model';

export interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  address: string;
  gstIn: string;
  contact: string;
  nonVeg: boolean;
  description: string;
  rating: number;
  opening_hours: {
    start: string;
    end: string;
  };
  cuisines: any;
}
