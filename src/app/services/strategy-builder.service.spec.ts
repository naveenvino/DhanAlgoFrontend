import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StrategyBuilderService, StrategyLeg, OptionChainEntry, OptionsChainRow } from './strategy-builder.service';
import { environment } from '../../environments/environment';

describe('StrategyBuilderService', () => {
  let service: StrategyBuilderService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StrategyBuilderService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should fetch option chain', () => {
    const mockChain: OptionChainEntry[] = [
      { strike: 100, callPrice: 1, putPrice: 2 }
    ];
    let response: OptionChainEntry[] | undefined;
    service.getOptionChain('NIFTY').subscribe(res => (response = res));

    const req = http.expectOne(`${environment.apiUrl}/options/NIFTY`);
    expect(req.request.method).toBe('GET');
    req.flush(mockChain);
    expect(response).toEqual(mockChain);
  });

  it('should fetch options chain with expiry', () => {
    const mock: OptionsChainRow[] = [
      { strike: 100, callLtp: 1, putLtp: 2, oi: 1, iv: 10, greeks: '0' }
    ];
    let res: OptionsChainRow[] | undefined;
    service.getOptionsChain('NIFTY', '2024-01-01').subscribe(v => (res = v));

    const req = http.expectOne(
      `${environment.apiUrl}/options/chain?symbol=NIFTY&expiry=2024-01-01`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mock);
    expect(res).toEqual(mock);
  });

  it('should place multi-leg strategy', () => {
    const legs: StrategyLeg[] = [
      { symbol: 'NIFTY', action: 'BUY', quantity: 1, strike: 100, optionType: 'CE' }
    ];
    service.placeStrategy(legs).subscribe();

    const req = http.expectOne(`${environment.apiUrl}/orders/multi-leg`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ legs });
    req.flush({});
  });
});
