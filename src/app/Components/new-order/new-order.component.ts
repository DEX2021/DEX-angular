import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { AppState, IOrder, IExchange, IToken } from '../../../models/models'
import { 
  exchangeSelector,
  tokenSelector,
  accountSelector,
  buyOrderSelector,
  sellOrderSelector,
  exchangeEtherBalanceSelector,
  exchangeTokenBalanceSelector,
  balancesLoadingSelector
} from '../../../Store/selectors'
import * as Postactions from '../../../Store/action'
import { makeBuyOrder, makeSellOrder, loadBalances, loadAccount } from '../../../Store/interactions'
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { fetchReduxData } from 'src/helpers/redux.helper';

@Component({
  selector: '[app-new-order]',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  buyAmount: number = 0
  buyPrice: number = 0
  sellAmount: number = 0
  sellPrice: number = 0

  $exchange: Observable<IExchange>;
  $token: Observable<IToken>;
  $account: Observable<any>;
  $buyOrder: Observable<any>;
  $sellOrder: Observable<any>;

  $etherBalance: Observable<AppState>;
  $tokenBalance: Observable<AppState>;
  $balancesLoading: Observable<Boolean>;

  constructor(private Web3: Web3, private store: Store<AppState>) {
    this.$exchange = store.pipe(select(exchangeSelector));
    this.$token = store.pipe(select(tokenSelector));
    this.$account = store.pipe(select(accountSelector));
    this.$buyOrder = store.pipe(select(buyOrderSelector));
    this.$sellOrder = store.pipe(select(sellOrderSelector));

    this.$exchange.subscribe(e => {
      if (e !== null) {
        this.loadBlockchainData();

        this.$etherBalance = this.store.pipe(select(exchangeEtherBalanceSelector));
        this.$tokenBalance = this.store.pipe(select(exchangeTokenBalanceSelector));
        this.$balancesLoading = this.store.pipe(select(balancesLoadingSelector));
      }
    })
  }

  async loadBlockchainData() {
    await loadAccount(this.Web3, this.store);
    
    var exchange, token, account, etherBalance;
    this.$exchange.subscribe(result => exchange = result)
    this.$token.subscribe(result => token = result)
    this.$account.subscribe(result => account = result)

    // await loadBalances(this.Web3, exchange, token, account, this.store)
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

  createOrder(type: string) {
    let exchange, token, account, order;

    this.$exchange.subscribe(e => exchange = e);
    this.$token.subscribe(e => token = e);
    this.$account.subscribe(e => account = e);

    if (type === "buy") {
      this.$buyOrder.subscribe(e => order = e);

      if (order.amount === 0 || order.price === 0) {
        alert("Please enter a value greater than zero.")
        return
      }

      makeBuyOrder(this.store, exchange, this.Web3, token, order, account);

      this.buyAmount = 0
      this.buyPrice = 0
    } else {
      this.$sellOrder.subscribe(e => order = e);
      makeSellOrder(this.store, exchange, this.Web3, token, order, account);

      if (order.amount === 0 || order.price === 0) {
        alert("Please enter a value greater than zero.")
        return
      }

      this.sellAmount = 0
      this.sellPrice = 0
    }
  }
}
