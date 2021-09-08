import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingComponent } from 'src/app/Pages/trading/trading.component';
import { WalletComponent } from 'src/app/Pages/wallet/wallet.component';

const routes: Routes = [
  {
    path: 'trading',
    component: TradingComponent
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'trading'
  },
  {
    path: '*',
    redirectTo: 'trading'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
