import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payoff-graph',
  templateUrl: './payoff-graph.component.html',
  styleUrls: ['./payoff-graph.component.css']
})
export class PayoffGraphComponent {
  @Input() legs: any[] = [];
}
