import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private _snackbar: MatSnackBar) {}

  openSnackBar(message: string) {
    this._snackbar.open(message, 'Okay');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
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
      })
    );
  }
}
