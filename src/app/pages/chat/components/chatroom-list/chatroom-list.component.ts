import { Component, OnInit } from '@angular/core';
import {ChatroomService} from '../../../../services/chatroom.service';
import {WebstorageService} from '../../../../services/webstorage.service';


@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {

  public currentUser: any;
  constructor(
    private chatRoomService: ChatroomService,
    private webStorage: WebstorageService
  ) {
    this.currentUser = this.webStorage.getUserObject().user;
  }

  ngOnInit() {
  }

}
