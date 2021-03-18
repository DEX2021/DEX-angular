import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fillOrder } from 'src/Store/interactions';
import { AppState, IOrder } from '../../../models/models';
import { accountSelector, exchangeSelector, orderBookSelector, priceChartSelector } from '../../../Store/selectors';

enum OrderBookSorting {
  All,
  Sold,
  Bought
}

@Component({
  selector: '[app-order-book]',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {
  $orders: Observable<IOrder>
  $exchange: Observable<AppState>
  $account: Observable<AppState>
  lastPrice: number = 0.00000
  lastPriceChange: string = '+'
  $priceChartData: Observable<any>
  sortType: OrderBookSorting = OrderBookSorting.Bought

  public get sortTypes(): typeof OrderBookSorting {
    return OrderBookSorting;
  }

  constructor(private store: Store<AppState>) {
    this.$orders = this.store.pipe(select(orderBookSelector));
    this.$exchange = this.store.pipe(select(exchangeSelector));
    this.$account = this.store.pipe(select(accountSelector));
    this.$priceChartData = this.store.pipe(select(priceChartSelector));

    this.$priceChartData.subscribe(data => {
      this.lastPrice = data.lastPrice;
      this.lastPriceChange = data.lastPriceChange;
    })
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

  priceSymbol(priceChange) {
    let output;

    if (priceChange === '+') {
      output = "<span class=\"text-success\">&#9650;</span>";
    } else {
      output = "<span class=\"text-danger\">&#9660;</span>";
    }

    return output;
  }
}
