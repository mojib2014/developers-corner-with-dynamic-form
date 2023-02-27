import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification, NotificationType } from '../models/notification.model';

@Injectable()
export class NotificationService {
  private _subject = new Subject<Notification>();
  private _idx = 0;

  constructor() {}

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 5000) {
    this._subject.next(
      new Notification(
        this._idx++,
        NotificationType.info,
        title,
        message,
        timeout
      )
    );
  }

  success(title: string, message: string, timeout = 5000) {
    return this._subject.next(
      new Notification(
        this._idx++,
        NotificationType.success,
        title,
        message,
        timeout
      )
    );
  }

  warning(title: string, message: string, timeout = 5000) {
    return this._subject.next(
      new Notification(
        this._idx++,
        NotificationType.warning,
        title,
        message,
        timeout
      )
    );
  }

  error(title: string, message: string, timeout = 0) {
    this._subject.next(
      new Notification(
        this._idx++,
        NotificationType.error,
        title,
        message,
        timeout
      )
    );
  }
}
