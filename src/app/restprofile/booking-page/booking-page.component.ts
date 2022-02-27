import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from 'app/services/restaurants.service';
import { BookingService } from 'app/services/booking.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';


@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {
  rest_id:number=0;
  openingTime:string="";
  closingTime:string="";
  numOfPersons:number=1;
  private:boolean=false;



  curr_date:Date=new Date();
  preorderFood=false;

  constructor(private restService:RestaurantService) { }

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: 'rgb(222, 235, 210)',
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
    var obj:{openingTime:string,closingTime:string,rest_id:number}=this.restService.returnTimings();
    this.openingTime=obj.openingTime;
    this.closingTime=obj.closingTime;
    this.rest_id=obj.rest_id;
    this.curr_date=new Date();
  }
  
  onSubmit(ele){
    console.log(ele);
    var date=ele.date;
    var year=date.getFullYear();
    var month=date.getMonth();
    var day=date.getDate();

    var in_time=ele.arrivalTime.split(' ');
    var out_time=ele.departureTime.split(' ');

    var in_min=parseInt(in_time[0].split(':')[1]);
    var out_min=parseInt(out_time[0].split(':')[1]);
    var in_hr=parseInt(in_time[0].split(':')[0]);
    var out_hr=parseInt(out_time[0].split(':')[0]);

    if(in_time[1]=="PM"){
      in_hr+=12;
    }
    if(out_time[1]=="PM"){
      out_hr+=12;
    }

    var arrivalTime=new Date(year,month,day,in_hr,in_min).getTime();
    var departureTime=new Date(year,month,day,out_hr,out_min).getTime();

    var benchType=(ele.private?"private":"general");
    this.private=(ele.private?true:false);

    var checkAvailabilityResponse={
      noOfPersons:this.numOfPersons,
      arrivalTime:arrivalTime,
      departureTime:departureTime,
      benchType:benchType,
      restaurantId:this.rest_id
    }

    console.log(checkAvailabilityResponse);

  }

}
