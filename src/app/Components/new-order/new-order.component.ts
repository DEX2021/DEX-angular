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
  balancesLoadingSelector,
  appInitSelector
} from '../../../Store/selectors'
import * as Postactions from '../../../Store/action'
import { makeBuyOrder, makeSellOrder, loadBalances, loadAccount } from '../../../Store/interactions'
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { fetchReduxData } from 'src/helpers/redux.helper';
import { DexService } from 'src/app/Services/DexService.service';

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

  $buyOrder: Observable<any>;
  $sellOrder: Observable<any>;

  $etherBalance: Observable<AppState>;
  $tokenBalance: Observable<AppState>;
  $balancesLoading: Observable<Boolean>;

  $appInit: Observable<Boolean>;

  constructor(private store: Store<AppState>, private dex: DexService) {
    this.$appInit = store.pipe(select(appInitSelector));
    this.$buyOrder = store.pipe(select(buyOrderSelector));
    this.$sellOrder = store.pipe(select(sellOrderSelector));

    this.$appInit.subscribe(loaded => {
      if (loaded) {
        this.$etherBalance = this.store.pipe(select(exchangeEtherBalanceSelector));
        this.$tokenBalance = this.store.pipe(select(exchangeTokenBalanceSelector));
        this.$balancesLoading = this.store.pipe(select(balancesLoadingSelector));
      }
    })
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
    let order;

    if (type === "buy") {
      this.$buyOrder.subscribe(e => order = e);

      if (order.amount === 0 || order.price === 0) {
        alert("Please enter a value greater than zero.")
        return
      }

      makeBuyOrder(this.store, this.dex.Exchange, this.dex.Web3, this.dex.Token, order, this.dex.Account);

      this.buyAmount = 0
      this.buyPrice = 0
    } else {
      this.$sellOrder.subscribe(e => order = e);
      makeSellOrder(this.store, this.dex.Exchange, this.dex.Web3, this.dex.Token, order, this.dex.Account);

      if (order.amount === 0 || order.price === 0) {
        alert("Please enter a value greater than zero.")
        return
      }

      this.sellAmount = 0
      this.sellPrice = 0
    }
  }
}
