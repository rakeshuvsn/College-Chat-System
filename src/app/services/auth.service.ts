import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertType } from './../enums/alert-type.enum';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { AlertService } from './alert.service';
import { Alert } from './../classes/alert';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/Operators';
import { from } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.currentUser = this.afAuth.authState
      .pipe(switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {

    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user: any) => {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        console.log(user);
        const updateUser = {
          id: user.user.uid,
          email: user.user.email,
          firstName,
          lastName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/college-chat-36c01.appspot.com/o/default_profile_pic.png?alt=media&token=8f4f7703-e69c-44d8-9bc5-54a9d6806e97'
        };

        userRef.set(updateUser);
        return true;
      }).catch((error) => {
        console.log(error);
        return false;
      })
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public logout(): void {
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out.'));
  }
}
