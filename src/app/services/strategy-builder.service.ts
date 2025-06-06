import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OptionChainEntry {
  strike: number;
  callPrice: number;
  putPrice: number;
}

export interface OptionsChainRow {
  strike: number;
  callLtp: number;
  putLtp: number;
  oi: number;
  iv: number;
  greeks: string;
}

export interface StrategyLeg {
  symbol: string;
  action: 'BUY' | 'SELL';
  quantity: number;
  strike: number;
  optionType: 'CE' | 'PE';
}

@Injectable({
  providedIn: 'root'
})
export class StrategyBuilderService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOptionChain(symbol: string): Observable<OptionChainEntry[]> {
    return this.http.get<OptionChainEntry[]>(`${this.baseUrl}/options/${symbol}`);
  }

  getOptionsChain(symbol: string, expiry: string): Observable<OptionsChainRow[]> {
    return this.http.get<OptionsChainRow[]>(`${this.baseUrl}/options/chain?symbol=${symbol}&expiry=${expiry}`);
  }

  placeOrder(order: StrategyLeg): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/orders`, order);
  }

  placeStrategy(legs: StrategyLeg[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/orders/multi-leg`, { legs });
  }

  cancelOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/orders/${orderId}`);
  }
}
