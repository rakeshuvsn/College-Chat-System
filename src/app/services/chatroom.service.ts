import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoadingService} from './loading.service';
import { switchMap } from 'rxjs/Operators';
import { of } from 'rxjs/Observable/of';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';
import { AngularFireStorage  } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public chatrooms: Observable<any>;
  public changeChatroom: BehaviorSubject<string | null> =  new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {

    this.selectedChatroom = this.changeChatroom.pipe(switchMap(chatroomId => {
      if ( chatroomId ) {
        this.loadingService.isLoading.next(true);
        return db.doc(`chatrooms/${chatroomId}`).valueChanges();
      } else {
        return of(null);
      }
    }));

    this.selectedChatroomMessages = this.changeChatroom.pipe(switchMap(chatroomId => {
      if ( chatroomId ) {
        this.loadingService.isLoading.next(true);
        return db.collection(`chatrooms/${chatroomId}/messages`, ref => {
          return ref.orderBy('createdAt', 'desc');
        }).valueChanges().map(arr => arr.reverse());
      } else {
        return of(null);
      }
    }));

    this.chatrooms = this.db.collection('chatrooms').valueChanges();
  }

  public createMessage(text: string): void {
    const chatroomId = this.changeChatroom.value;
    const message = {
      message: text,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapShot
    };

    this.db.collection(`chatrooms/${chatroomId}/messages`).add(message);

  }

  public createAttachment(file) {
    const chatroomId = this.changeChatroom.value;
    const message = {
      attachmentUrl: '',
      name: file.name,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapShot
    };
    return this.storage.upload(`chatrooms/${chatroomId}/${file.name}`, file).then(data => {
      return data.ref.getDownloadURL().then(urlData => {
        message.attachmentUrl = urlData;
        return this.db.collection(`chatrooms/${chatroomId}/messages`).add(message).then(() => {
          return {};
        }).catch(error => {
          console.log(error);
        });
      });
    });
  }

  fetchChatrooms() {
    return this.db.collection('chatrooms').valueChanges();
  }
}
