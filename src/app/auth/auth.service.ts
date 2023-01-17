import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {JWTResponse} from "../types/JWTResponse";
import {AppCookieService} from "../services/app-cookie.service";
import {JwtService} from "../services/jwt.service";
import {LoginRequest} from "../types/LoginRequest";
import {RegisterRequest} from "../types/RegisterRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl: string = 'http://localhost:8080';
  isAuthenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private appCookieService: AppCookieService
  ) {}

  register(credentials: Partial<RegisterRequest>) {
    const url = this.serverUrl + '/register';
    return this.http.post(url, credentials).pipe(
      map(data => data as number),
      catchError((err) => {
        alert(err);
        return of(-1);
      })
    );
  }

  login(credentials: Partial<LoginRequest>) {
    const url = this.serverUrl + '/api/auth/login';
    return this.http.post(url, credentials).pipe(
      tap(data => {
        this.processReceivedTokens(data as JWTResponse);
      }),
      catchError(
        (err) => {
          alert('Попробуйте связаться с сервером позже.' + err);
          return of({});
        }
      )
    );
  }

  processReceivedTokens(jwtResponse: JWTResponse) {
    this.jwtService.setTokens(jwtResponse.accessToken, jwtResponse.refreshToken);
  }

  refreshAccessToken(): Observable<any> {
    let refreshToken: { [key: string]: string } = {
      refreshToken: this.appCookieService.get('refresh')
    };

    /*return new Promise((resolve, reject) => {
      this.http.post('/api/auth/token', refreshToken)
        .pipe(
          map(data => data as JWTResponse)
        )
        .subscribe({
          next: (response) => {
            if (response.accessToken) {
              this.appCookieService.set('jwt', response['accessToken']);
              this.appCookieService.set('refresh', response['refreshToken']);
              resolve(response);
            } else {
              reject(response);
            }
          },
          error: err => {
            reject(err);
          }
        });
    });*/
    return this.http.post('/api/auth/token', refreshToken)
        .pipe(
          // map(data => data as JWTResponse)
        );
  }

  getJWT(): string | null {
    return this.appCookieService.get('jwt');
  }
}
