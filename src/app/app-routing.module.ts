import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StrategyBuilderComponent } from './strategy-builder/strategy-builder.component';
import { StrategyFormComponent } from './strategy/strategy-form/strategy-form.component';
import { OrderbookComponent } from './orderbook/orderbook.component';
import { OptionsChainComponent } from './options-chain/options-chain.component';
import { AlertLogComponent } from './alert-log/alert-log.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'builder', component: StrategyBuilderComponent },
  { path: 'strategy', component: StrategyFormComponent },
  { path: 'orders', component: OrderbookComponent },
  { path: 'options-chain', component: OptionsChainComponent },
  { path: 'alerts', component: AlertLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
