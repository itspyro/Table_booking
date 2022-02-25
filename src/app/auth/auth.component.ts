import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { DailogComponent } from './dailog/dailog.component';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { User } from '../services/user.model';
import { AuthService } from 'app/services/auth.service';
//import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Asian'];
  allFruits: string[] = [
    'Asian',
    'Bakery',
    'Punjabi',
    'Beverages',
    'Chinese Continental',
    'Desserts',
    'Drinks',
    'Fast Food',
    'French',
    'Gujarati',
    'Italian',
    'Juices',
    'Lucknowi',
    'Marathi',
    'Mediterranean',
    'Mexican',
  ];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;

  constructor(
    private readonly dialog: MatDialog,
    private authService: AuthService
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
  ngOnInit(): void {}

  openDialog() {
    console.error('Openning!');
    this.dialog.open(DailogComponent);
    console.error('Openning!');
  }

  onLoginButton(loginInfo: { email: 'string'; password: 'string' }) {
    this.authService.login({
      userEmail: loginInfo.email,
      password: loginInfo.password,
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
      roleName: registerationInfo.isOwner ? 'Owner' : 'User',
      userEmail: registerationInfo.email,
      userName: registerationInfo.FirstName,
      userPhoneNumber: registerationInfo.phoneNumber,
    };
    this.authService.createUser({
      ...user,
      password: registerationInfo.password,
    });
  }
}
