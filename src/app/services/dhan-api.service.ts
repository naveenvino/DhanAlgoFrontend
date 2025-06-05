import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserProfile {
  name: string;
  email: string;
  clientId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DhanApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/profile`);
  }
}
