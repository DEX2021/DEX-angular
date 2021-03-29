import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Web3 from 'web3';


import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store'; // NgRx Store
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // NgRx Store Developer Tools
import rootReducer from '../Store/reducers'; // TODO: Remove the test reducer
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze'
import { IWeb3 } from 'src/models/models';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DepositsComponent } from './Components/deposits/deposits.component';
import { PriceChartComponent } from './Components/price-chart/price-chart.component';
import { TradesComponent } from './Components/trades/trades.component';
import { OrderBookComponent } from './Components/order-book/order-book.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { NewOrderComponent } from './Components/new-order/new-order.component';

import { NumericDirective } from './Directives/numeric.directive';
import { TradingComponent } from './Pages/trading/trading.component';
import { WalletComponent } from './Pages/wallet/wallet.component';
import { AccountBalancesComponent } from './Components/account-balances/account-balances.component';
import { ExchangeWalletComponent } from './Components/exchange-wallet/exchange-wallet.component';
import { AccountsComponent } from './Components/accounts/accounts.component';

export const metaReducers: MetaReducer<IWeb3>[] = !environment.production ? [storeFreeze] : [];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DepositsComponent,
    PriceChartComponent,
    TradesComponent,
    OrderBookComponent,
    TransactionsComponent,
    NewOrderComponent,
    NumericDirective,
    TradingComponent,
    WalletComponent,
    AccountBalancesComponent,
    ExchangeWalletComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ root: rootReducer }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    // StoreModule.forFeature('counter', counterReducer), // TODO: Remove the test selector
    StoreDevtoolsModule.instrument({
      maxAge: 100, // Retains the last states (25 in this case for example)
    })
  ],
  providers: [
    {
      provide: Web3,
      useFactory: () => {
        return new Web3(Web3.givenProvider || "http://localhost:7545");
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
