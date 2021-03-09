import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchReduxData } from 'src/Helpers/redux.helpers';
import { cancelOrder } from 'src/Store/interactions';
import { AppState } from '../../../models/models';
import { accountSelector, exchangeSelector, myFilledOrderSelector, myOpenOrderSelector } from '../../../Store/selectors';

@Component({
  selector: '[app-transactions]',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  $myFilledOrders: Observable<any>;
  $myOpenOrders: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.$myFilledOrders = store.pipe(select(myFilledOrderSelector));
    this.$myOpenOrders = store.pipe(select(myOpenOrderSelector));
  }

  ngOnInit(): void {
  }

  async CancelOrder(order) {
    var exchange = fetchReduxData(this.store, exchangeSelector)
    var account = fetchReduxData(this.store, accountSelector)

    cancelOrder(this.store, exchange, order, account)
  }

}
