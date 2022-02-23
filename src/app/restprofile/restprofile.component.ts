import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'app/services/menu.model';
import { Restaurant } from 'app/services/restaurant.model';
import { RestaurantService } from 'app/services/restaurants.service';
import { Review } from 'app/services/review.model';

@Component({
  selector: 'app-restprofile',
  templateUrl: './restprofile.component.html',
  styleUrls: ['./restprofile.component.css'],
})
export class RestprofileComponent implements OnInit {
  id: number = 0;
  isLoading: boolean = true;
  menuItems?: Menu[];
  reviews?: Review[];

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

  address_props = {};

  restaurant: Restaurant = {
    restaurantId: 1,
    restaurantName: 'Tamasha',
    address: {
      addressLine1: '242,  near Flag,',
      addressLine2: 'Cannaught Place,',
      city: 'New Delhi,',
      pincode: '251001',
    },
    gstIn: 'd3h92',
    contact: '908439320',
    nonVeg: true,
    description: 'blah blah',
    cuisines: [
      { cuisineId: 1, cuisineName: 'South Indian' },
      { cuisineId: 2, cuisineName: 'Gujrati' },
      { cuisineId: 3, cuisineName: 'Bengali' },
      { cuisineId: 4, cuisineName: 'Marathi' },
      { cuisineId: 5, cuisineName: 'Italian' },
      { cuisineId: 6, cuisineName: 'Punjabi' },
      { cuisineId: 7, cuisineName: 'Spanish' },
    ],
    openingTime: '10:30 am',
    closingTime: '10 pm',
    rating: 5,
  };

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurantsById(
      +atob(this.route.snapshot.params['id'])
    );
    this.restaurantService.selectedRestaurant.subscribe((restaurant) => {
      this.restaurant = restaurant;
      this.restaurantService.getRecipeByRestId(this.restaurant.restaurantId);
      this.restaurantService.getReviewsByRestId(this.restaurant.restaurantId);
      this.isLoading = !this.restaurant;
    });
    this.restaurantService.selectedRestaurantMenu.subscribe((menuItems) => {
      this.menuItems = menuItems;
    });
    this.restaurantService.selectedRestaurantReviews.subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  breakAddress(address: string) {
    var temp = address.split(',');
    var temp_address = {};
    var len = temp.length;
    temp_address['building_no'] = temp[0].trim();
    temp_address['street'] = temp[1].trim();
    temp_address['city'] = temp[len - 2].trim();
    temp_address['pin_code'] = temp[len - 1].trim();
    if (len == 5) temp_address['landmark'] = temp[0].trim();
    else temp_address['landmark'] = '';
    return temp_address;
  }

  isOpen() {
    var datetime = this.getTodayDay();
    // var temp1=datetime[3]["start"].split(' ');
    // var temp2=datetime[3]["end"].split(' ');
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
}
