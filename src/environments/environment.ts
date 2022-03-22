// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendUrl: 'http://localhost:8080',
  restaurantAllEndpoint: '/api/restaurant/all',
  restaurantIdEndpoint: '/api/restaurant/',
  createRestaurantEndpoint: '/api/restaurant/create',
  cuisineAllEndpoint: '/api/cuisines/',
  recipesIdEndpoint: '/api/recipe/restaurant/',
  reviewIdEndpoint: '/api/review/restaurant/',
  createUserEndpoint: '/api/user/create',
  loginEndpoint: '/api/user/login',
  userIdEndpoint: '/api/user/find/',
  userRestaurantEndpoint: '/api/user/restaurant/',
  benchCreateEndpoint: '/api/bench/create',
  benchAllEndpoint: '/api/bench/restaurant/',
  benchDeleteEndpoint: '/api/bench/delete/',
  bookingEndpoint:'/api/bookings/create',
  addReviewEndpoint:'/api/review/create',
  updateRestInfoEndpoint:'/api/restaurant/update',
  updateBenchInfoEndpoint:'/api/bench/update',
  cityEndpoint:'/api/city',
  checkAvailabilityEndpoint: '/api/checkAvailability/',
  updateUserInfoEndpoint: '/api/user/update',
  addRecipeEndpoint:'/api/recipe/create',
  updateRecipeEndpoint:'/api/recipe/update',
  deleteRecipeEndpoint:'/api/recipe/delete/',
  userOrderEndpoint:'/api/bookings/user/',
  photoUpload:'/api/photos/upload',
  photoSaveToDb:'/api/photos/create',
  restaurantPhotos:'/api/photos/restaurant'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
