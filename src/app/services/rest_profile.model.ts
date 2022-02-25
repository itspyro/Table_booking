import { Cuisine } from './cuisine.model';
import { Review } from './review.model';
import { Bench } from './bench.model';
import { Recipe } from './recipe.model';
import { User } from './user.model';


export interface RestProfile {
    restaurantId:number,
    restaurantName:string,
    address:{
        addressLine1:string,
        addressLine2:string,
        city:string,
        pincode:string
    },
    gstIn:string,
    contact:string,
    nonVeg:boolean,
    description:string,
    openingTime:string,
    closingTime:string,
    thumbnailPhoto:string,
    rating:number,
    cuisines:Cuisine[],
    user:User,
    benches:Bench[],
    reviews:Review[],
    recipeDto:Recipe[],
    photoDto:[]
}
  