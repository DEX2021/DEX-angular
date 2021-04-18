import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/models';
import { depositEther, withdrawEther, depositToken, withdrawToken } from 'src/Store/interactions';
import { balancesLoadingSelector, etherBalanceSelector, exchangeEtherBalanceSelector, exchangeTokenBalanceSelector, tokenBalanceSelector, lastPriceSelector, appInitSelector } from 'src/Store/selectors';
import Web3 from 'web3'
import { DexService } from 'src/app/Services/DexService.service';

@Component({
  selector: '[app-deposits]',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit {
  $etherBalance: Observable<AppState>
  $tokenBalance: Observable<AppState>
  $exchangeEtherBalance: Observable<AppState>
  $exchangeTokenBalance: Observable<AppState>
  $balancesLoading: Observable<Boolean>

  withdrawAmount: number = 0;
  etherAmount: number;

  $lastPrice: Observable<number>
  ethereumPrice: number = 0;

  $appInit: Observable<Boolean>;



  constructor(private web3: Web3, private store: Store<AppState>, private dex: DexService) {
    this.$etherBalance = this.store.pipe(select(etherBalanceSelector))
    this.$appInit = this.store.pipe(select(appInitSelector));

    this.$balancesLoading = this.store.pipe(select(balancesLoadingSelector))
    this.$tokenBalance = this.store.pipe(select(tokenBalanceSelector))
    this.$exchangeEtherBalance = this.store.pipe(select(exchangeEtherBalanceSelector))
    this.$exchangeTokenBalance = this.store.pipe(select(exchangeTokenBalanceSelector))
    this.$lastPrice = this.store.pipe(select(lastPriceSelector));

    this.$tokenBalance.subscribe()
    this.$exchangeEtherBalance.subscribe()
    this.$exchangeTokenBalance.subscribe()

  }

  formatCurrency(x)
  {
    x = Math.round(x * 100) / 100
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  async ngOnInit() {
    this.ethereumPrice = await this.dex.EthereumPrice();
  }

  depositInput(tokenValue) {
    (<HTMLInputElement>document.getElementById("into")).disabled = true
  }

  deposit(tokenValue, etherValue) {
    if (tokenValue) {
      this.TokenDepositAmountChanged(tokenValue)
    }
    else if (etherValue) {
      this.etherDepositAmountChanged(etherValue)
    }
  }

  withdraw(tokenValue, etherValue) {
    if (tokenValue) {
      this.TokenWithdrawAmountChanged(tokenValue)
    } 
    else if (etherValue) {
      this.etherWithdrawAmountChanged(etherValue)
    }
  }

  async reloadBalance() {
    console.log("RELOAD CLICK")
    await this.dex.LoadBalances();
  }

  async etherDepositAmountChanged(etherAmount) {
    await depositEther(this.store, this.dex.Exchange, this.web3, etherAmount, this.dex.Account)
    await this.reloadBalance()
  }

  async etherWithdrawAmountChanged(etherAmount) {
    await withdrawEther(this.store, this.dex.Exchange, this.web3, etherAmount, this.dex.Account)
    await this.reloadBalance()
  }

  async TokenDepositAmountChanged(tokenAmount) {
    await depositToken(this.store, this.dex.Exchange, this.web3, this.dex.Token, tokenAmount, this.dex.Account)
    await this.reloadBalance()
  }

  async TokenWithdrawAmountChanged(tokenAmount) {
    await withdrawToken(this.store, this.dex.Exchange, this.web3, this.dex.Token, tokenAmount, this.dex.Account)
    await this.reloadBalance()
  }



  async loadotherData() {


    var etherBalance, tokenBalance, exchangeEtherBalance, exchangeTokenBalance;
    this.$tokenBalance.subscribe(result => tokenBalance = result)
    this.$exchangeEtherBalance.subscribe(result => exchangeEtherBalance = result)
    this.$exchangeTokenBalance.subscribe(result => exchangeTokenBalance = result)
    this.$etherBalance.subscribe(result => etherBalance = result)
  }

}