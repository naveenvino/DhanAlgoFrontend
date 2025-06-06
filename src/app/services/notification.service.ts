import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface NotificationMessage {
  type: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket?: WebSocketSubject<NotificationMessage>;
  private messagesSubject = new Subject<NotificationMessage>();
  messages$ = this.messagesSubject.asObservable();

  connect(): void {
    if (!this.socket || this.socket.closed) {
      this.socket = webSocket<NotificationMessage>(environment.wsUrl);
      this.socket.subscribe({
        next: msg => this.messagesSubject.next(msg),
        error: err => console.error('WebSocket error', err)
      });
    }
  }

  disconnect(): void {
    this.socket?.complete();
    this.socket = undefined;
  }
}
