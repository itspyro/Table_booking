import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  cities=["Delhi","Mumbai","Dehradun","Meerut"];

  @Input() size:string="60vw";
  @Input() hint:string="Search Restaurants in preferred city.";

  ngOnInit(): void {
  }
  constructor(private router: Router) {}

  // displayLocation = (latitude, longitude) => {
  //   var request = new XMLHttpRequest();

  //   var method = 'GET';
  //   var url =
  //     'http://maps.googleapis.com/maps/api/geocode/json?latlng=' +
  //     latitude +
  //     ',' +
  //     longitude +
  //     '&sensor=true';
  //   var async = true;

  //   request.open(method, url, async);
  //   request.onreadystatechange = function () {
  //     if (request.readyState == 4 && request.status == 200) {
  //       var data = JSON.parse(request.responseText);
  //       var address = data.results[0];
  //       console.log(address);
  //       console.log(address.formatted_address);
  //     }
  //   };
  //   request.send();
  // };

  // successCallback = (position) => {
  //   var x = position.coords.latitude;
  //   var y = position.coords.longitude;
  //   console.log(x, y);
  //   this.displayLocation(x, y);
  // };

  // errorCallback = (error) => {
  //   var errorMessage = 'Unknown error';
  //   switch (error.code) {
  //     case 1:
  //       errorMessage = 'Permission denied';
  //       break;
  //     case 2:
  //       errorMessage = 'Position unavailable';
  //       break;
  //     case 3:
  //       errorMessage = 'Timeout';
  //       break;
  //   }
  //   console.log(error);
  // };

  // options = {
  //   enableHighAccuracy: true,
  //   timeout: 4000,
  //   maximumAge: 0,
  // };

  // detectLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     this.successCallback,
  //     this.errorCallback,
  //     this.options
  //   );
  // };

  onSubmit() {
    this.router.navigate(['restaurants']);
  }

}
