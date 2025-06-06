import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OptionsChainComponent } from './options-chain.component';
import { StrategyBuilderService, OptionsChainRow } from '../services/strategy-builder.service';

describe('OptionsChainComponent', () => {
  let component: OptionsChainComponent;
  let fixture: ComponentFixture<OptionsChainComponent>;
  let service: jasmine.SpyObj<StrategyBuilderService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StrategyBuilderService', ['getOptionsChain']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatTableModule,
        NoopAnimationsModule
      ],
      declarations: [OptionsChainComponent],
      providers: [{ provide: StrategyBuilderService, useValue: spy }]
    }).compileComponents();

    service = TestBed.inject(StrategyBuilderService) as jasmine.SpyObj<StrategyBuilderService>;
  });

  function createComponent() {
    fixture = TestBed.createComponent(OptionsChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should load options chain data', () => {
    const mock: OptionsChainRow[] = [
      { strike: 100, callLtp: 1, putLtp: 2, oi: 1, iv: 10, greeks: '0' }
    ];
    service.getOptionsChain.and.returnValue(of(mock));
    createComponent();

    component.form.patchValue({ symbol: 'NIFTY', expiry: '2024-01-01' });
    component.load();
    fixture.detectChanges();

    expect(service.getOptionsChain).toHaveBeenCalledWith('NIFTY', '2024-01-01');
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(1);
  });
});
