import { Component, OnInit, AfterContentInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchReduxData } from '../../../Helpers/redux.helpers'
import { AppState } from 'src/models/models';
import { loadBalances, loadWeb3, depositEther, withdrawEther, depositToken, withdrawToken } from 'src/Store/interactions';
import { accountSelector, balancesLoadingSelector, etherBalanceSelector, exchangeEtherBalanceSelector, exchangeSelector, exchangeTokenBalanceSelector, tokenBalanceSelector, tokenSelector } from 'src/Store/selectors';

@Component({
  selector: '[app-deposits]',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit {
  $web3: any
  $exchange: Observable<AppState>
  $token: Observable<AppState>
  $account: Observable<AppState>
  $etherBalance: Observable<AppState>
  $tokenBalance: Observable<AppState>
  $exchangeEtherBalance: Observable<AppState>
  $exchangeTokenBalance: Observable<AppState>
  $balancesLoading: Observable<Boolean>

  constructor(private store: Store<AppState>) {
    this.$exchange = this.store.pipe(select(exchangeSelector))
    this.$token = this.store.pipe(select(tokenSelector))
    this.$account = this.store.pipe(select(accountSelector))
    this.$etherBalance = this.store.pipe(select(etherBalanceSelector))
    this.$tokenBalance = this.store.pipe(select(tokenBalanceSelector))
    this.$exchangeEtherBalance = this.store.pipe(select(exchangeEtherBalanceSelector))
    this.$exchangeTokenBalance = this.store.pipe(select(exchangeTokenBalanceSelector))
    this.$balancesLoading = this.store.pipe(select(balancesLoadingSelector))

  }

  async ngOnInit() {
    this.$web3 = await loadWeb3(this.store);

    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    var exchange = fetchReduxData(this.store, exchangeSelector)
    var token = fetchReduxData(this.store, tokenSelector)
    var account = fetchReduxData(this.store, accountSelector)

    await loadBalances(this.$web3, exchange, token, account, this.store)
  }

  async etherDepositAmountChanged(etherAmount) {
    var exchange = fetchReduxData(this.store, exchangeSelector)
    var account = fetchReduxData(this.store, accountSelector)

    await depositEther(this.store, exchange, this.$web3, etherAmount, account)
  }

  async etherWithdrawAmountChanged(etherAmount) {
    var exchange = fetchReduxData(this.store, exchangeSelector)
    var account = fetchReduxData(this.store, accountSelector)


    await withdrawEther(this.store, exchange, this.$web3, etherAmount, account)

  }

  async TokenDepositAmountChanged(tokenAmount) {
    var exchange = fetchReduxData(this.store, exchangeSelector)
    var token = fetchReduxData(this.store, tokenSelector)
    var account = fetchReduxData(this.store, accountSelector)

    await depositToken(this.store, exchange, this.$web3, token, tokenAmount, account)
  }

  async TokenWithdrawAmountChanged(tokenAmount) {
    var exchange = fetchReduxData(this.store, exchangeSelector)
    var token = fetchReduxData(this.store, tokenSelector)
    var account = fetchReduxData(this.store, accountSelector)

    await withdrawToken(this.store, exchange, this.$web3, token, tokenAmount, account)
  }
}