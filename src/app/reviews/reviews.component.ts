import { Component, Input, OnInit } from '@angular/core';
import { RatingChangeEvent } from 'angular-star-rating';
import { Review } from 'app/services/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  @Input() reviews?: Review[];

  // reviews = [{
  //   username: 'Karanjit',
  //   userimage: 'https://www.maxpixel.net/static/photo/2x/Portrait-People-Male-Boy-Indian-Young-India-5179983.jpg',
  //   time: '8, Feb',
  //   rating: 5,
  //   review: 'great taste good packaging',
  // },
  // {
  //   username: 'Divyanshi',
  //   userimage: 'https://p1.pxfuel.com/preview/215/690/484/indian-model-female-fashion-woman-portrait.jpg',
  //   time: '1, Feb',
  //   rating: 1.5,
  //   review: 'wrong order'
  // }];

  constructor() {}

  ngOnInit(): void {}

  onRatingChange(event: RatingChangeEvent, index: number) {
    // ...
  }
}
