import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';
import {AlertType} from '../enums/alert-type.enum';
import { Alert } from './../classes/alert';
import {WebstorageService} from '../services/webstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private webStorage: WebstorageService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.webStorage.getLoginStatus().role === 'admin' && this.webStorage.getLoginStatus().isLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      this.alertService.alerts.next(new Alert('You Must Sign In.', AlertType.Danger));
      return false;
    }
  }
}
