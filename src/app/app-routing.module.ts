import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { StrategyFormComponent } from './strategy/strategy-form/strategy-form.component';
import { OptionsChainComponent } from './options-chain/options-chain.component';
import { AlertLogComponent } from './alert-log/alert-log.component';
import { LoginComponent } from './auth/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'builder',
    loadChildren: () => import('./strategy-builder/strategy-builder.module').then(m => m.StrategyBuilderModule)
  },
  { path: 'strategy', component: StrategyFormComponent },
  {
    path: 'orders',
    loadChildren: () => import('./orderbook/orderbook.module').then(m => m.OrderbookModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
  },
  {
    path: 'risk',
    loadChildren: () => import('./risk-management/risk-management.module').then(m => m.RiskManagementModule)
  },
  { path: 'options-chain', component: OptionsChainComponent },
  { path: 'alerts', component: AlertLogComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
