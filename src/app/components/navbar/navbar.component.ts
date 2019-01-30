import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedin = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authService.isLoggedIn.subscribe(value => {
        this.isLoggedin = value;
      })
    );
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
