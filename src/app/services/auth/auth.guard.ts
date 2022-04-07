import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
 @Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin ( url: string) : boolean | UrlTree {
    console.log(this.authService.checkLogin());
    if (this.authService.checkLogin()) {
      console.log("logged in here");
      return true;
    
    }
    //this.authService.checkLogin();
    return false;
  }
        
}
