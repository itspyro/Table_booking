import { Component, Input, OnInit } from '@angular/core';
import { RatingChangeEvent } from 'angular-star-rating';
import { RestaurantService } from 'app/services/restaurants.service';
import { Review } from 'app/services/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  reviews?: Review[];

  constructor(private restService: RestaurantService) {}

  ngOnInit(): void {
    this.restService.getReviewsByRestId();
    this.restService.selectedRestaurantReviews.subscribe((res) => {
      this.reviews = res;
    });
  }

  onRatingChange(event: RatingChangeEvent, index: number) {
    // ...
  }
}
