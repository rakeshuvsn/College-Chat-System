import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertType } from '../../enums/alert-type.enum';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../services/auth.service';
import {LoadingService} from '../../services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  public submit(): void {
    const { email, password, firstName, lastName } = this.signupForm.value;

    if ( this.signupForm.valid) {
      this.loadingService.isLoading.next(true);
      this.subscriptions.push(
        this.authService.signup(firstName, lastName, email, password).subscribe(isSuccess => {
          if (isSuccess) {
            console.log(this.returnUrl);
            this.router.navigate([this.returnUrl]);
            this.loadingService.isLoading.next(false);
          } else {
            const failedSignedAlert = new Alert('There is a problem in creating your account!!', AlertType.Danger);
            this.alertService.alerts.next(failedSignedAlert);
            this.loadingService.isLoading.next(false);
          }
        })
      );
    } else {
      const failedSignedAlert = new Alert('Please enter valid name, email, password details', AlertType.Danger);
      this.alertService.alerts.next(failedSignedAlert);
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}


