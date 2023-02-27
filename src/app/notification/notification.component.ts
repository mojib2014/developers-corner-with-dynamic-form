import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  Notification,
  NotificationType,
} from '../shared/models/notification.model';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  private _subscription!: Subscription;

  constructor(private _notificationSvc: NotificationService) {}

  private _addNotification(notification: Notification) {
    this.notifications.push(notification);

    if (notification.timeout !== 0)
      setTimeout(() => this.close(notification), notification.timeout);
  }

  ngOnInit() {
    this._subscription = this._notificationSvc
      .getObservable()
      .subscribe((notification) => this._addNotification(notification));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(
      (notif) => notif.id !== notification.id
    );
  }

  className(notification: Notification): string {
    let style: string;

    switch (notification.type) {
      case NotificationType.success:
        style = 'success';
        break;
      case NotificationType.warning:
        style = 'warning';
        break;
      case NotificationType.error:
        style = 'error';
        break;
      default:
        style = 'info';
        break;
    }
    return style;
  }
}
