import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { filter, Subject } from 'rxjs';
import { Cuisine } from './cuisine.model';
import { Filter } from './filter.model';

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

  applyFilters(filters: Filter) {
    const filteredRestaurants = this.restaurants.filter((restaurant) => {
      const restaurantCuisines: string[] = [];
      restaurant.cuisines.map((cuisine) => {
        restaurantCuisines.push(cuisine.cuisineName);
      });
      return (
        (filters.rating > 0 ? restaurant.rating >= filters.rating : true) &&
        (filters.pure_veg === true
          ? !restaurant.nonVeg === filters.pure_veg
          : true) &&
        (filters.cuisine.Bengali === true
          ? restaurantCuisines.includes('Bengali')
          : true) &&
        (filters.cuisine.SouthIndian === true
          ? restaurantCuisines.includes('South Indian')
          : true) &&
        (filters.cuisine.Chinese === true
          ? restaurantCuisines.includes('Chinese')
          : true) &&
        (filters.cuisine.Gujarati === true
          ? restaurantCuisines.includes('Gujarati')
          : true) &&
        (filters.cuisine.Italian === true
          ? restaurantCuisines.includes('Italian')
          : true) &&
        (filters.cuisine.Marathi === true
          ? restaurantCuisines.includes('Marathi')
          : true) &&
        (filters.cuisine.Mediterranean === true
          ? restaurantCuisines.includes('Mediterranean')
          : true) &&
        (filters.cuisine.PunjabiRasoi === true
          ? restaurantCuisines.includes('Punjabi Rasoi')
          : true) &&
        (filters.cuisine.SouthIndian === true
          ? restaurantCuisines.includes('South Indian')
          : true)
      );
    });

    this.restaurantList.next(filteredRestaurants);
  }
}
