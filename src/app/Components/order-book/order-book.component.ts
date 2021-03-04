import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  $exchange: Observable<AppState>
  $account: Observable<AppState>


  constructor(private store: Store<AppState>) {
    this.$orders = this.store.pipe(select(orderBookSelector));
    this.$exchange = this.store.pipe(select(exchangeSelector))
    this.$account = this.store.pipe(select(accountSelector))
  }

  ngOnInit(): void {
  }

  fillingOrder(order) {
    var account, exchange

    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)

    console.log('filling order', order)
    fillOrder(this.store, exchange, order, account)
  }

}