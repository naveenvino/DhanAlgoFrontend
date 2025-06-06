import { Component } from '@angular/core';

/**
 * AnalyticsComponent displays a sample bar chart of strategy performance.
 */
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent {
  view: [number, number] = [700, 300];
  data = [
    { name: 'Strategy A', value: 20 },
    { name: 'Strategy B', value: 35 },
    { name: 'Strategy C', value: 15 }
  ];
}
