import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/Operators';
import { from } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { WebstorageService } from './webstorage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  studentCollection: Observable<any>;
  facultyCollection: AngularFirestoreCollection<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private webStorage: WebstorageService
  ) {
    this.facultyCollection = this.db.collection('faculty');
  }

  fetchStudents(userId): Observable<any> {
    return this.db.collection('students', ref => ref.where('studentId', '==', userId)).valueChanges();
  }

  fetchFaculty(userId): Observable<any>  {
    return this.db.collection('faculty', ref => ref.where('facultyId', '==', userId)).valueChanges();
  }
}
