import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StrategyBuilderComponent } from './strategy-builder.component';
import { StrategyBuilderService, OptionChainEntry, StrategyLeg } from '../services/strategy-builder.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('StrategyBuilderComponent', () => {
  let component: StrategyBuilderComponent;
  let fixture: ComponentFixture<StrategyBuilderComponent>;
  let service: jasmine.SpyObj<StrategyBuilderService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StrategyBuilderService', ['getOptionChain', 'placeStrategy']);
    const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        NoopAnimationsModule,
        DragDropModule,
        MatIconModule
      ],
      declarations: [StrategyBuilderComponent],
      providers: [
        { provide: StrategyBuilderService, useValue: spy },
        { provide: MatSnackBar, useValue: snackSpy }
      ]
    }).compileComponents();

    service = TestBed.inject(StrategyBuilderService) as jasmine.SpyObj<StrategyBuilderService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  function createComponent() {
    fixture = TestBed.createComponent(StrategyBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should load option chain', () => {
    const mock: OptionChainEntry[] = [{ strike: 100, callPrice: 1, putPrice: 2 }];
    service.getOptionChain.and.returnValue(of(mock));
    createComponent();

    component.form.get('symbol')?.setValue('NIFTY');
    component.loadChain();
    fixture.detectChanges();

    expect(service.getOptionChain).toHaveBeenCalledWith('NIFTY');
  });

  it('should send legs to service', () => {
    service.placeStrategy.and.returnValue(of(undefined));
    createComponent();
    component.addLeg();
    component.legs.at(0).patchValue({ quantity: 1, strike: 100 });
    component.form.get('symbol')?.setValue('NIFTY');

    component.submit();

    const args = service.placeStrategy.calls.mostRecent().args[0];
    expect(args.length).toBe(1);
    expect(args[0]).toEqual(jasmine.objectContaining({ action: 'BUY', quantity: 1, strike: 100, optionType: 'CE' }));
  });

  it('should remove a leg', () => {
    createComponent();
    component.addLeg();
    component.addLeg();

    expect(component.legs.length).toBe(2);
    component.removeLeg(0);
    expect(component.legs.length).toBe(1);
  });

  it('should reorder legs on drop', () => {
    createComponent();
    component.addLeg();
    component.addLeg();
    component.legs.at(0).patchValue({ strike: 100 });
    component.legs.at(1).patchValue({ strike: 200 });

    const event = { previousIndex: 0, currentIndex: 1 } as CdkDragDrop<string[]>;
    component.drop(event);

    expect(component.legs.at(0).value.strike).toBe(200);
    expect(component.legs.at(1).value.strike).toBe(100);
  });

  it('should show success message when strategy placed', fakeAsync(() => {
    service.placeStrategy.and.returnValue(of(undefined));
    createComponent();
    component.addLeg();
    component.legs.at(0).patchValue({ quantity: 1, strike: 100 });
    component.form.get('symbol')?.setValue('NIFTY');

    component.submit();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith('Strategy placed successfully', 'Close', { duration: 3000 });
  }));
});
