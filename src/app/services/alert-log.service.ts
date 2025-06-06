import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  getRecentAlerts(): Observable<AlertLogEntry[]> {
    return this.http.get<AlertLogEntry[]>('/api/alerts/recent');
  }
}
