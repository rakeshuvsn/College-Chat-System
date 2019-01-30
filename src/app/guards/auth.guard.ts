import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertType } from './../enums/alert-type.enum';
import { AlertService } from './../services/alert.service';
import { Alert } from './../classes/alert';
import { AuthService } from './../services/auth.service';
import { map, take, tap } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      console.log(this.authService.authenticated);
    if (this.authService.authenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      this.alertService.alerts.next(new Alert('You Must Sign In.', AlertType.Danger));
      return false;
    }
  }
}
