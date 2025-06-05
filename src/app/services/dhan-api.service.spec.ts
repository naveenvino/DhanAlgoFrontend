import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DhanApiService, UserProfile } from './dhan-api.service';
import { environment } from '../../environments/environment';

describe('DhanApiService', () => {
  let service: DhanApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DhanApiService]
    });
    service = TestBed.inject(DhanApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch user profile', () => {
    const mockProfile: UserProfile = { name: 'Test', email: 'test@example.com', clientId: '1' };

    service.getUserProfile().subscribe(profile => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/TestDhan/profile`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });

  it('should propagate error when request fails', () => {
    const status = 500;
    const statusText = 'Server Error';

    service.getUserProfile().subscribe({
      next: () => fail('should have errored'),
      error: error => {
        expect(error.status).toBe(status);
        expect(error.statusText).toBe(statusText);
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/TestDhan/profile`);
    req.flush('Error', { status, statusText });
  });
});
