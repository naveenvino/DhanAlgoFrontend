import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

/**
 * AuthService handles authentication-related API calls.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Sends credentials to the backend and stores the received token.
   * @param username user's name
   * @param password user's password
   */
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(tap((res: LoginResponse) => localStorage.setItem('token', res.token)));
  }

  /**
   * Retrieves the stored JWT token.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
