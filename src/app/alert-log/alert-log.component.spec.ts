import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AlertLogComponent } from './alert-log.component';
import { AlertLogService, AlertEntry } from '../services/alert-log.service';

describe('AlertLogComponent', () => {
  let component: AlertLogComponent;
  let fixture: ComponentFixture<AlertLogComponent>;
  let service: jasmine.SpyObj<AlertLogService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AlertLogService', ['getRecentAlerts']);

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatCardModule, NoopAnimationsModule],
      declarations: [AlertLogComponent],
      providers: [{ provide: AlertLogService, useValue: spy }]
    }).compileComponents();

    service = TestBed.inject(AlertLogService) as jasmine.SpyObj<AlertLogService>;
  });

  function createComponent() {
    fixture = TestBed.createComponent(AlertLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should display alerts from the service', fakeAsync(() => {
    const mock: AlertEntry[] = [
      { time: '2023-01-01T00:00:00Z', symbol: 'NIFTY', action: 'BUY', status: 'received' }
    ];
    service.getRecentAlerts.and.returnValue(of(mock));

    createComponent();
    tick();
    fixture.detectChanges();

    expect(service.getRecentAlerts).toHaveBeenCalled();
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(1);
    fixture.destroy();
    tick(0);
  }));

  it('should refresh every 5 seconds', fakeAsync(() => {
    service.getRecentAlerts.and.returnValue(of([]));

    createComponent();
    tick();
    expect(service.getRecentAlerts.calls.count()).toBe(1);
    tick(5000);
    fixture.detectChanges();
    expect(service.getRecentAlerts.calls.count()).toBe(2);
    fixture.destroy();
    tick(0);
  }));
});
