import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith, Subscription } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { RestaurantService } from 'app/services/restaurants.service';
import { Location } from '@angular/common';
import { Cuisine } from 'app/services/cuisine.model';
import { User } from 'app/services/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  cuisineCtrl = new FormControl();
  filteredCuisines: Observable<string[]>;
  cuisines: string[] = [];
  allCuisines: string[] = [];
  allRestCuisines?: Cuisine[];

  @ViewChild('cuisineInput')
  cuisineInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;

  private subscription?: Subscription;

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private _location: Location
  ) {
    this.filteredCuisines = this.cuisineCtrl.valueChanges.pipe(
      startWith(null),
      map((cuisine: string | null) =>
        cuisine ? this._filter(cuisine) : this.allCuisines.slice()
      )
    );
  }

  ngOnInit(): void {
    this.restaurantService.getCuisines();
    this.subscription = this.restaurantService.cuisineList.subscribe(
      (cuisines) => {
        this.allRestCuisines = cuisines;
        this.allCuisines = [];
        cuisines.map((cuisine) => {
          this.allCuisines.push(cuisine.cuisineName);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.cuisines.push(value);
      console.log(this.cuisines);
    }

    event.chipInput!.clear();

    this.cuisineCtrl.setValue(null);
    console.log(this.cuisines);
  }

  remove(cuisine: string): void {
    const index = this.cuisines.indexOf(cuisine);

    if (index >= 0) {
      this.cuisines.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.cuisines.push(event.option.viewValue);
    this.cuisineInput.nativeElement.value = '';
    this.cuisineCtrl.setValue(null);
    console.log(this.cuisines);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCuisines?.filter((cuisine) =>
      cuisine.toLowerCase().includes(filterValue)
    );
  }

  onLoginButton(loginInfo: { email: 'string'; password: 'string' }) {
    this.isLoading = true;
    this.authService
      .login({
        userEmail: loginInfo.email,
        password: loginInfo.password,
      })
      .subscribe({
        next: (resData) => {
          console.log(resData);
          if (resData.httpStatusCode == 200) {
            this._location.back();
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
  }

  onSubmitButton(registerationInfo: {
    Username: string;
    email: string;
    password: string;
    phoneNo: string;
    isOwner: boolean;
    restDetails: any;
  }) {
    let restCuisines: Cuisine[] = [];

    restCuisines = this.allRestCuisines!.filter((restcuisine) => {
      return this.cuisines.includes(restcuisine.cuisineName);
    });

    const user: User = {
      roleName: registerationInfo.isOwner ? 'owner' : 'User',
      userEmail: registerationInfo.email,
      userName: registerationInfo.Username,
      userPhoneNumber: registerationInfo.phoneNo,
    };
    this.isLoading = true;
    this.authService
      .createUser({
        ...user,
        password: registerationInfo.password,
      })
      .subscribe({
        next: (resData) => {
          this.isLoading = false;
          if (registerationInfo.isOwner) {
            const restaurant = {
              userId: resData.userId,
              cuisineIds: restCuisines,
              restaurantName: registerationInfo.restDetails.restaurantName,
              address: {
                addressLine1: registerationInfo.restDetails.addressLine1,
                addressLine2: registerationInfo.restDetails.addressLine2,
                city: registerationInfo.restDetails.city,
                pincode: registerationInfo.restDetails.pincode,
              },
              gstIn: registerationInfo.restDetails.gstIn,
              contact: registerationInfo.phoneNo,
              nonVeg:
                registerationInfo.restDetails.nonVeg == true ? true : false,
              openingTime: '10:00 AM',
              closingTime: '11: 00 PM',
            };
            this.restaurantService.addRestaurant(restaurant);
          }
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
  }
}
