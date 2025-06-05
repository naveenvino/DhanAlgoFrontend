import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Position {
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  mtm: number;
}

@Injectable({
  providedIn: 'root'
})
export class TradingService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentPnl(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/positions/pnl`);
  }

  getOpenPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.baseUrl}/positions`);
  }
}
