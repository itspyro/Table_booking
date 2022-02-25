import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { RestaurantService } from 'app/services/restaurants.service';
import { RestProfile } from 'app/services/rest_profile.model';
import { Address } from 'app/services/address.model';
//import { Menu } from 'app/services/menu.model';
import { Review } from 'app/services/review.model';
import { AddReviewComponent } from 'app/reviews/add-review/add-review.component';

@Component({
  selector: 'app-restprofile',
  templateUrl: './restprofile.component.html',
  styleUrls: ['./restprofile.component.css'],
})
export class RestprofileComponent implements OnInit {
  id: number = 0;
  restaurant?: RestProfile;
  isLoading: boolean = true;

  week_days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  today_day = 'Mon';
  activeLink = 'Overview';

  address_props?: Address;

  details: RestProfile = {
    restaurantId: 1,
    restaurantName: 'Tamasha',
    address: {
      addressLine1: '242, Cannaught Place',
      addressLine2: 'near flag',
      city: 'New Delhi',
      pincode: '251001',
    },
    gstIn: 'd3h92',
    contact: '908439320',
    nonVeg: true,
    description: 'blah blah',
    openingTime: '10:30 am',
    closingTime: '10 pm',
    thumbnailPhoto: '',
    rating: 5,
    cuisines: [],
    user: {
      userId: 1,
      userName: 'Aakriti',
      userPhoneNumber: '9292001111',
      userEmail: 'Hello@gmail.com',
      roleName: 'User',
    },
    benches: [],
    reviews: [],
    recipeDto: [],
    photoDto: [],
  };

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurantsById(
      +atob(this.route.snapshot.params['id'])
    );
    this.restaurantService.selectedRestaurant.subscribe((restaurant) => {
      this.restaurant = restaurant;
      this.isLoading = !this.restaurant;
      this.restaurantService.setTimings(restaurant.openingTime,restaurant.closingTime);
    });
  }

  isOpen() {
    var datetime = this.getTodayDay();
    // var temp1=datetime[3]["start"].split(' ');
    // var temp2=datetime[3]["end"].split(' ');
    if (this.restaurant) {
      var temp1 = this.restaurant.openingTime.split(' ');
      var temp2 = this.restaurant.closingTime.split(' ');
      var ampm1 = temp1[1];
      var ampm2 = temp2[1];

      var open_start_hr = parseInt(temp1[0].split(':')[0]);
      var open_start_min = parseInt(temp1[0].split(':')[1]);

      var open_end_hr = parseInt(temp2[0].split(':')[0]);
      var open_end_min = parseInt(temp2[0].split(':')[1]);

      if (ampm1 == 'pm') {
        open_start_hr += 12;
      }
      if (ampm2 == 'pm') {
        open_end_hr += 12;
      }

      var curr_hr = datetime[0];
      var curr_min = datetime[1];

      // console.log(datetime);
      // console.log(temp1,temp2);
      // console.log(open_start_hr,open_start_min);
      // console.log(open_end_hr,open_end_min);
      // console.log(curr_hr,curr_min);

      if (curr_hr > open_start_hr && curr_hr < open_end_hr) {
        return true;
      } else if (curr_hr == open_start_hr) {
        return curr_min >= open_start_min;
      } else if (curr_hr == open_end_hr) {
        return curr_min < open_end_min;
      } else {
        return false;
      }
    } else return false;
  }

  getTodayDay() {
    var curr_date = new Date();
    var day = curr_date.getDay();

    switch (day) {
      case 0:
        this.today_day = 'Sun';
        break;
      case 1:
        this.today_day = 'Mon';
        break;
      case 2:
        this.today_day = 'Tues';
        break;
      case 3:
        this.today_day = 'Wed';
        break;
      case 4:
        this.today_day = 'Thurs';
        break;
      case 5:
        this.today_day = 'Fri';
        break;
      case 6:
        this.today_day = 'Sat';
        break;
    }

    return [curr_date.getHours(), curr_date.getMinutes(), this.today_day];
  }

  openAddReview(){
    this.dialog.open(AddReviewComponent)
  }


  directToBooking(){
    if(this.restaurant)
      this.router.navigate(['/booking', btoa((this.restaurant.restaurantId).toString())]);
  }

}
























//breakAddress(address){
//     if(address){
//       var temp1=address?.addressLine1.split(',');
//       var temp2=address?.addressLine2.split(',');

//       var temp_address:Address={buildingNo:"",street:"",area:"",landmark:"",city:"",pinCode:""};

//       temp_address["buildingNo"]=temp1[0].trim();
//       temp_address["street"]=temp1[1].trim();
//       temp_address["city"]=address["city"];
//       temp_address["pinCode"]=address["pincode"];
//       temp_address["area"]=temp2[0].trim();
//       if(temp2.length==2)
//         temp_address["landmark"]=temp2[1].trim();
//       else
//         temp_address["landmark"]="";
//       console.log(temp_address);
//       return temp_address;
//     }

//   }
