import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { ProfileComponent } from './profile.component';
import { DhanApiService, UserProfile } from '../services/dhan-api.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let dhanService: jasmine.SpyObj<DhanApiService>;

  beforeEach(async () => {
    dhanService = jasmine.createSpyObj('DhanApiService', ['getUserProfile']);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [{ provide: DhanApiService, useValue: dhanService }]
    }).compileComponents();
  });

  it('should load profile data on init', () => {
    const mockProfile: UserProfile = { name: 'Test', email: 'test@example.com', clientId: '1' };
    dhanService.getUserProfile.and.returnValue(of(mockProfile));

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.profile).toEqual(mockProfile);
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage when service fails', () => {
    const error = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    dhanService.getUserProfile.and.returnValue(throwError(() => error));

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.profile).toBeUndefined();
    expect(component.errorMessage).toContain('Server Error');
  });
});
