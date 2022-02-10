import { HttpClient } from '@angular/common/http';
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
  restaurantCard: Restaurant[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private restaurantService: RestaurantService
  ) {
    // this.http
    //   .get('http://localhost:3000/restaurant')
    //   .subscribe((Response: any) => {
    //     // console.log(Response);
    //     this.restaurantCard = Response;
    //   });
  }
  restaurantProfile() {
    //this.router.navigateByUrl('restaurant-info')
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurants();
    this.restaurantService.restaurantList.subscribe((restaurants) => {
      this.restaurantCard = restaurants;
    });
  }
}
