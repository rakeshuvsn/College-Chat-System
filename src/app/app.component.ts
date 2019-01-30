import { Component, OnInit, OnDestroy } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading: Boolean;

  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    setTheme('bs4');
  }

  ngOnInit() {

    this.subscriptions.push (
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
      })
    );
    this.subscriptions.push (
      this.loadingService.isLoading.subscribe(loading => {
        this.loading = loading;
      })
    );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
