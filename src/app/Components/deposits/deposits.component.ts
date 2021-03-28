import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/models';
import { loadBalances, depositEther, withdrawEther, depositToken, withdrawToken } from 'src/Store/interactions';
import { accountSelector, balancesLoadingSelector, etherBalanceSelector, exchangeEtherBalanceSelector, exchangeSelector, exchangeTokenBalanceSelector, tokenBalanceSelector, tokenSelector } from 'src/Store/selectors';
import Web3 from 'web3'

@Component({
  selector: '[app-deposits]',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit {
  $exchange: Observable<AppState>
  $token: Observable<AppState>
  $account: Observable<AppState>
  $etherBalance: Observable<AppState>
  $tokenBalance: Observable<AppState>
  $exchangeEtherBalance: Observable<AppState>
  $exchangeTokenBalance: Observable<AppState>
  $balancesLoading: Observable<Boolean>

  withdrawAmount: number = 0;
  etherAmount: number;

  ethereumPrice: number;



  constructor(private web3: Web3, private store: Store<AppState>, private http: HttpClient) {
    this.$exchange = this.store.pipe(select(exchangeSelector))
    this.$token = this.store.pipe(select(tokenSelector))
    this.$account = this.store.pipe(select(accountSelector))
    this.$etherBalance = this.store.pipe(select(etherBalanceSelector))

    this.$tokenBalance = this.store.pipe(select(tokenBalanceSelector))
    this.$exchangeEtherBalance = this.store.pipe(select(exchangeEtherBalanceSelector))
    this.$exchangeTokenBalance = this.store.pipe(select(exchangeTokenBalanceSelector))
    this.$balancesLoading = this.store.pipe(select(balancesLoadingSelector))

  }

  async getEtheriumPrice() {
    var req = this.http.get("http://dex.berntsen.solutions/");

    req.subscribe(res => {
      var data = res.data;

      var as = data.filter(o => o.symbol == "ETH")[0]
      console.log("Ethereum", as)
      console.log("Ethereum Price", as.quote["USD"].price)
    })
  }

  async ngOnInit() {
    await this.getEtheriumPrice();
    await this.loadBlockchainData();
  }
  depositInput(tokenValue) {
    (<HTMLInputElement>document.getElementById("into")).disabled = true



  }

  deposit(tokenValue, etherValue) {
    console.log("tokenValue", tokenValue)
    console.log("etherValue", etherValue)
    if (tokenValue) {
      console.log("token has value");
      this.TokenDepositAmountChanged(tokenValue)
    }
    else {
      console.log("ether has value");
      this.etherDepositAmountChanged(etherValue)
    }
  }

  withdraw(tokenValue, etherValue) {

    console.log("tokenValue", tokenValue)
    console.log("etherValue", etherValue)
    if (tokenValue) {
      console.log("token has value");
      this.TokenWithdrawAmountChanged(tokenValue)
    }
    else {
      console.log("ether has value");
      this.etherWithdrawAmountChanged(etherValue)
    }
  }

  async loadBlockchainData() {
    var exchange, token, account, etherBalance;
    await this.$exchange.subscribe(result => exchange = result)
    await this.$token.subscribe(result => token = result)
    await this.$account.subscribe(result => account = result)

    console.log("Xchange", exchange)
    console.log("Account", account)
    console.log("Token", token)

    await loadBalances(this.web3, exchange, token, account, this.store)
  }

  async etherDepositAmountChanged(etherAmount) {
    var exchange, account
    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)

    await depositEther(this.store, exchange, this.web3, etherAmount, account)
  }

  async etherWithdrawAmountChanged(etherAmount) {
    var exchange, account
    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)


    await withdrawEther(this.store, exchange, this.web3, etherAmount, account)

  }

  async TokenDepositAmountChanged(tokenAmount) {
    var exchange, account, token
    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)
    this.$token.subscribe(result => token = result)


    await depositToken(this.store, exchange, this.web3, token, tokenAmount, account)
  }

  async TokenWithdrawAmountChanged(tokenAmount) {
    var exchange, account, token
    this.$exchange.subscribe(result => exchange = result)
    this.$account.subscribe(result => account = result)
    this.$token.subscribe(result => token = result)


    await withdrawToken(this.store, exchange, this.web3, token, tokenAmount, account)
  }



  async loadotherData() {


    var etherBalance, tokenBalance, exchangeEtherBalance, exchangeTokenBalance;
    this.$tokenBalance.subscribe(result => tokenBalance = result)
    this.$exchangeEtherBalance.subscribe(result => exchangeEtherBalance = result)
    this.$exchangeTokenBalance.subscribe(result => exchangeTokenBalance = result)
    this.$etherBalance.subscribe(result => etherBalance = result)
  }

}