import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/services/auth.service';
import { OrderDetails, RestOrderDetails } from 'app/services/order-details.model';
import { RestaurantService } from 'app/services/restaurants.service';
import { User } from 'app/services/user.model';
import { UserprofileService } from 'app/services/userprofile.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  isOwner: boolean = false;
  isOwnerCheckbox: boolean = false;

  orders: OrderDetails[] = [];
  restOrders: RestOrderDetails[] = [];
  userId!: any;
  userRestId!: any;
  constructor(private http: HttpClient, private auth: AuthService,
    private _snackBar: MatSnackBar,
    private userService: UserprofileService,
    private restService:RestaurantService) { }


  ngOnInit(): void {
    this.auth.user.subscribe((res) => {
      this.userId = res?.userId;
    })
    this.userService.getUser(this.userId);
    this.userService.userProfile.subscribe((res) => {
      if (res.roleName === "owner") {
        this.isOwner = true;
        this.userService.getRestaurantByUser(this.userId);
        this.userService.restaurantProfile.subscribe((res) => {
          this.userRestId = res.restaurantId;
          this.restService.getRestOrderDetails(this.userId,this.userRestId);
          this.restService.restOrderList.subscribe((res)=>{
            this.restOrders = res;
          })
        })
      } else {
        this.isOwner = false
      }
    })

    this.userService.getUserOrderDetail(this.userId);
    this.userService.orderList.subscribe((res) => {
      if (res === undefined || res === null) {
        this._snackBar.open('You Do not have any order', 'okay')
      } else {
        this.orders = res
      }
    })

    this.restService.getRestOrderDetails
  }

  getTotalFoodCost(i: number,data:any) {
    let total: number = 0;
    data.foodOrder.forEach((element, index) => {
      total += element.price
    })
    return total;
  }

  getTotal(i: number,data:any): number {
    let total: number = 0;
    total += data.tableOrder.tablePrice
    data.foodOrder.forEach((element, index) => {
      total += element.price
    })
    return total;
  }

  checkIsOwner(){
    if(this.isOwner==true&&this.isOwnerCheckbox==true){
      return true;
    }else{
      return false;
    }
  }

}
