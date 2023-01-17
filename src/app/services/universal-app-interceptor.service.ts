import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, filter, finalize, switchMap, take, throwError} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UniversalAppInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any/*Observable<HttpEvent<any>>*/ {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((requestError: HttpErrorResponse) => {
        if (requestError && requestError.status === 401) {
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter((result) => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthToken(request)))
            );
          } else {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshAccessToken().pipe(
              switchMap((token) => {
                this.refreshTokenSubject.next(token);
                return next.handle(this.addAuthToken(request));
              }),
              finalize(() => (this.refreshTokenInProgress = false))
            );
          }
        } else {
          return throwError(() => new Error(requestError.message));
        }
      })
    );
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getJWT();

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }


}
