import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cancelOrder } from 'src/Store/interactions';
import { convertToObject } from 'typescript';
import { AppState, IOrder } from '../../../models/models';
import { accountSelector, exchangeSelector, myFilledOrderSelector, myOpenOrderSelector } from '../../../Store/selectors';

@Component({
  selector: '[app-transactions]',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  $myFilledOrders: Observable<any>;
  $myOpenOrders: Observable<any>;
  $exchange: Observable<AppState>
  $account: Observable<AppState>

  constructor(private store: Store<AppState>) {
    this.$myFilledOrders = store.pipe(select(myFilledOrderSelector));
    this.$myOpenOrders = store.pipe(select(myOpenOrderSelector));

    this.$myFilledOrders.subscribe(d => console.log("My Filled Orders", d))
    this.$myOpenOrders.subscribe(d => console.log("My Open Orders", d))
  }

  ngOnInit(): void {
  }

  async CancelOrder(order) {
    console.log("this is working", order)
    this.$exchange = this.store.pipe(select(exchangeSelector))
    this.$account = this.store.pipe(select(accountSelector))

    var exchange, account
    await this.$exchange.subscribe(result => exchange = result)
    await this.$account.subscribe(result => account = result)
    cancelOrder(this.store, exchange, order, account)
  }

}