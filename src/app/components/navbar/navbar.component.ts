import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AlertType } from '../../enums/alert-type.enum';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import {AdminLoginComponent} from '../../pages/admin/admin-login/admin-login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;

  isLoggedin = false;
  private subscriptions: Subscription[] = [];
  adminLoginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
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

  navigateToAdmin() {
    this.bsModalRef = this.modalService.show(AdminLoginComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  adminLogin() {

  }

}
