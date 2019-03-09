import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebstorageService} from '../../services/webstorage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private webStorage: WebstorageService
  ) { }

  ngOnInit() {
/*    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (this.webStorage.getLoginStatus().isLoggedIn !== 'true') {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl(this.returnUrl);
    }*/
  }

}
