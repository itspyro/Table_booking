import { Cuisines } from './cuisine.model';

export interface Filters {
  pure_veg: boolean;
  rating: number;
  cuisine: Cuisines;
  isPrivate: boolean;
  wifi: boolean;
  outdoor_sitting: boolean;
  date: string;
  time: string;
}
