import { TestBed } from '@angular/core/testing';
import { NotificationService, NotificationMessage } from './notification.service';
import * as rxjsWebSocket from 'rxjs/webSocket';
import { Subject } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService;
  let socket$: Subject<NotificationMessage>;

  beforeEach(() => {
    socket$ = new Subject<NotificationMessage>();
    spyOn(rxjsWebSocket, 'webSocket').and.returnValue(socket$ as any);
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should emit messages from websocket', (done) => {
    service.connect();
    service.messages$.subscribe(msg => {
      expect(msg.type).toBe('test');
      done();
    });
    socket$.next({ type: 'test', data: 1 });
  });

  it('should close socket on disconnect', () => {
    service.connect();
    const completeSpy = spyOn(socket$, 'complete').and.callThrough();
    service.disconnect();
    expect(completeSpy).toHaveBeenCalled();
  });
});
