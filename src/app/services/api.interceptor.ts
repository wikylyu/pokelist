import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return throwError(() => new Error('400'));
        } else if (err.status === 401) {
          this.router.navigate(['/login']);
          return new Observable<never>();
        } else if (err.status === 403) {
          return throwError(() => new Error('403'));
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}
