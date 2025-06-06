import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderbookComponent } from './orderbook.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{ path: '', component: OrderbookComponent, canActivate: [AuthGuard] }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class OrderbookRoutingModule {}
