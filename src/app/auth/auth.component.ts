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
import { User } from '../services/user.model';
import { AuthService } from 'app/services/auth.service';
import { Cuisine } from 'app/services/cuisine.model';
import { RestaurantService } from 'app/services/restaurants.service';
import { Router } from '@angular/router';

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
  filteredCuisines: Observable<Cuisine[]>;
  cuisines: Cuisine[] = [];
  allCuisines: Cuisine[] = [];

  @ViewChild('cuisineInput')
  cuisineInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;

  private subscription?: Subscription;

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.filteredCuisines = this.cuisineCtrl.valueChanges.pipe(
      startWith(null),
      map((cuisine) =>
        cuisine ? this._filter(cuisine) : this.allCuisines.slice()
      )
    );
  }

  ngOnInit(): void {
    this.restaurantService.getCuisines();
    this.subscription = this.restaurantService.cuisineList.subscribe(
      (cuisines) => {
        this.allCuisines = cuisines;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const cuisine = this.cuisines.filter((cuisine) => {
        return cuisine.cuisineName == value;
      });
      this.cuisines.push(cuisine[0]);
    }

    event.chipInput!.clear();

    this.cuisineCtrl.setValue(null);
    console.log(this.cuisines);
  }

  remove(cuisine: Cuisine): void {
    this.cuisines = this.cuisines.filter((inCuisine) => {
      return inCuisine.cuisineId != cuisine.cuisineId;
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const cuisine = this.cuisines.filter((cuisine) => {
      return cuisine.cuisineName == event.option.value;
    });
    this.cuisines.push(cuisine[0]);
    this.cuisineInput.nativeElement.value = '';
    this.cuisineCtrl.setValue(null);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.allCuisines?.filter((cuisine) =>
      cuisine.cuisineName.toLowerCase().includes(filterValue)
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
            this.router.navigate(['/profile']);
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
  }

  onSubmitButton(registerationInfo: {
    FirstName: string;
    LastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    isOwner: boolean;
  }) {
    const user: User = {
      roleName: registerationInfo.isOwner ? 'owner' : 'User',
      userEmail: registerationInfo.email,
      userName: registerationInfo.FirstName,
      userPhoneNumber: registerationInfo.phoneNumber,
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
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
  }
}
