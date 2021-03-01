import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, IOrder } from '../../../models/models';
import { myFilledOrderSelector, myOpenOrderSelector } from '../../../Store/selectors';

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

}
