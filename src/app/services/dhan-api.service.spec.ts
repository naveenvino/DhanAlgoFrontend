import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DhanApiService } from './dhan-api.service';
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

  it('should call /TestDhan/profile with the correct base URL', () => {
    service.getUserProfile().subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/TestDhan/profile`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
