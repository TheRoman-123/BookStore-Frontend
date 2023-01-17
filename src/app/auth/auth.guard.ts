import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import {AppCookieService} from "../services/app-cookie.service";
import {JwtService} from "../services/jwt.service";

@Injectable({
  providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private appCookieService: AppCookieService,
    private jwtService: JwtService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.jwtService.getEmail()) {
      this.router.navigate(["/login"]).then();
      return false;
    }
    if (this.jwtService.isTokenExpired()) {
        this.router.navigate(["/login"]).then();
        return false;
    }
    return true;
  }
}
