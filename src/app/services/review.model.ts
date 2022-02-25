import { User } from './user.model';

export interface Review {
  reviewId: number;
  review: string;
  rating: number;
  user: User;
}
