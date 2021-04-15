import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DexService } from 'src/app/Services/DexService.service';
import { fillOrder } from 'src/Store/interactions';
import { AppState, IOrder } from '../../../models/models';
import { appInitSelector, orderBookSelector, priceChartSelector, lastPriceSelector } from '../../../Store/selectors';

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
  $orders: Observable<any>
  $lastPrice: Observable<number>
  lastPriceChange: string = '-'
  $priceChartData: Observable<any>
  sortType: OrderBookSorting = OrderBookSorting.All
  $appInit: Observable<boolean>

  public get sortTypes(): typeof OrderBookSorting {
    return OrderBookSorting;
  }

  constructor(private store: Store<AppState>, private dex: DexService) {
    this.$orders = this.store.pipe(select(orderBookSelector));
    this.$priceChartData = this.store.pipe(select(priceChartSelector));
    this.$lastPrice = this.store.pipe(select(lastPriceSelector));
    this.$appInit = this.store.pipe(select(appInitSelector));

    this.$priceChartData.subscribe(data => {
      this.lastPriceChange = data.lastPriceChange;
    })

    this.$orders.subscribe();
  }

  ngOnInit(): void {
  }

  fillingOrder(order) {
    console.log('filling order', order)
    fillOrder(this.store, this.dex.Exchange, order, this.dex.Account)
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
  }
}
