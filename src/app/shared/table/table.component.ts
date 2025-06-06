import { Component, Input } from '@angular/core';

/**
 * TableComponent is a reusable wrapper around Angular Material tables.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
}
