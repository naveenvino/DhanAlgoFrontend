import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertLogService, AlertEntry } from '../services/alert-log.service';

@Component({
  selector: 'app-alert-log',
  templateUrl: './alert-log.component.html',
  styleUrls: ['./alert-log.component.css']
})
export class AlertLogComponent implements OnInit {
  alerts$!: Observable<AlertEntry[]>;

  displayedColumns = ['time', 'symbol', 'action', 'status'];

  constructor(private service: AlertLogService) {}

  ngOnInit(): void {
    this.alerts$ = timer(0, 5000).pipe(
      switchMap(() => this.service.getRecentAlerts())
    );
  }
}
