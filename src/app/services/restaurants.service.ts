import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Filters } from './filter.model';
import { Restaurant } from './restaurant.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService implements OnInit {
  restaurants: Restaurant[] = [];

  restaurantList = new Subject<Restaurant[]>();

  selectedRestaurant = new Subject<Restaurant>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getRestaurants() {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        restaurants: Restaurant[];
      }>('http://localhost:8080/api/restaurant/all')
      .subscribe((resData) => {
        resData.restaurants.map((restaurant) => {
          this.restaurants.push(restaurant);
        });
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

  // selectRestaurant(id: number) {
  //   const filteredRestaurant = this.restaurants.filter((restuarant) => {
  //     return restuarant.id === id;
  //   });
  //   this.selectedRestaurant.next(filteredRestaurant[0]);
  // }

  // applyFilters(filters) {
  //   const filteredRestaurants = this.restaurants.filter((restaurant) => {
  //     return (
  //       (filters.rating > 0
  //         ? restaurant.filters.rating >= filters.rating
  //         : true) &&
  //       (filters.isPrivate == true
  //         ? restaurant.filters.isPrivate == filters.isPrivate
  //         : true) &&
  //       (filters.pure_veg == true
  //         ? restaurant.filters.pure_veg == filters.pure_veg
  //         : true) &&
  //       (filters.cuisine.southIndian == true
  //         ? restaurant.filters.cuisine.southIndian ==
  //           filters.cuisine.southIndian
  //         : true) &&
  //       (filters.cuisine.punjabi == true
  //         ? restaurant.filters.cuisine.punjabi == filters.cuisine.punjabi
  //         : true) &&
  //       (filters.cuisine.bengali == true
  //         ? restaurant.filters.cuisine.bengali == filters.cuisine.bengali
  //         : true) &&
  //       (filters.cuisine.gujarati == true
  //         ? restaurant.filters.cuisine.gujarati == filters.cuisine.gujarati
  //         : true) &&
  //       (filters.cuisine.chinese == true
  //         ? restaurant.filters.cuisine.chinese == filters.cuisine.chinese
  //         : true)
  //     );
  //   });

  //   this.restaurantList.next(filteredRestaurants);
  // }
}
