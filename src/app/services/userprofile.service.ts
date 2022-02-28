import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
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

  getUser(userId:number) {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        users: User;
      }>(environment.backendUrl + environment.userIdEndpoint + userId)
      .subscribe((data) => {
        console.log(data);
        this.userProfile.next(data.users[0]);
      });
  }

  getRestaurantByUser(userId: any) {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        restaurants: Restaurant[];
      }>(environment.backendUrl + environment.userRestaurantEndpoint + userId)
      .subscribe((data) => {
        this.restaurantProfile.next(data.restaurants[0]);
      });
  }

  addBench(data: any) {
    this.http
      .post(environment.backendUrl + environment.benchCreateEndpoint, data)
      .subscribe((res) => {
        this.getAllBenches(data.restaurantId)
      });
  }

  getAllBenches(id: number) {
    this.http
      .get<{
        httpStatusCode: number;
        responseMessage: string;
        benches: Table[];
      }>(environment.backendUrl + environment.benchAllEndpoint + id)
      .subscribe((data) => {
        this.benchs = data.benches;
        this.benchList.next(this.benchs.slice());
      });
  }

  deleteBench(id:any){
    this.http.delete(
      environment.backendUrl+environment.benchDeleteEndpoint+id
    ).subscribe((response)=>{
      console.log(response)
    })
  }

  updateRestaurantDetail(data:any){
    this.http.put(
      environment.backendUrl+environment.updateRestInfoEndpoint,data
    ).subscribe((res)=>{
      console.log(res)
    })
  }

  updateBenchDetail(data:any){
    this.http.put(
      environment.backendUrl+environment.updateBenchInfoEndpoint,data
    ).subscribe((res)=>{
      console.log(res)
    })
  }
  updateUserDetail(data:any){
    this.http.put(
      environment.backendUrl+environment.updateUserInfoEndpoint,data
    ).subscribe((res)=>{
      console.log(res)
    })
  }
}
