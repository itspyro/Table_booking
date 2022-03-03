import { BookingData } from './booking.model';
import { Recipe} from './recipe.model'
import { Restaurant } from './restaurant.model';
export interface OrderDetails{
    bookingId:number;
    foodOrder: [{
        foodOrderId:number;
        price:number;
        quantity:number;
        recipe:Recipe;
    }];
    tableOrder:{
        arrivalTime:string;
        date:string;
        persons:number;
        tableOrderId:number;
        tablePrice:number;
    };
    restaurant:Restaurant;
}

export interface RestOrderDetails{
    bookingId:number;
    foodOrder: [{
        foodOrderId:number;
        price:number;
        quantity:number;
        recipe:Recipe;
    }];
    tableOrder:{
        arrivalTime:string;
        date:string;
        persons:number;
        tableOrderId:number;
        tablePrice:number;
    };
    user:{
        profilePhoto:string;
        userEmail:string;
        userId:string;
        userName:string
    }


}