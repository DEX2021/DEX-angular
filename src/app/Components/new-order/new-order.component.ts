import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { AppState, IOrder, IExchange, IToken } from '../../../models/models'
import { 
  exchangeSelector,
  tokenSelector,
  accountSelector,
  buyOrderSelector,
  sellOrderSelector
} from '../../../Store/selectors'
import * as Postactions from '../../../Store/action'
import { makeBuyOrder, makeSellOrder } from '../../../Store/interactions'
import { Observable } from 'rxjs';
import Web3 from 'web3';

@Component({
  selector: '[app-new-order]',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  $exchange: Observable<IExchange>;
  $token: Observable<IToken>;
  $account: Observable<any>;
  $buyOrder: Observable<any>;
  $sellOrder: Observable<any>;

  constructor(private Web3: Web3, private store: Store<AppState>) {
    this.$exchange = store.pipe(select(exchangeSelector));
    this.$token = store.pipe(select(tokenSelector));
    this.$account = store.pipe(select(accountSelector));
    this.$buyOrder = store.pipe(select(buyOrderSelector));
    this.$sellOrder = store.pipe(select(sellOrderSelector));
  }

  ngOnInit(): void {
  }

  buyAmountChanged(amount: number) {
    this.store.dispatch(new Postactions.buyOrderAmountChanged(amount))
  }

  buyPriceChanged(price: number) {
    this.store.dispatch(new Postactions.buyOrderPriceChanged(price))
  }

  sellAmountChanged(amount: number) {
    this.store.dispatch(new Postactions.sellOrderAmountChanged(amount))
  }

  sellPriceChanged(price: number) {
    this.store.dispatch(new Postactions.sellOrderPriceChanged(price))
  }

  createBuyOrder() {
    let exchange, token, account, order;

    this.$exchange.subscribe(e => exchange = e);
    this.$token.subscribe(e => token = e);
    this.$account.subscribe(e => account = e);
    this.$buyOrder.subscribe(e => order = e);

    makeBuyOrder(this.store, exchange, this.Web3, token, order, account);
  }

  createSellOrder() {
    let exchange, token, account, order;

    this.$exchange.subscribe(e => exchange = e);
    this.$token.subscribe(e => token = e);
    this.$account.subscribe(e => account = e);
    this.$buyOrder.subscribe(e => order = e);

    makeSellOrder(this.store, exchange, this.Web3, token, order, account);
  }
}
