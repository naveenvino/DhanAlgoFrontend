import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AlertLogComponent } from './alert-log.component';
import { AlertLogService, AlertLogEntry } from '../services/alert-log.service';

describe('AlertLogComponent', () => {
  let component: AlertLogComponent;
  let fixture: ComponentFixture<AlertLogComponent>;
  let service: jasmine.SpyObj<AlertLogService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AlertLogService', ['getRecentAlerts']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule, MatTableModule, NoopAnimationsModule],
      declarations: [AlertLogComponent],
      providers: [{ provide: AlertLogService, useValue: spy }]
    }).compileComponents();

    service = TestBed.inject(AlertLogService) as jasmine.SpyObj<AlertLogService>;
  });

  function createComponent() {
    fixture = TestBed.createComponent(AlertLogComponent);
    component = fixture.componentInstance;
  }

  it('should display alerts from the service', () => {
    const data: AlertLogEntry[] = [
      { time: 't', symbol: 'AAPL', action: 'BUY', status: 'received' }
    ];
    service.getRecentAlerts.and.returnValue(of(data));

    createComponent();
    fixture.detectChanges();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(1);
  });
});
