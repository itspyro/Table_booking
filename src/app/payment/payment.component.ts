import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'app/services/restaurants.service';
import { BookingService } from 'app/services/booking.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  openingTime:string="";
  closingTime:string="";
  isAuthenticated?: boolean;
  userId?: number;
  constructor(
    private restService: RestaurantService,
    private authService: AuthService,
  ) {}

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#fff',
        buttonColor: 'rgb(88,111,64)'
    },
    dial: {
        dialBackgroundColor: 'rgb(88,111,64)',
    },
    clockFace: {
        clockFaceBackgroundColor: 'rgb(88,111,64)',
        clockHandColor: '#9fbd90',
        clockFaceTimeInactiveColor: '#fff'
    }
};


  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.userId = user?.userId;
    });
    var obj:{openingTime:string,closingTime:string}=this.restService.returnTimings();
    this.openingTime=obj.openingTime;
    this.closingTime=obj.closingTime;
  }

  paymentStarted(data:any) : void{
    var amount = data.amount;
    console.log(amount);
    this.restService.addPayment({...data, userId:this.userId});

  }
 

}
