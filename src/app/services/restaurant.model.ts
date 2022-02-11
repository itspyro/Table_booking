import { Filters } from './filter.model';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  filters: Filters;
}
