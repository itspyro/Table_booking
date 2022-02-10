import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent {
  restaurantCard : any
  constructor(private http:HttpClient,private router:Router){
    this.http.get('http://localhost:3000/restaurant').subscribe((Response: any)=>{
      console.log(Response)
      this.restaurantCard = Response;
    })
  }
  restaurantProfile(){
    //this.router.navigateByUrl('restaurant-info')
  }
}
