import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileComponent } from './profile.component';
import { DhanApiService } from '../services/dhan-api.service';
import { environment } from '../../environments/environment';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule],
      providers: [DhanApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should display user data when service returns a profile', () => {
    const mockProfile = { name: 'John Doe', email: 'john@example.com', clientId: '123' };

    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiUrl}/TestDhan/profile`);
    req.flush(mockProfile);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Name: John Doe');
    expect(compiled.textContent).toContain('Email: john@example.com');
    expect(compiled.textContent).toContain('Client ID: 123');
  });
});
