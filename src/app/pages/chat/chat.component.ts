import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebstorageService} from '../../services/webstorage.service';
import { ChatroomService } from '../../services/chatroom.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chatRooms: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private webStorage: WebstorageService,
    private chatroomService: ChatroomService
  ) { }

  ngOnInit() {
    if (this.webStorage.getLoginStatus().isLoggedIn !== 'true') {
      this.router.navigateByUrl('/login');
    }
    this.chatroomService.fetchChatrooms().subscribe(rooms => {
      this.chatRooms = rooms;
    });

  }

}
