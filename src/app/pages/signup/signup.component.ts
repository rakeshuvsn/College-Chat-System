import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertType } from '../../enums/alert-type.enum';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../services/auth.service';
import {LoadingService} from '../../services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpService} from '../../services/http.service';

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
    private route: ActivatedRoute,
    private httpService: HttpService
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
      userId: ['', [Validators.required]],
      role: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    const { email, password, userId, role } = this.signupForm.value;

    if (this.signupForm.controls['password'].value === this.signupForm.controls['confirmPassword'].value) {
      if ( this.signupForm.valid) {
        this.loadingService.isLoading.next(true);
        if (role === 'Student') {
          this.createStudentSignIn(userId, email);
        } else {
          this.createFacultySignIn(userId, email);
        }
      } else {
        this.displayError('Please enter valid name, email, password details');
      }
    } else {
      this.displayError('Your Passwords should match');
    }
  }

  createStudentSignIn(userId, email) {
    this.subscriptions.push(
      this.httpService.fetchUsersByRoleId(userId).subscribe(data => {
        if (data && data.length > 0) {
          this.displayError('Your ID already exists as signed up User.');
          this.loadingService.isLoading.next(false);
        } else {
          this.httpService.fetchUsersByEmail(userId).subscribe(data1 => {
            if (data1 && data1.length > 0) {
              this.displayError('Your Email already exists as signed up User.');
              this.loadingService.isLoading.next(false);
            } else {
              this.subscriptions.push(
                this.httpService.fetchStudents(userId).subscribe(data2 => {
                  if (data2.length === 1 && data2[0].email === email) {
                    this.createUserLoginAndSignup(data2[0]);
                  } else {
                    this.displayError('We are unable to find you, Please Contact Administrator.');
                    this.loadingService.isLoading.next(false);
                  }
                })
              );
            }
          });
        }
      })
    );
  }

  createFacultySignIn(userId, email) {
    this.subscriptions.push(
      this.httpService.fetchUsersByRoleId(userId).subscribe(data => {
        if (data && data.length > 0) {
          this.displayError('Your ID already exists as signed up User.');
          this.loadingService.isLoading.next(false);
        } else {
          this.httpService.fetchUsersByEmail(email).subscribe(data1 => {
            if (data1 && data1.length > 0) {
              this.displayError('Your Email already exists as signed up User.');
              this.loadingService.isLoading.next(false);
            } else {
              this.subscriptions.push(
                this.httpService.fetchFaculty(userId).subscribe(data2 => {
                  if (data2.length === 1 && data2[0].email === email) {
                    this.createUserLoginAndSignup(data2[0]);
                  } else {
                    this.displayError('We are unable to find you, Please Contact Administrator.');
                    this.loadingService.isLoading.next(false);
                  }
                })
              );
            }
          });
        }
      })
    );
  }

  createUserLoginAndSignup(user) {
    const { email, password } = this.signupForm.value;
    this.authService.signup(user, email, password).subscribe(isSuccess => {
      if (isSuccess) {
        this.router.navigate(['/login']);
        this.displaySuccess('Your account is created successfully, Please Login!!');
        this.loadingService.isLoading.next(false);
      } else {
        this.displayError('There is a problem in creating your account!!');
        this.loadingService.isLoading.next(false);
      }
    });
  }

  displayError(message) {
    const failedSignedAlert = new Alert(message, AlertType.Danger);
    this.alertService.alerts.next(failedSignedAlert);
    this.loadingService.isLoading.next(false);
  }

  displaySuccess(message) {
    const failedSignedAlert = new Alert(message, AlertType.Success);
    this.alertService.alerts.next(failedSignedAlert);
    this.loadingService.isLoading.next(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}


