import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/Operators';
import { from } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { WebstorageService } from './webstorage.service';
import {Observable} from 'rxjs';
import { AngularFireStorage  } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  studentCollection: Observable<any>;
  facultyCollection: AngularFirestoreCollection<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private webStorage: WebstorageService,
    private storage: AngularFireStorage
  ) {
    this.facultyCollection = this.db.collection('faculty');
  }

  fetchStudents(userId): Observable<any> {
    return this.db.collection('students', ref => ref.where('studentId', '==', userId)).valueChanges();
  }

  fetchFaculty(userId): Observable<any>  {
    return this.db.collection('faculty', ref => ref.where('facultyId', '==', userId)).valueChanges();
  }

  fetchUserById(userId): Observable<any> {
    return this.db.doc(`users/${userId}`).valueChanges();
  }

  saveProfilePicture(file, user) {
    return this.storage.upload(`users/${file.name}`, file).then(data => {
      return data.ref.getDownloadURL().then(urlData => {
        user.photoUrl = urlData;
        return this.db.doc(`users/${user.id}`).set(user).then(metaData => {
          return metaData;
        }).catch(error => {
          console.log(error);
        });
      });
    });
  }
}
