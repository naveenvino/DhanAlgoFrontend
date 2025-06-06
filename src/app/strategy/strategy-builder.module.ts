import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { StrategyFormComponent } from './strategy-form/strategy-form.component';
import { PayoffGraphComponent } from './payoff-graph/payoff-graph.component';

@NgModule({
  declarations: [StrategyFormComponent, PayoffGraphComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [StrategyFormComponent]
})
export class StrategyBuilderModule {}
