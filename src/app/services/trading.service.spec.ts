import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TradingService, Position } from './trading.service';
import { environment } from '../../environments/environment';

describe('TradingService', () => {
  let service: TradingService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TradingService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should fetch current pnl', () => {
    let response: number | undefined;
    service.getCurrentPnl().subscribe(pnl => (response = pnl));

    const req = http.expectOne(`${environment.apiUrl}/positions/pnl`);
    expect(req.request.method).toBe('GET');
    req.flush(42);
    expect(response).toBe(42);
  });

  it('should fetch open positions', () => {
    const mockPositions: Position[] = [
      { symbol: 'AAPL', quantity: 1, entryPrice: 1, currentPrice: 2, mtm: 1 }
    ];
    let response: Position[] | undefined;
    service.getOpenPositions().subscribe(pos => (response = pos));

    const req = http.expectOne(`${environment.apiUrl}/positions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPositions);
    expect(response).toEqual(mockPositions);
  });
});
