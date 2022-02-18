import { Component, Input, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { Restaurant } from 'app/services/restaurant.model';

@Component({
  selector: 'app-restprofile',
  templateUrl: './restprofile.component.html',
  styleUrls: ['./restprofile.component.css']
})
export class RestprofileComponent implements OnInit {

  constructor() { }

  week_days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  today_day="Mon";
  address_props={};
  details={
    "restaurantId":"1",
    "restaurantName":"Tamasha",
    "address":"242, Cannaught Place, near Flag, New Delhi, 251001",
    "gstIn":"d3h92",
    "contact":"908439320",
    "nonVeg":true,
    "description":"blah blah",
    "cuisines":["South Indian","Gujrati","Bengali","Marathi","Italian","Punjabi Rasoi","Mediterranean"],
    "user":3,
    "opening_hours":{
      "start":"10:30 am",
      "end":"10 pm"
    },
    "rating":"5"
  };

  ngOnInit(): void {
    this.address_props=this.breakAddress(this.details.address);
  }

  breakAddress(address : string){
    var temp=address.split(',');
    var temp_address={};
    var len=temp.length;
    temp_address["building_no"]=temp[0].trim();
    temp_address["street"]=temp[1].trim();
    temp_address["city"]=temp[len-2].trim();
    temp_address["pin_code"]=temp[len-1].trim();
    if(len==5)
      temp_address["landmark"]=temp[0].trim();
    else
      temp_address["landmark"]="";
    return temp_address;
  }
  

  activeLink = 'Overview';
  //background: ThemePalette = undefined;

  isOpen(){
    var datetime=this.getTodayDay();
    // var temp1=datetime[3]["start"].split(' ');
    // var temp2=datetime[3]["end"].split(' ');
    var temp1=this.details.opening_hours.start.split(' ');
    var temp2=this.details.opening_hours.end.split(' ');
    var ampm1=temp1[1];
    var ampm2=temp2[1];
    var open_start_hr=parseInt((temp1[0].split(':'))[0]);
    var open_start_min=parseInt((temp1[0].split(':'))[1]);

    var open_end_hr=parseInt((temp2[0].split(':'))[0]);
    var open_end_min=parseInt((temp2[0].split(':'))[1]);

    if(ampm1=="pm"){
      open_start_hr+=12;
    }
    if(ampm2=="pm"){
      open_end_hr+=12;
    }

    var curr_hr=datetime[0];
    var curr_min=datetime[1];

    // console.log(datetime);
    // console.log(temp1,temp2);
    // console.log(open_start_hr,open_start_min);
    // console.log(open_end_hr,open_end_min);
    // console.log(curr_hr,curr_min);

    if(curr_hr>open_start_hr&&curr_hr<open_end_hr){
      return true;
    }
    else if(curr_hr==open_start_hr){
      return (curr_min>=open_start_min);
    }
    else if(curr_hr==open_end_hr){
      return (curr_min<open_end_min);
    }
    else{
      return false;
    }
  }

  getTodayDay(){
    var curr_date=new Date();
    var day=curr_date.getDay();

    switch(day){
      case 0:this.today_day="Sun"; break;
      case 1:this.today_day="Mon"; break;
      case 2:this.today_day="Tues"; break;
      case 3:this.today_day="Wed"; break;
      case 4:this.today_day="Thurs"; break;
      case 5:this.today_day="Fri"; break;
      case 6:this.today_day="Sat"; break;
    }

    return [curr_date.getHours(),curr_date.getMinutes(),this.today_day];

  }

  


}
