import { Component, OnInit } from '@angular/core';
import { WebstorageService } from '../../services/webstorage.service';
import { HttpService } from '../../services/http.service';
import { AngularFireStorage  } from '@angular/fire/storage';
import {LoadingService} from '../../services/loading.service';
import {AuthService} from '../../services/auth.service';
import { AlertType } from '../../enums/alert-type.enum';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentUser: any;
  public currentFile: any = {};
  public bioText: String = '';

  constructor(
    private webStorage: WebstorageService,
    private httPService: HttpService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.currentUser = this.webStorage.getUserObject().user;
  }

  ngOnInit() {
    this.bioText = this.currentUser.user.bio;
  }

  public uploadPicture(files) {
    this.currentFile = files[0];
  }

  public savePicture() {
    this.loadingService.isLoading.next(true);
    this.httPService.saveProfilePicture(this.currentFile, this.currentUser).then(data => {
      this.httPService.fetchUserById(this.currentUser.id).subscribe(user => {
        this.currentUser = user;
        this.alertService.alerts.next(new Alert('Success: Profile picture uploaded Successfully', AlertType.Success));
        this.webStorage.setUserObject(user);
        this.loadingService.isLoading.next(false);
      });
      this.currentFile = {};
    }).catch(error => {
      this.alertService.alerts.next(new Alert('Error: Profile picture not uploaded', AlertType.Danger));
    });
  }

  public saveBio() {
    this.loadingService.isLoading.next(true);
    this.httPService.saveBio(this.bioText, this.currentUser).then(data => {
      this.httPService.fetchUserById(this.currentUser.id).subscribe(user => {
        this.currentUser = user;
        this.alertService.alerts.next(new Alert('Success: Bio Message Updated Successfully', AlertType.Success));
        this.webStorage.setUserObject(user);
        this.loadingService.isLoading.next(false);
      });
    }).catch(error => {
      this.alertService.alerts.next(new Alert('Error: Bio Message Not saved', AlertType.Danger));
    });
  }
}
