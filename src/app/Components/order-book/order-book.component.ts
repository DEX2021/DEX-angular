import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchReduxData } from 'src/Helpers/redux.helpers';
import { fillOrder } from 'src/Store/interactions';
import { AppState, IOrder } from '../../../models/models';
import { accountSelector, exchangeSelector, orderBookSelector } from '../../../Store/selectors';

@Component({
  selector: '[app-order-book]',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {
  $orders: Observable<IOrder>

  constructor(private store: Store<AppState>) {
    this.$orders = this.store.pipe(select(orderBookSelector));
  }

  ngOnInit(): void {
  }

  fillingOrder(order) {
    var exchange = fetchReduxData(this.store, exchangeSelector)
    var account = fetchReduxData(this.store, accountSelector)

    fillOrder(this.store, exchange, order, account)
  }

}