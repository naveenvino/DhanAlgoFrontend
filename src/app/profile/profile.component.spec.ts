import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ProfileComponent } from './profile.component';
import { DhanApiService, UserProfile } from '../services/dhan-api.service';
import { MatCardModule } from '@angular/material/card';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let dhanService: jasmine.SpyObj<DhanApiService>;

  beforeEach(async () => {
    const dhanSpy = jasmine.createSpyObj('DhanApiService', ['getUserProfile']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule],
      declarations: [ProfileComponent],
      providers: [{ provide: DhanApiService, useValue: dhanSpy }]
    }).compileComponents();

    dhanService = TestBed.inject(DhanApiService) as jasmine.SpyObj<DhanApiService>;
  });

  function createComponent() {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  }

  it('should render profile data from the service', () => {
    const mockProfile: UserProfile = {
      dhanClientId: '1106882707',
      tokenValidity: '25/06/2025 16:39',
      activeSegment: 'Equity',
      ddpi: 'Deactive',
      dataPlan: 'Deactive'
    };
    dhanService.getUserProfile.and.returnValue(of(mockProfile));

    createComponent();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const fields = compiled.querySelectorAll('.field');
    expect(fields.length).toBe(5);
    expect(fields[0].textContent).toContain('1106882707');
    expect(fields[1].textContent).toContain('25/06/2025 16:39');
    expect(fields[2].textContent).toContain('Equity');
    expect(fields[3].textContent).toContain('Deactive');
    expect(fields[4].textContent).toContain('Deactive');
  });

  it('should display an error message on service error', waitForAsync(() => {
    const error = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    dhanService.getUserProfile.and.returnValue(throwError(error));

    createComponent();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(dhanService.getUserProfile).toHaveBeenCalled();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorEl = compiled.querySelector('.error-message');
      expect(component.errorMessage).toContain('Server Error');
      expect(errorEl).not.toBeNull();
      if (errorEl) {
        expect(errorEl.textContent).toContain('Server Error');
      }
    });
  }));
});
