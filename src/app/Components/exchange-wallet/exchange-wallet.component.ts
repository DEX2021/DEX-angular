import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { Observable } from 'rxjs';
import { fetchReduxData } from 'src/helpers/redux.helper';
import { AppState } from 'src/models/models';
import { loadBalances } from 'src/Store/interactions';
import { appInitSelector, accountSelector, exchangeEtherBalanceSelector, exchangeSelector, exchangeTokenBalanceSelector, tokenSelector, lastPriceSelector } from 'src/Store/selectors';
import Web3 from 'web3';
import { DexService } from 'src/app/Services/DexService.service';
import { formatCurrency } from 'src/app/utils/helpers';

@Component({
  selector: '[app-exchange-wallet]',
  templateUrl: './exchange-wallet.component.html',
  styleUrls: ['./exchange-wallet.component.scss']
})
export class ExchangeWalletComponent implements OnInit {
  $exchange: Observable<AppState>
  $token: Observable<AppState>
  $account: Observable<AppState>
  $exchangeEtherBalance: Observable<AppState>
  $exchangeTokenBalance: Observable<AppState>
  $lastPrice: Observable<number>
  ethereumPrice: number = 0;

  $appInit: Observable<Boolean>;


  constructor(private web3: Web3, private store: Store<AppState>, private dex: DexService, private http: HttpClient) {
    this.$exchangeEtherBalance = this.store.pipe(select(exchangeEtherBalanceSelector))
    this.$exchangeTokenBalance = this.store.pipe(select(exchangeTokenBalanceSelector))
    this.$exchange = this.store.pipe(select(exchangeSelector))
    this.$token = this.store.pipe(select(tokenSelector))
    this.$account = this.store.pipe(select(accountSelector))
    this.$lastPrice = this.store.pipe(select(lastPriceSelector))

    this.$appInit = this.store.pipe(select(appInitSelector))
  }


  async ngOnInit(): Promise<void> {

    let chart_dom = document.getElementById("chart2")

    this.$appInit.subscribe(async loaded => {
      if (loaded) {
        this.ethereumPrice = await this.dex.EthereumPrice();

        const options = await this.setOptions()

        var chart = new ApexCharts(chart_dom, options)
        chart.render();
      }
    })
  }

  async loadBlockchainData() {
    var exchange, token, account, etherBalance;
    await this.$exchange.subscribe(result => exchange = result)
    await this.$token.subscribe(result => token = result)
    await this.$account.subscribe(result => account = result)

    // await loadBalances(this.web3, exchange, token, account, this.store)
  }

  async setOptions() {
    var lastPrice = fetchReduxData(this.store, lastPriceSelector)
    var ether = fetchReduxData(this.store, exchangeEtherBalanceSelector) * this.ethereumPrice
    var token = fetchReduxData(this.store, exchangeTokenBalanceSelector) * lastPrice

    var options = {
      chart: {
        height: 450,
        type: 'pie'
      },
      tooltip: {
        theme: "dark",
      },
      legend: {
        fontSize: "24px",
        position: 'left',
        labels: {
          colors: 'white'
        }
      },

      series: [formatCurrency(ether), formatCurrency(token)],
      labels: ['Ether', 'Token'],

      chartOptions: {
        dataLabels: {
          formatter: function (val) {
            return `\$${val}`
          },
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
