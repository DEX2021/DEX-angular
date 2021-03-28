import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fillOrder } from 'src/Store/interactions';
import { AppState, IOrder } from '../../../models/models';
import { accountSelector, exchangeSelector, orderBookSelector, priceChartSelector, lastPriceSelector } from '../../../Store/selectors';

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
  $lastPrice: Observable<number>
  lastPriceChange: string = '+'
  $priceChartData: Observable<any>
  sortType: OrderBookSorting = OrderBookSorting.All

  public get sortTypes(): typeof OrderBookSorting {
    return OrderBookSorting;
  }

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.$orders = this.store.pipe(select(orderBookSelector));
    this.$exchange = this.store.pipe(select(exchangeSelector));
    this.$account = this.store.pipe(select(accountSelector));
    this.$priceChartData = this.store.pipe(select(priceChartSelector));
    this.$lastPrice = this.store.pipe(select(lastPriceSelector));

    this.$priceChartData.subscribe(data => {
      this.lastPriceChange = data.lastPriceChange;
    })

    var res = this.http.get("https://api.coinmarketcap.com/v1/ticker/ethereum/");
    res.subscribe(result => console.log("ReSuLt!@", result))
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
      // output = "<span class=\"text-success\">&#9650;</span>";
      //output = "<span class=\"book_arrow_down material-icons\">north_east</span>";
      output = "north_east";
    } else {
      // output = "<span class=\"text-danger\">&#9660;</span>";
      //output = "<span class=\"book_arrow_up material-icons\">south_west</span>";
      output = "south_west";
    }

    return output;
  }

  filterOrderBook(filter) {
    switch(filter) {
      case 'book_down':
        this.sortType = OrderBookSorting.Sold;
        break;
      case 'book_up':
        this.sortType = OrderBookSorting.Bought;
        break;
      default:
        this.sortType = OrderBookSorting.All;
        break;
    }

    console.log("Sort type: ", this.sortType)
  }
}
