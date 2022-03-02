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
    restaurant:Restaurant;
    tableOrder:{
        arrivalTime:string;
        date:string;
        persons:number;
        tableOrderId:number;
        tablePrice:number;
    };
}