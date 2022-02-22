import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cuisine } from 'app/services/cuisine.model';
import { RestaurantService } from 'app/services/restaurants.service';
import { Subscription } from 'rxjs';
import { DailogComponent } from './dailog/dailog.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  cuisines: string[] = [];
  subscription?: Subscription;

  constructor(private restaurantService: RestaurantService) {}
  ngOnInit(): void {
    this.restaurantService.getCuisines();
    this.subscription = this.restaurantService.cuisineList.subscribe(
      (cuisines: Cuisine[]) => {
        cuisines.map((cuisine) => {
          if (this.cuisines.includes(cuisine.cuisineName)) {
            return;
          }
          this.cuisines.push(cuisine.cuisineName);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  onLoginButton(loginInfo) {
    console.log(loginInfo);
  }
  onSubmitButton(registerationInfo) {
    console.log(registerationInfo);
  }
}
