import { Component, OnInit } from '@angular/core';
import { WebstorageService } from '../../services/webstorage.service';
import { HttpService } from '../../services/http.service';
import { AngularFireStorage  } from '@angular/fire/storage';
import {LoadingService} from '../../services/loading.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentUser: any;
  public currentFile: any = {};

  constructor(
    private webStorage: WebstorageService,
    private httPService: HttpService,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {
    this.currentUser = this.webStorage.getUserObject().user;
  }

  ngOnInit() {
  }

  public uploadPicture(files) {
    this.currentFile = files[0];
  }

  public savePicture() {
    this.loadingService.isLoading.next(true);
    this.httPService.saveProfilePicture(this.currentFile, this.currentUser).then(data => {
      this.httPService.fetchUserById(this.currentUser.id).subscribe(user => {
        this.currentUser = user;
        this.webStorage.setUserObject(user);
        this.loadingService.isLoading.next(false);
      });
      this.currentFile = {};
    });
  }
}
