import { Filters } from './filter.model';

export interface Restaurant {
  restaurantId: number,
  restaurantName: string,
  address: string,
  gstIn: string,
  contact: string,
  nonVeg: boolean,
  description: string,
  cuisines: any,
  user: number
}
