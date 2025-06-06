import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OrderbookComponent } from './orderbook.component';
import { OrderbookService, Order } from '../services/orderbook.service';

describe('OrderbookComponent', () => {
  let component: OrderbookComponent;
  let fixture: ComponentFixture<OrderbookComponent>;
  let service: jasmine.SpyObj<OrderbookService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('OrderbookService', ['getOpenOrders', 'getOrderHistory']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule, MatTableModule, NoopAnimationsModule],
      declarations: [OrderbookComponent],
      providers: [{ provide: OrderbookService, useValue: spy }]
    }).compileComponents();

    service = TestBed.inject(OrderbookService) as jasmine.SpyObj<OrderbookService>;
  });

  function createComponent() {
    fixture = TestBed.createComponent(OrderbookComponent);
    component = fixture.componentInstance;
  }

  it('should display orders from the service', () => {
    const open: Order[] = [{ id: '1', symbol: 'AAPL', quantity: 1, price: 1, status: 'OPEN' }];
    const history: Order[] = [{ id: '2', symbol: 'AAPL', quantity: 1, price: 1, status: 'FILLED' }];
    service.getOpenOrders.and.returnValue(of(open));
    service.getOrderHistory.and.returnValue(of(history));

    createComponent();
    fixture.detectChanges();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(2);
  });
});
