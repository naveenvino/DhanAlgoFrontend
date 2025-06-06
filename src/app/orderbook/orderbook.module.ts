import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { OrderbookComponent } from './orderbook.component';
import { OrderbookRoutingModule } from './orderbook-routing.module';

@NgModule({
  declarations: [OrderbookComponent],
  imports: [CommonModule, MatTableModule, MatCardModule, OrderbookRoutingModule]
})
export class OrderbookModule {}
