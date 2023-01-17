import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwt: string = '';
  private refresh: string = '';
  private decodedJwt: { [key: string]: string } = {};
  private decodedRefresh: { [key: string]: string } = {};

  constructor() {
  }

  setToken(token: string) {
    if (token) {
      this.jwt = token;
    }
  }

  setTokens(jwt: string, refresh:string) {
    if (jwt || refresh) {
      this.jwt = jwt;
      this.refresh = refresh;
    }
  }

  decodeToken() {
    if (this.jwt) {
      this.decodedJwt = jwtDecode(this.jwt);
    }
  }

  getDecodeToken() {
    return jwtDecode(this.jwt);
  }

  getEmail(): string | null {
    this.decodeToken();
    return this.decodedJwt ? this.decodedJwt['email'] : null;
  }

  getExpiryTime(): number | null {
    this.decodeToken();
    return this.decodedJwt ? +this.decodedJwt['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    // Если у токена осталось меньше 5 секунд, считаем, что он протух
    return (expiryTime) ? ((1000 * expiryTime) - (new Date()).getTime()) < 5000 : false;
  }
}
