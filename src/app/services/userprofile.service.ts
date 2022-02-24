import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Restaurant } from './restaurant.model';
import { Table } from './table.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserprofileService {
  benchs!: Table[];
  benchList = new Subject<Table[]>();

  userProfile = new Subject<User>();
  restaurantProfile = new Subject<Restaurant>();
  constructor(private http: HttpClient) {}

  getUser() {
    const url = 'http://localhost:8080/api/user/find/1';
    this.http
      .get<{ httpStatusCode: number; responseMessage: string; users: User }>(
        url
      )
      .subscribe((data) => {
        console.log(data);
        this.userProfile.next(data.users[0]);
      });
  }

  getRestaurantByUser(userId: number) {
    const url = 'http://localhost:8080/api/user/restaurant/' + userId;
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        restaurants: Restaurant;
      }>(url)
      .subscribe((data) => {
        this.restaurantProfile.next(data.restaurants[0]);
      });
  }

  addBench(data: any) {
    console.log(data);
    const url = 'http://localhost:8080/api/bench/create';
    this.http.post(url, data).subscribe((data) => {
      console.log(data);
    });
  }

  getAllBenches(id: number) {
    const url = 'http://localhost:8080/api/bench/restaurant/' + id;
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        benches: Table[];
      }>(url)
      .subscribe((data) => {
        this.benchs = data.benches;
        this.benchList.next(this.benchs.slice());
      });
  }
}
