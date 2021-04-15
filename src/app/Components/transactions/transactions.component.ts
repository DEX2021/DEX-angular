import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DexService } from 'src/app/Services/DexService.service';
import { cancelOrder } from 'src/Store/interactions';
import { convertToObject } from 'typescript';
import { AppState, IOrder } from '../../../models/models';
import { appInitSelector, myFilledOrderSelector, myOpenOrderSelector } from '../../../Store/selectors';

@Component({
  selector: '[app-transactions]',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  $myFilledOrders: Observable<any>;
  $myOpenOrders: Observable<any>;
  $appInit: Observable<boolean>

  constructor(private store: Store<AppState>, private dex: DexService) {
    this.$myFilledOrders = store.pipe(select(myFilledOrderSelector));
    this.$myOpenOrders = store.pipe(select(myOpenOrderSelector));
    this.$appInit = this.store.pipe(select(appInitSelector))

    this.$myFilledOrders.subscribe(d => console.log("My Filled Orders", d))
    this.$myOpenOrders.subscribe(d => console.log("My Open Orders", d))
  }

  ngOnInit(): void {
  }

  async CancelOrder(order) {
    cancelOrder(this.store, this.dex.Exchange, order, this.dex.Account)
  }

}
