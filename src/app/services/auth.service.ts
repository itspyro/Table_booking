import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthUser } from './auth-user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthUser | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: any) {
    return this.http
      .post<{
        httpStatusCode: number;
        responseMessage: string;
        token: string;
      }>(environment.backendUrl + environment.createUserEndpoint, user)
      .pipe(
        tap((resData) => {
          const user = new AuthUser(resData.token);
          this.user.next(user);
          sessionStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  login(user: any) {
    return this.http
      .post<{
        httpStatusCode: number;
        responseMessage: string;
        token: string;
      }>(environment.backendUrl + environment.loginEndpoint, user)
      .pipe(
        tap((resData) => {
          const user = new AuthUser(resData.token);
          this.user.next(user);
          sessionStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData = sessionStorage.getItem('userData');
    const data = userData != null ? JSON.parse(userData) : null;
    if (!data) {
      return;
    }
    const user = new AuthUser(data._token);
    this.user.next(user);
  }
}
