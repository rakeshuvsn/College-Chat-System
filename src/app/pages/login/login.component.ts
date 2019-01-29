import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertType } from '../../enums/alert-type.enum';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs/Subscription';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    const { email, password } = this.loginForm.value;
    if ( this.loginForm.valid ) {
      this.loadingService.isLoading.next(true);
      this.subscriptions.push(
        this.authService.login(email, password).subscribe(isSuccess => {
          console.log('reached', this.returnUrl);
          if ( isSuccess ) {
            this.router.navigateByUrl(this.returnUrl);
            this.loadingService.isLoading.next(false);
          } else {
            this.loadingService.isLoading.next(false);
          }
        })
      );
    } else {
      const failedLoginAlert = new Alert('Please enter valid login details', AlertType.Danger);
        this.loadingService.isLoading.next(false);
        this.alertService.alerts.next(failedLoginAlert);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}


