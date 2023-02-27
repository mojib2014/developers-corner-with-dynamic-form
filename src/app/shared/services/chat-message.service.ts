import { Injectable, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Observable, Subject } from 'rxjs';

import { AuthService } from './auth.service';
import { ChatMessage } from '../models/chat-message.model';
import { User } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class ChatMessageService implements OnInit {
  RECONNECT_TIMEOUT = 30000;
  SOCKET_URL = 'http://localhost:8083/ws';
  CHAT_TOPIC = '/user/specific';
  CHAT_BROKER = '/app/private-message';

  private _subject = new Subject<ChatMessage>();
  user!: User;

  socket: { client: any; stomp: any } = {
    client: null,
    stomp: null,
  };

  constructor(private auth: AuthService) {
    this.socket.client = new SockJS(this.SOCKET_URL);
    this.socket.stomp = Stomp.over(this.socket.client);
  }
  ngOnInit(): void {}

  receive(): Observable<ChatMessage> {
    return this._subject.asObservable();
  }

  send(message: ChatMessage) {
    console.log('message sent', message);
    this.auth.getCurrentUser().subscribe((data: any) => (this.user = data));
    if (this.user) {
      message.sender = this.user.id;
      this.socket.stomp.send(this.CHAT_BROKER, {}, JSON.stringify(message));
    }
  }

  reconnect() {
    setTimeout(() => {
      this.initialize();
    }, this.RECONNECT_TIMEOUT);
  }

  getMessage(data: any) {
    console.log('receive message: -----------------------', data);
    var message = JSON.parse(data);
    return message;
  }

  startListener() {
    this.socket.stomp.subscribe(this.CHAT_TOPIC, (data: any) => {
      console.log('recevie data : 00000000: ', data);
      this._subject.next(this.getMessage(data.body));
    });
  }

  initialize() {
    if (this.auth.isLoggedIn()) {
      this.socket.stomp.connect({}, this.startListener);
      this.socket.stomp.onclose = this.reconnect;
    }
  }
}
