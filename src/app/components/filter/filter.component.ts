import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cuisine } from 'app/services/cuisine.model';
import { RestaurantService } from 'app/services/restaurants.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
  cuisines: Cuisine[] = [];
  subscription?: Subscription;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.getCuisines();
    this.subscription = this.restaurantService.cuisineList.subscribe(
      (cuisines) => {
        this.cuisines = cuisines;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(filters) {
    console.log(filters);
  }
}
