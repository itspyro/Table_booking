import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BookingData } from './booking.model';
import { RestaurantService } from './restaurants.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient, private restService:RestaurantService) {}

  bookTable(data:BookingData) {
    this.http
      .post<{httpStatusCode:number,responseMessage:string}>(environment.backendUrl + environment.bookingEndpoint, data)
      .subscribe((resData) => {
        console.log(resData);
      });
  }

}