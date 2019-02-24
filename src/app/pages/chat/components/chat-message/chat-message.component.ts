import { Component, Input,  OnInit } from '@angular/core';
import { Message } from '../../../../classes/message';
import { WebstorageService } from '../../../../services/webstorage.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  public currentUser: any;
  @Input() message: Message;

  constructor(
    private webStorage: WebstorageService
  ) {
    this.currentUser = this.webStorage.getUserObject().user;
  }

  ngOnInit() {
  }

  downloadAttachments() {
    window.open(this.message.attachmentUrl);
  }
}
