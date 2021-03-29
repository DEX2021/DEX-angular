import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/models';
import { accountSelector } from 'src/Store/selectors';
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

  ngOnInit(): void {
    this.currentAccount = fetchReduxData(this.store, accountSelector)
  }

}
