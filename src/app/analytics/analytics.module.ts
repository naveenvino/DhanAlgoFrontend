import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [CommonModule, NgxChartsModule, AnalyticsRoutingModule]
})
export class AnalyticsModule {}
