import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'app/services/restaurants.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  cuisines: string[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.getCuisines();
    this.restaurantService.cuisineList.subscribe((cuisines) => {
      this.cuisines = cuisines;
    });
  }

  onSubmit(filters) {
    console.log(filters);
  }
}
