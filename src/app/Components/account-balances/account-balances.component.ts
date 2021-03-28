import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { Observable } from 'rxjs';
import { fetchReduxData } from 'src/helpers/redux.helper';
import { AppState } from 'src/models/models';
import { loadBalances } from 'src/Store/interactions';
import { accountSelector, exchangeEtherBalanceSelector, exchangeSelector, exchangeTokenBalanceSelector, tokenSelector } from 'src/Store/selectors';
import Web3 from 'web3';

@Component({
  selector: '[app-account-balances]',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.scss']
})
export class AccountBalancesComponent implements OnInit {
  $exchange: Observable<AppState>
  $token: Observable<AppState>
  $account: Observable<AppState>
  $exchangeEtherBalance: Observable<AppState>
  $exchangeTokenBalance: Observable<AppState>


  constructor(private web3: Web3, private store: Store<AppState>) {
    this.$exchangeEtherBalance = this.store.pipe(select(exchangeEtherBalanceSelector))
    this.$exchangeTokenBalance = this.store.pipe(select(exchangeTokenBalanceSelector))
    this.$exchange = this.store.pipe(select(exchangeSelector))
    this.$token = this.store.pipe(select(tokenSelector))
    this.$account = this.store.pipe(select(accountSelector))
  }


  async ngOnInit(): Promise<void> {

    let chart_dom = document.getElementById("chart")
    await this.loadBlockchainData()
    const options = await this.setOptions()

    var chart = new ApexCharts(chart_dom, options)
    chart.render();

  }

  async loadBlockchainData() {
    var exchange, token, account, etherBalance;
    await this.$exchange.subscribe(result => exchange = result)
    await this.$token.subscribe(result => token = result)
    await this.$account.subscribe(result => account = result)

    await loadBalances(this.web3, exchange, token, account, this.store)
  }

  async setOptions() {
    var ether = fetchReduxData(this.store, exchangeEtherBalanceSelector)
    var token = fetchReduxData(this.store, exchangeTokenBalanceSelector)
    console.log("ether", ether)
    console.log("token", token)

    var options = {
      chart: {
        height: 450,
        type: 'donut'
      },

      series: [ether, token, 13, 33],
      chartOptions: {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
        dataLabels: {
          style: {
            colors: '#F5F5F5'
          }
        },
        markers: {
          colors: '#F5F5F5'
        },
        colors: '#F5F5F5'

      }
    }

    return options
  }


}
