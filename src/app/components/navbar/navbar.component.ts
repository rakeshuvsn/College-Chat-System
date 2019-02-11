import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedin = false;
  private subscriptions: Subscription[] = [];
  modalRef: BsModalRef;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authService.isLoggedIn.subscribe(value => {
        this.isLoggedin = value;
      })
    );
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  navigateToAdmin(template) {
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
