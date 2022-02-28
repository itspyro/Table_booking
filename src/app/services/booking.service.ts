import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Bench } from './bench.model';
import { BookingData } from './booking.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  selectedBenches=new Subject<Bench[]>();
  bookingResponse=new Subject<{httpStatusCode:number,responseMessage:string}>();

  chechAvailability(data){
    this.http.post<{httpStatusCode:number,responseMessage:string,benches:Bench[]}>(environment.backendUrl+environment.checkAvailabilityEndpoint,data)
    .subscribe((resdata)=>{
      console.log(resdata);
      this.selectedBenches.next(resdata.benches);
    })
  }

  bookTable(data:BookingData) {
    this.http
      .post<{httpStatusCode:number,responseMessage:string}>(environment.backendUrl + environment.bookingEndpoint, data)
      .subscribe((resData) => {
          this.bookingResponse.next(resData);
        });
  }



}