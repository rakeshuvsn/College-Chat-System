import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {ChatroomService} from '../../../../services/chatroom.service';
import {WebstorageService} from '../../../../services/webstorage.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {

  public currentUser: any;
  @Input() chatRooms: any;
  constructor(
    private chatRoomService: ChatroomService,
    private webStorage: WebstorageService
  ) {}

  ngOnInit() {
    this.currentUser = this.webStorage.getUserObject().user;
  }

}
