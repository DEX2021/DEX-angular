
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import Web3 from 'web3';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DepositsComponent } from '../Components/deposits/deposits.component';
import { PriceChartComponent } from '../Components/price-chart/price-chart.component';
import { TradesComponent } from '../Components/trades/trades.component';
import { OrderBookComponent } from '../Components/order-book/order-book.component';
import { TransactionsComponent } from '../Components/transactions/transactions.component';
import { NewOrderComponent } from '../Components/new-order/new-order.component';

import { TradingComponent } from '../Pages/trading/trading.component';
import { WalletComponent } from '../Pages/wallet/wallet.component';
import { AccountBalancesComponent } from '../Components/account-balances/account-balances.component';
import { ExchangeWalletComponent } from '../Components/exchange-wallet/exchange-wallet.component';
import { AccountsComponent } from '../Components/accounts/accounts.component';

@NgModule({
    declarations: [
        DepositsComponent,
        PriceChartComponent,
        TradesComponent,
        OrderBookComponent,
        TransactionsComponent,
        NewOrderComponent,
        TradingComponent,
        WalletComponent,
        AccountBalancesComponent,
        ExchangeWalletComponent,
        AccountsComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    providers: [
        {
            provide: Web3,
            useFactory: () => {
                return new Web3(Web3.givenProvider || "http://localhost:7545");
            }
        }
    ]
})
export class Web3Module { }