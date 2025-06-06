import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderbookService, Order } from '../services/orderbook.service';
import { environment } from '../../environments/environment';

describe('OrderbookService', () => {
  let service: OrderbookService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OrderbookService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should fetch open orders', () => {
    const mockOrders: Order[] = [{ id: '1', symbol: 'AAPL', quantity: 1, price: 1, status: 'OPEN' }];
    let response: Order[] | undefined;
    service.getOpenOrders().subscribe(res => (response = res));

    const req = http.expectOne(`${environment.apiUrl}/orders/open`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
    expect(response).toEqual(mockOrders);
  });

  it('should fetch order history', () => {
    const mockOrders: Order[] = [{ id: '1', symbol: 'AAPL', quantity: 1, price: 1, status: 'FILLED' }];
    let response: Order[] | undefined;
    service.getOrderHistory().subscribe(res => (response = res));

    const req = http.expectOne(`${environment.apiUrl}/orders/history`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
    expect(response).toEqual(mockOrders);
  });
});
