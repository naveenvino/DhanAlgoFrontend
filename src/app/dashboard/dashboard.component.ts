import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TradingService, Position } from '../services/trading.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pnl$!: Observable<number>;
  positions$!: Observable<Position[]>;

  displayedColumns = ['symbol', 'quantity', 'entryPrice', 'currentPrice', 'mtm'];

  constructor(
    private tradingService: TradingService,
    private notifications: NotificationService
  ) {}

  ngOnInit(): void {
    this.load();
    this.notifications.connect();
    this.notifications.messages$.subscribe(() => this.load());
  }

  private load(): void {
    this.pnl$ = this.tradingService.getCurrentPnl();
    this.positions$ = this.tradingService.getOpenPositions();
  }
}
