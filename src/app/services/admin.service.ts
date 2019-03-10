import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoadingService} from './loading.service';
import { switchMap, map } from 'rxjs/Operators';
import { of } from 'rxjs/Observable/of';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  registerStudent(newUser): Observable<boolean> {
    return from (this.db.collection(`students`).add(newUser).then(data => {
        return true;
      }).catch(error => {
        return false;
      })
    );
  }

  registerFaculty(newUser): Observable<boolean> {
    return from (this.db.collection(`faculty`).add(newUser).then(data => {
        return true;
      }).catch(error => {
        return false;
      })
    );
  }
}
