import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrategyBuilderComponent } from './strategy-builder.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{ path: '', component: StrategyBuilderComponent, canActivate: [AuthGuard] }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class StrategyBuilderRoutingModule {}
