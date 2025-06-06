import { HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let auth: jasmine.SpyObj<AuthService>;
  let snack: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    auth = jasmine.createSpyObj('AuthService', ['getToken']);
    snack = jasmine.createSpyObj('MatSnackBar', ['open']);
    interceptor = new AuthInterceptor(auth, snack);
  });

  it('should add Authorization header', (done) => {
    auth.getToken.and.returnValue('token');
    const req = new HttpRequest('GET', '/');
    const next: HttpHandler = { handle: (r: HttpRequest<any>) => {
      expect(r.headers.get('Authorization')).toBe('Bearer token');
      return of(new HttpResponse({ status: 200 }));
    }};
    interceptor.intercept(req, next).subscribe(() => done());
  });

  it('should show error message', (done) => {
    auth.getToken.and.returnValue(null);
    const req = new HttpRequest('GET', '/');
    const next: HttpHandler = { handle: () => throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })) };
    interceptor.intercept(req, next).subscribe({
      error: () => {
        expect(snack.open).toHaveBeenCalled();
        done();
      }
    });
  });
});
