import {Component, Input, OnInit} from '@angular/core';
import { AngularFireStorage  } from '@angular/fire/storage';
import {ChatroomService} from '../../../../services/chatroom.service';
import {LoadingService} from '../../../../services/loading.service';

@Component({
  selector: 'app-chatroom-title-bar',
  templateUrl: './chatroom-title-bar.component.html',
  styleUrls: ['./chatroom-title-bar.component.scss']
})
export class ChatroomTitleBarComponent implements OnInit {

  @Input() title: string;

  constructor(
    private chatService: ChatroomService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  uploadAttachements(files) {
    this.loadingService.isLoading.next(true);
    this.chatService.createAttachment(files[0]).then(() => {
      this.loadingService.isLoading.next(false);

    });
  }

}
