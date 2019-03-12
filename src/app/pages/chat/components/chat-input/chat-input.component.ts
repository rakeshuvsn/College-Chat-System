import { Component, OnInit } from '@angular/core';
import {ChatroomService} from '../../../../services/chatroom.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  public newMessageText: string = '';

  constructor(
    private chatroomService: ChatroomService
  ) { }

  ngOnInit() {
  }

  public submit(message: string): void {
    if (message.length > 0) {
      this.chatroomService.createMessage(message);
      this.newMessageText = '';
    }
  }

}
