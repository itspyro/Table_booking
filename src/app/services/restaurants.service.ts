import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { Subject } from 'rxjs';
import { Cuisine } from './cuisine.model';
import { Filter } from './filter.model';
import { RestProfile } from './rest_profile.model';
import { Review } from './review.model';
import { AddReview } from './addreview.model';
import { environment } from '../../environments/environment';
import { Recipe } from './recipe.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService implements OnInit {
  restaurants: Restaurant[] = [];
  cuisines: Cuisine[] = [];
  menu: Recipe[] = [];
  reviews: Review[] = [];
  openingTime: string = '';
  closingTime: string = '';
  cities = [];
  selectedCity: string = 'New Delhi';

  restaurantId!: number;
  review = new AddReview();
  userId?: number;

  restaurantList = new Subject<Restaurant[]>();
  cuisineList = new Subject<Cuisine[]>();
  selectedRestaurant = new Subject<RestProfile>();
  selectedRestaurantMenu = new Subject<Recipe[]>();
  selectedRestaurantReviews = new Subject<Review[]>();
  citiesList = new Subject<string[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.userId = user?.userId;
    });
  }

  getAllCities() {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        cities: [];
      }>(environment.backendUrl + environment.cityEndpoint)
      .subscribe({
        next: (resData) => {
          this.cities = resData.cities;
          this.citiesList.next(this.cities);
        },
      });
  }

  getRestaurants() {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        restaurants: Restaurant[];
      }>(environment.backendUrl + environment.restaurantAllEndpoint)
      .subscribe({
        next: (resData) => {
          this.restaurants = resData.restaurants.filter((restaurant) => {
            return restaurant.address.city == this.selectedCity;
          });
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
        this.restaurantId = resData.restaurant.restaurantId;
        this.selectedRestaurant.next(resData.restaurant);
      });
  }

  setTimings(openingTime: string, closingTime: string) {
    this.closingTime = closingTime;
    this.openingTime = openingTime;
  }

  returnTimings() {
    return { openingTime: this.openingTime, closingTime: this.closingTime };
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

  getRecipeByRestId(restaurantId: number) {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        recipes: Recipe[];
      }>(environment.backendUrl + environment.recipesIdEndpoint + restaurantId)
      .subscribe((resData) => {
        this.menu = resData.recipes;
        this.selectedRestaurantMenu.next(this.menu.slice());
      });
  }

  getReviewsByRestId() {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        reviews: Review[];
      }>(
        environment.backendUrl +
          environment.reviewIdEndpoint +
          this.restaurantId
      )
      .subscribe((resData) => {
        this.reviews = resData.reviews;
        this.selectedRestaurantReviews.next(this.reviews.slice());
      });
  }

  applyFilters(filters: Filter) {
    const filteredRestaurants = this.restaurants.filter((restaurant) => {
      const restaurantCuisines: string[] = restaurant.cuisineNames;
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
        (filters.cuisine.Punjabi === true
          ? restaurantCuisines.includes('Punjabi')
          : true) &&
        (filters.cuisine.SouthIndian === true
          ? restaurantCuisines.includes('South Indian')
          : true) &&
        (filters.cuisine.Mexican === true
          ? restaurantCuisines.includes('Mexican')
          : true)
      );
    });

    this.restaurantList.next(filteredRestaurants);
  }

  addReview(data: any) {
    this.review.review = data.review;
    this.review.rating = data.rating;
    this.review.restaurantId = this.restaurantId;
    this.review.userId = data.userId;
    const DATE = new Date();
    this.review.timestamp = DATE.getTime();

    this.http
      .post(environment.backendUrl + environment.addReviewEndpoint, this.review)
      .subscribe((response) => {
        this.getReviewsByRestId();
      });
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.getRestaurants();
  }
}
