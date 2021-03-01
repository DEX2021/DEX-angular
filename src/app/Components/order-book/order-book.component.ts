import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, IOrder } from '../../../models/models';
import { orderBookSelector } from '../../../Store/selectors';

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

}
