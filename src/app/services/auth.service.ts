import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(user: any) {
    this.http
      .post(environment.backendUrl + environment.createUserEndpoint, user)
      .subscribe((resData) => {
        console.log(resData);
      });
  }

  login(user: any) {
    this.http
      .post(environment.backendUrl + environment.loginEndpoint, user)
      .subscribe((resData) => {
        console.log(resData);
      });
  }
}
