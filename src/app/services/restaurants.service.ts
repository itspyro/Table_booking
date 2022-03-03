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
import { Router} from '@angular/router';
import { AuthService } from './auth.service';

import { Payment } from './payment.model';
import swal from 'sweetalert';


declare var Razorpay:any;

import { MatSnackBar } from '@angular/material/snack-bar';
import { foodOrder } from './foodOrder.model';
import { OrderDetails, RestOrderDetails } from './order-details.model';


@Injectable({
  providedIn: 'root',
})
export class RestaurantService implements OnInit {
  restaurants: Restaurant[] = [];
  cuisines: Cuisine[] = [];
  menu: Recipe[] = [];
  reviews: Review[] = [];
  restOrders!:RestOrderDetails[];
  openingTime: string = '';
  closingTime: string = '';
  cities = [];
  selectedCity: string = 'New Delhi';
  orderedItems:foodOrder[]=[];


  restaurantId!: number;
  review = new AddReview();
  payment = new Payment();
  userId?: number;

  restaurantList = new Subject<Restaurant[]>();
  restOrderList = new Subject<RestOrderDetails[]>();
  cuisineList = new Subject<Cuisine[]>();
  selectedRestaurant = new Subject<RestProfile>();
  selectedRestaurantMenu = new Subject<Recipe[]>();
  selectedRestaurantReviews = new Subject<Review[]>();
  citiesList = new Subject<string[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private _snackbar: MatSnackBar
  ) {}

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
      }>(environment.backendUrl + environment.restaurantIdEndpoint + id)
      .subscribe((resData) => {
        console.log(resData);
        this.restaurantId = resData.restaurant.restaurantId;
        this.selectedRestaurant.next(resData.restaurant);
        let menuItems=resData.restaurant.recipeDto;
        if(this.orderedItems.length==0){
          for(let i in menuItems){
            this.orderedItems.push({ ...menuItems[i],quantity:0 });
          }
        }
      });
  }

  setTimings(openingTime: string, closingTime: string) {
    this.closingTime = closingTime;
    this.openingTime = openingTime;
  }

  returnTimings(){
    return {  openingTime:this.openingTime, closingTime:this.closingTime,rest_id:this.restaurantId };
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

  addRestaurant(rest: any) {
    this.http
      .post<{
        httpStatusCode: number;
        responseMessage: string;
      }>(environment.backendUrl + environment.createRestaurantEndpoint, rest)
      .subscribe((resData) => {
        if (resData.httpStatusCode == 200) {
          this._snackbar.open('Restaurant Created Successfully');
        }
      });
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.getRestaurants();
  }


  addPayment(data:any) {
    this.payment.payment = data.amount;
    this.payment.userId = data.userId;
    console.log(this.payment.userId);
    this.payment.arrivalTime=23664824742;
    this.payment.departureTime=34762864373;
    this.payment.restaurantId=5;
    this.payment.benchId = 27;
    
    if(this.payment.payment==null){
      swal("Payment Failed", "please check the order!", "error");
      return;
    }
    
    this.http.post<{httpStatusCode:number, responseMessage:string}>(environment.backendUrl + '/api/bookings/create', this.payment).subscribe({next : (resData) => {
          var obj = JSON.parse(resData.responseMessage);
          if(resData.httpStatusCode===200){
            let options = {
              key:"rzp_test_LecrG02AfeAeEm",
              amount:obj.amount,
              currency:obj.currency,
              name:"OPEN TABLE",
              description:"CheckOut",
              image:"/Users/aakriti.sahrawat/Table_booking/src/assets/images/Project_logo.png",
              order_id:obj.id,
              handler: (response)=> {
                
                this.updatePayment(response);
                
              },
              prefill: {
                  "name": "",
                  "email": "",
                  "contact": ""
              },
              notes: {
                  "address": "Order Booking"
              },
              theme: {
                  "color": "#A6EA12"
              }
            }
            let rzp = new Razorpay(options);
            rzp.on('payment.failed', function (response){
              console.log(response.error.code);
              console.log(response.error.description);
              console.log(response.error.source);
              console.log(response.error.step);
              console.log(response.error.reason);
              console.log(response.error.metadata.order_id);
              console.log(response.error.metadata.payment_id);
              swal("Payment Failed", "oops payment failed!", "error");
            });
            rzp.open();
          }

      }
    });

    
    
  }

  updatePayment(response){
    console.log(response.razorpay_payment_id);
    console.log(response.razorpay_order_id);
    console.log(response.razorpay_signature);
                
               const data = {
                  paymentId:response.razorpay_payment_id,
                  orderId:response.razorpay_order_id,
                  status:"paid",
                };
    this.http.post(environment.backendUrl + '/api/bookings/update-payment', data).subscribe();
    swal("Good job!", "You clicked the button!", "success");
  }
  
  addRecipe(data:any){
    this.http.post(
      environment.backendUrl+environment.addRecipeEndpoint,data
    ).subscribe((res)=>{
      this.getRecipeByRestId(data.restaurantId)
    })
  }

  updateRecipe(data:any){
    this.http.put(
      environment.backendUrl+environment.updateRecipeEndpoint,data
    ).subscribe((res)=>{

    })
  }

  deleteRecipe(recipeId:any){
    this.http.delete(
      environment.backendUrl+environment.deleteRecipeEndpoint+recipeId
    ).subscribe((res)=>{

    })
  }

  getRestOrderDetails(userId:number,restaurantId:number){
    this.http.get<{httpStatusCode: number,
    responseMessage: string,
    restaurantBookings: RestOrderDetails[]}>(
      environment.backendUrl+environment.userOrderEndpoint+userId+"/restaurant/"+restaurantId
    ).subscribe((res)=>{
      if(res.restaurantBookings===undefined||res.restaurantBookings===null){ 
      }else{
        this.restOrders = res.restaurantBookings;
        this.restOrderList.next(this.restOrders)
      }
    })
  }

  
}

