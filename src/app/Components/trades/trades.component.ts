import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DexService } from 'src/app/Services/DexService.service';
import { AppState, IOrder } from '../../../models/models';
import { appInitSelector, filledOrdersSelector } from '../../../Store/selectors';

@Component({
  selector: '[app-trades]',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {
  $appInit: Observable<boolean>
  $filledOrders: Observable<IOrder>

  constructor(private store: Store<AppState>, private dex: DexService) {
    this.$filledOrders = this.store.pipe(select(filledOrdersSelector));
    this.$appInit = this.store.pipe(select(appInitSelector));

    this.$appInit.subscribe(loaded => {
      if (loaded) {
        this.$filledOrders.subscribe()
      }
    })
  }

  async ngOnInit() {

  }
}
