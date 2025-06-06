import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlertLogService, AlertEntry } from './alert-log.service';
import { environment } from '../../environments/environment';

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
    const mock: AlertEntry[] = [
      { time: '2023-01-01T00:00:00Z', symbol: 'NIFTY', action: 'BUY', status: 'received' }
    ];
    let response: AlertEntry[] | undefined;
    service.getRecentAlerts().subscribe(res => (response = res));

    const req = http.expectOne(`${environment.apiUrl}/alerts/recent`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
    expect(response).toEqual(mock);
  });
});
