import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/models';
import { accountSelector } from 'src/Store/selectors';
import { loadAccount } from '../../../Store/interactions'
import { fetchReduxData } from 'src/helpers/redux.helper';
import Web3 from 'web3';

@Component({
  selector: '[app-accounts]',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  currentAccount: any
  constructor(private web3: Web3, private store: Store<AppState>) {
  }

  async ngOnInit() {
    await loadAccount(this.web3, this.store);
    
    this.currentAccount = fetchReduxData(this.store, accountSelector)
  }

}
