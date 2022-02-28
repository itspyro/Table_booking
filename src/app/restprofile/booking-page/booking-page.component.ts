import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from 'app/services/restaurants.service';
import { BookingService } from 'app/services/booking.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import {Bench} from 'app/services/bench.model';
import { AuthService } from 'app/services/auth.service';


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
  benches:Bench[]=[];
  curr_date:Date=new Date();
  allotedBench:Bench[]=[];
  bookingId:number=0;
  userId?:number=0;

  constructor(private restService:RestaurantService, private bookService:BookingService,private authservice:AuthService) { }

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
    this.authservice.user.subscribe((data)=>{
      this.userId=data?.userId;
    })
  }
  
  getSuitableTable(benches: Bench[],numOfPersons:number){
    if(benches.length==0)return;
    benches=benches.filter((bench)=>bench.capacity>=numOfPersons);
    benches.sort(function (a: Bench, b:Bench) {
        return (a.capacity<b.capacity)?1:0;
    });
    let sum_cap=0,i=0;
       
    while(i<benches.length){
      sum_cap+=benches[i].capacity;
      this.allotedBench.push(benches[i]);
      i++;
      if(sum_cap>=numOfPersons)break;
    }
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

    var checkAvailabilityRequest={
      noOfPersons:this.numOfPersons,
      arrivalTime:arrivalTime,
      departureTime:departureTime,
      benchType:benchType,
      restaurantId:this.rest_id
    }

    console.log(checkAvailabilityRequest);

    this.bookService.chechAvailability(checkAvailabilityRequest);
  
    this.bookService.selectedBenches.subscribe((benches)=>{
      this.benches=benches;
      this.getSuitableTable(this.benches,this.numOfPersons);

      if(this.allotedBench.length==0){
        console.log('Table not available !!!');
      }
      else{

        console.log('Alloted Table is: ',this.allotedBench);

        var bookTableRequest={
          noOfPersons:this.numOfPersons,
          arrivalTime:arrivalTime,
          departureTime:departureTime,
          restaurantId:this.rest_id,
          payment:this.allotedBench[0].price,
          paymentId:"1",
          userId:1,
          benchId:this.allotedBench[0].benchId
        };

        //call the book table api

        this.bookService.bookTable(bookTableRequest);
        this.bookService.bookingResponse.subscribe((response)=>{
          if(response.httpStatusCode==200){
            this.bookingId=parseInt(response.responseMessage);

            // calling foodOrderApi

            // var foodOrderResponse={
            //   bookingId:this.bookingId,

            // };
          }
          else{
            console.log("Booking Failed !!!");
          }
        });
        
      }


    })

    


    

  }

}
