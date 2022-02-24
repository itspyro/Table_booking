import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { Subject } from 'rxjs';
import { Cuisine } from './cuisine.model';
import { Filter } from './filter.model';
import { RestProfile } from './rest_profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from './menu.model';
import { Review } from './review.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService implements OnInit {
  restaurants: Restaurant[] = [];
  cuisines: Cuisine[] = [];
  menu: Menu[] = [];
  reviews: Review[] = [];

  restaurantList = new Subject<Restaurant[]>();
  cuisineList = new Subject<Cuisine[]>();
  selectedRestaurant = new Subject<RestProfile>();
  selectedRestaurantMenu = new Subject<Menu[]>();
  selectedRestaurantReviews = new Subject<Review[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getRestaurants() {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        restaurants: Restaurant[];
      }>(environment.backendUrl + environment.restaurantAllEndpoint)
      .subscribe({
        next: (resData) => {
          this.restaurants = resData.restaurants;
          this.restaurantList.next(this.restaurants.slice());
        },
      });
  }

  getRestaurantsById(id: number) {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        restaurant: RestProfile;
      }>(environment.backendUrl + environment.restaurantIdEndpoint + id + '/')
      .subscribe((resData) => {
        this.selectedRestaurant.next(resData.restaurant);
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
      }>(environment.backendUrl + environment.cuisineAllEndpoint)
      .subscribe({
        next: (resData) => {
          this.cuisines = resData.cuisines;
          this.cuisineList.next(this.cuisines.slice());
        },
      });
  }

  // getPhotos(restaurantId: number) {
  //   const url = 'http://localhost:8080/api/photos/restaurant/' + restaurantId;

  //   this.http.get(url).subscribe(() => {});
  // }

  getRecipeByRestId(restaurantId: number) {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        recipes: Menu[];
      }>(environment.backendUrl + environment.recipesIdEndpoint + restaurantId)
      .subscribe((resData) => {
        this.menu = resData.recipes;
        this.selectedRestaurantMenu.next(this.menu.slice());
      });
  }

  getReviewsByRestId(restaurantId: number) {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        reviews: Review[];
      }>(environment.backendUrl + environment.reviewIdEndpoint + restaurantId)
      .subscribe((resData) => {
        this.reviews = resData.reviews;
        this.selectedRestaurantReviews.next(this.reviews.slice());
      });
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
