import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Order {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderbookService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOpenOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/open`);
  }

  getOrderHistory(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/history`);
  }
}
