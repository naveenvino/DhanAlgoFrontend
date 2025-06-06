import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AlertLogEntry {
  time: string;
  symbol: string;
  action: string;
  status: 'received' | 'processed' | 'failed';
}

@Injectable({
  providedIn: 'root'
})
export class AlertLogService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRecentAlerts(): Observable<AlertLogEntry[]> {
    return this.http.get<AlertLogEntry[]>(`${this.baseUrl}/alerts/recent`);
  }
}
