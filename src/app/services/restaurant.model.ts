import { Filters } from './filter.model';
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
  cuisines: any;
  user: number;
  photos: string[];
  menu: Recipe[];
  reviews: Review[];
}
