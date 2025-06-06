import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AlertLogService, AlertLogEntry } from './alert-log.service';

describe('AlertLogService', () => {
  let service: AlertLogService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AlertLogService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should fetch recent alerts', () => {
    const mock: AlertLogEntry[] = [
      { time: 't', symbol: 'AAPL', action: 'BUY', status: 'received' }
    ];
    let response: AlertLogEntry[] | undefined;
    service.getRecentAlerts().subscribe(res => (response = res));

    const req = http.expectOne('/api/alerts/recent');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
    expect(response).toEqual(mock);
  });
});
