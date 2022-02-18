import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'app/services/restaurant.model';
import { RestaurantService } from 'app/services/restaurants.service';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
})
export class RestaurantCardComponent implements OnInit {
  restaurants: Restaurant[] = [];
  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants();
    this.restaurantService.restaurantList.subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
  }

  onNavigateProfile(id: number) {
    this.router.navigate(['/rest_profile', btoa(id.toString())]);
  }
}
