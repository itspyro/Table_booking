import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { Subject } from 'rxjs';
import { Cuisine } from './cuisine.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService implements OnInit {
  restaurants: Restaurant[] = [];
  cuisines: Cuisine[] = [];

  restaurantList = new Subject<Restaurant[]>();
  cuisineList = new Subject<Cuisine[]>();
  selectedRestaurant = new Subject<Restaurant>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getRestaurants() {
    const url = 'http://localhost:8080/api/restaurant/all';
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        restaurants: Restaurant[];
      }>(url)
      .subscribe((resData) => {
        this.restaurants = resData.restaurants;
        this.restaurantList.next(this.restaurants.slice());
      });
  }

  getRestaurantsById(id: number) {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        restaurants: Restaurant[];
      }>('http://localhost:8080/api/restaurant/' + id)
      .subscribe((resData) => {
        this.selectedRestaurant.next(resData.restaurants[0]);
      });
  }

  getCuisines() {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        cuisines: {
          cuisineId: number;
          cuisineName: string;
          restaurants: any;
        }[];
      }>('http://localhost:8080/api/cuisines/')
      .subscribe((resData) => {
        this.cuisines = resData.cuisines;
        this.cuisineList.next(this.cuisines.slice());
      });
  }

  getPhotos(restaurantId: number) {
    const url = 'http://localhost:8080/api/photos/restaurant/' + restaurantId;

    this.http.get(url).subscribe(() => {});
  }

  applyFilters(filters) {
    const filteredRestaurants = this.restaurants.filter((restaurant) => {
      return filters.rating > 0 ? restaurant.rating >= filters.rating : true;
    });

    this.restaurantList.next(filteredRestaurants);
  }
}
