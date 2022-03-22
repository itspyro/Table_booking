import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthUser } from './auth-user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthUser | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: any) {
    return this.http
      .post<{
        httpStatusCode: number;
        responseMessage: string;
        token: string;
        userId: number;
      }>(environment.backendUrl + environment.createUserEndpoint, user)
      .pipe(
        tap((resData) => {
          this.handleAuthentication(resData.token, resData.userId);
        })
      );
  }

  login(user: any) {
    return this.http
      .post<{
        httpStatusCode: number;
        responseMessage: string;
        token: string;
        userId: number;
      }>(environment.backendUrl + environment.loginEndpoint, user)
      .pipe(
        tap((resData) => {
          this.handleAuthentication(resData.token, resData.userId);
        })
      );
  }

  private handleAuthentication(token: string, userId: number) {
    const expirationDate = new Date(new Date().getTime() + 3600000);
    const user = new AuthUser(token, userId, expirationDate);
    this.user.next(user);
    this.autoLogout(3600000);
    sessionStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    sessionStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData = sessionStorage.getItem('userData');
    const data = userData != null ? JSON.parse(userData) : null;
    if (!data) {
      return;
    }
    const user = new AuthUser(
      data._token,
      data.userId,
      new Date(data._tokenExpirationDate)
    );

    if (user.token) {
      this.user.next(user);
      const expirationDuration =
        new Date(data._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
