import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/services/auth.service';
import { OrderDetails } from 'app/services/order-details.model';
import { UserprofileService } from 'app/services/userprofile.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  orders!: OrderDetails[];
  userId!: any;
  constructor(private http: HttpClient, private auth: AuthService,
    private _snackBar: MatSnackBar,
    private userService:UserprofileService) { }


  ngOnInit(): void {
    this.auth.user.subscribe((res) => {
      this.userId = res?.userId;
    })
    console.log(this.userId)
    this.userService.getOrderDetail(this.userId);
    this.userService.orderList.subscribe((res)=>{
      if(res===undefined||res===null){
        this._snackBar.open('You Do not have any order','okay')
      }else{
        this.orders = res
      }
      console.log(this.orders)
    })
  }
  getTotalFood(index:number){
    let total:number = 0;
    this.orders[index].foodOrder.forEach((element, index) => {
      total += element.price
    })

    return total;
  }

  getTotal(index: number): number {
    let total: number = 0;
    total+=this.orders[index].tableOrder.tablePrice
    this.orders[index].foodOrder.forEach((element, index) => {
      total += element.price
    })

    return total;
  }
}
