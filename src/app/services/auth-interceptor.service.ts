import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap, tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private _snackbar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this._snackbar.open(message, 'Okay');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let modifiedReq = req.clone();
        if (!!user && !!user.token) {
          modifiedReq = req.clone({
            headers: new HttpHeaders({ Token: user.token }),
          });
        }
        return next.handle(modifiedReq).pipe(
          tap((event: HttpEvent<any>) => {
            let errorMessage: string | null;
            if (event.type == 4) {
              switch (event.body.httpStatusCode) {
                case 0:
                  errorMessage = 'Connection Problem';
                  this.openSnackBar(errorMessage);
                  break;
                case 404:
                  errorMessage = 'Not Found!';
                  this.openSnackBar(errorMessage);
                  break;
                case 401:
                case 403:
                  errorMessage = 'You are not Authorized!';
                  this.openSnackBar(errorMessage);
                  break;
                case 500:
                  errorMessage = 'Internal Server Error!';
                  this.openSnackBar(errorMessage);
                  break;
                case 400:
                  errorMessage = event.body.responseMessage;
                  if (errorMessage) this.openSnackBar(errorMessage);
              }
            }
          }),
          catchError((error: any) => {
            return throwError(() => {
              this.openSnackBar('An Error Occurred!');
              return error;
            });
          })
        );
      })
    );
  }
}
