import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RiskManagementComponent } from './risk-management.component';
import { RiskManagementRoutingModule } from './risk-management-routing.module';

@NgModule({
  declarations: [RiskManagementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RiskManagementRoutingModule
  ]
})
export class RiskManagementModule {}
