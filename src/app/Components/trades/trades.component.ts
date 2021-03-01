
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, IOrder } from '../../../models/models';
import { filledOrdersSelector } from '../../../Store/selectors';

@Component({
  selector: '[app-trades]',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {
  $filledOrders: Observable<IOrder>
  filledOrders: IOrder

  constructor(private store: Store<AppState>) {
    this.$filledOrders = this.store.pipe(select(filledOrdersSelector));
  }

  async ngOnInit() {

  }
}