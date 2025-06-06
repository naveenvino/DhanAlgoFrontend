import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiskManagementComponent } from './risk-management.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{ path: '', component: RiskManagementComponent, canActivate: [AuthGuard] }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class RiskManagementRoutingModule {}
