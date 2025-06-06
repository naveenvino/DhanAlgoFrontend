import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderbookService, Order } from '../services/orderbook.service';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.css']
})
export class OrderbookComponent implements OnInit {
  openOrders$!: Observable<Order[]>;
  history$!: Observable<Order[]>;

  displayedColumns = ['symbol', 'quantity', 'price', 'status'];

  constructor(private service: OrderbookService) {}

  ngOnInit(): void {
    this.openOrders$ = this.service.getOpenOrders();
    this.history$ = this.service.getOrderHistory();
  }
}
