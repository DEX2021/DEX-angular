import { Component, OnInit, AfterContentInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  withdrawAmount: number = 0;



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
    var exchange, token, account, etherBalance;
    await this.$exchange.subscribe(result => exchange = result)
    await this.$token.subscribe(result => token = result)
    await this.$account.subscribe(result => account = result)

    // this.$etherBalance.subscribe(result => etherBalance = result)
    // this.$tokenBalance.subscribe(result => console.log("this is the deposits tokenBalance:", result))
    // this.$exchangeEtherBalance.subscribe(result => console.log("this is the deposits exchangeEtherBalance:", result))
    // this.$exchangeTokenBalance.subscribe(result => console.log("this is the deposits accexchangeTokenBalanceunt:", result))

    console.log("this is deposit exchange:", exchange)
    console.log("this is deposit token:", token)

    console.log("this is deposit account:", account)
    //console.log("this is deposit etherBalance:", etherBalance)

    console.log("this is the deposits web3:", this.$web3)


    await loadBalances(this.$web3, exchange, token, account, this.store)


  }

  async etherDepositAmountChanged(etherAmount) {
    var exchange, account
    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)

    await depositEther(this.store, exchange, this.$web3, etherAmount, account)
  }

  async etherWithdrawAmountChanged(etherAmount) {
    var exchange, account
    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)


    await withdrawEther(this.store, exchange, this.$web3, etherAmount, account)

  }

  async TokenDepositAmountChanged(tokenAmount) {
    var exchange, account, token
    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)
    this.$token.subscribe(result => token = result)


    await depositToken(this.store, exchange, this.$web3, token, tokenAmount, account)
  }

  async TokenWithdrawAmountChanged(tokenAmount) {
    var exchange, account, token
    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)
    this.$token.subscribe(result => token = result)


    await withdrawToken(this.store, exchange, this.$web3, token, tokenAmount, account)
  }



  async loadotherData() {


    var etherBalance, tokenBalance, exchangeEtherBalance, exchangeTokenBalance;
    this.$tokenBalance.subscribe(result => tokenBalance = result)
    this.$exchangeEtherBalance.subscribe(result => exchangeEtherBalance = result)
    this.$exchangeTokenBalance.subscribe(result => exchangeTokenBalance = result)
    this.$etherBalance.subscribe(result => etherBalance = result)

    console.log("this is deposit tokenBalance:", tokenBalance)
    console.log("this is deposit exchangeEtherBalance:", exchangeEtherBalance)
    console.log("this is deposit account:", exchangeTokenBalance)
    console.log("this is the ether balance: ", etherBalance)
  }

}