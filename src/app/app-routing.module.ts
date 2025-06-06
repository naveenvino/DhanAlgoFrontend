import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StrategyBuilderComponent } from './strategy-builder/strategy-builder.component';
import { OrderbookComponent } from './orderbook/orderbook.component';
import { OptionsChainComponent } from './options-chain/options-chain.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'builder', component: StrategyBuilderComponent },
  { path: 'orders', component: OrderbookComponent },
  { path: 'options-chain', component: OptionsChainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
