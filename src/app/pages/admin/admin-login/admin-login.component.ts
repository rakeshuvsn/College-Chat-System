import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AlertService} from '../../../services/alert.service';
import {AuthService} from '../../../services/auth.service';
import {AlertType} from '../../../enums/alert-type.enum';
import { Alert } from './../../../classes/alert';
import {WebstorageService} from '../../../services/webstorage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public adminLoginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private authService: AuthService,
    private alertService: AlertService,
    private webStorage: WebstorageService
  ) { }

  ngOnInit() {
    this.createAdminLoginForm();
  }

  createAdminLoginForm() {
    this.adminLoginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  adminLogin() {
    const username = this.adminLoginForm.controls['username'].value;
    const password = this.adminLoginForm.controls['password'].value;
    this.authService.adminLogin().subscribe(document => {
      if ( document.data().username === username && document.data().password === password) {
        this.webStorage.setLoginStatus(true, 'admin');
        this.modalRef.hide();
        this.authService.isLoggedIn.emit(true);
        this.router.navigate(['/admin']);
      } else {
        this.modalRef.hide();
        this.alertService.alerts.next(new Alert('Error while login', AlertType.Danger));
      }
    });
  }
}
