import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/models';
import { appInitSelector, accountSelector } from 'src/Store/selectors';
import { fetchReduxData } from 'src/helpers/redux.helper';
import Web3 from 'web3';

@Component({
  selector: '[app-accounts]',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  currentAccount: any
  $appInit: Observable<Boolean>;

  constructor(private web3: Web3, private store: Store<AppState>) {
    this.$appInit = this.store.pipe(select(appInitSelector));
  }

  async ngOnInit() {
    this.$appInit.subscribe(loaded => {
      if (loaded) {
        this.currentAccount = fetchReduxData(this.store, accountSelector)
      }
    })
  }

}
