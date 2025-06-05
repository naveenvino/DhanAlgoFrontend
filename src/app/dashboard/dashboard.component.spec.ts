import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard.component';
import { TradingService, Position } from '../services/trading.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tradingService: jasmine.SpyObj<TradingService>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('TradingService', ['getCurrentPnl', 'getOpenPositions']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule, MatTableModule, NoopAnimationsModule],
      declarations: [DashboardComponent],
      providers: [{ provide: TradingService, useValue: serviceSpy }]
    }).compileComponents();

    tradingService = TestBed.inject(TradingService) as jasmine.SpyObj<TradingService>;
  });

  function createComponent() {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  }

  it('should display pnl and positions from the service', () => {
    const mockPnl = 2500;
    const mockPositions: Position[] = [
      { symbol: 'AAPL', quantity: 1, entryPrice: 100, currentPrice: 110, mtm: 10 }
    ];
    tradingService.getCurrentPnl.and.returnValue(of(mockPnl));
    tradingService.getOpenPositions.and.returnValue(of(mockPositions));

    createComponent();
    fixture.detectChanges();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pnl-value')?.textContent).toContain(mockPnl.toString());
    const rows = compiled.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(1);
  });
});
