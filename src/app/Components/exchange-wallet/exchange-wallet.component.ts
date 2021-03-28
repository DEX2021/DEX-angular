import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { Observable } from 'rxjs';
import { fetchReduxData } from 'src/helpers/redux.helper';
import { AppState } from 'src/models/models';
import { loadBalances } from 'src/Store/interactions';
import { accountSelector, exchangeEtherBalanceSelector, exchangeSelector, exchangeTokenBalanceSelector, tokenSelector, lastPriceSelector } from 'src/Store/selectors';
import Web3 from 'web3';

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


  constructor(private web3: Web3, private store: Store<AppState>, private http: HttpClient) {
    this.$exchangeEtherBalance = this.store.pipe(select(exchangeEtherBalanceSelector))
    this.$exchangeTokenBalance = this.store.pipe(select(exchangeTokenBalanceSelector))
    this.$exchange = this.store.pipe(select(exchangeSelector))
    this.$token = this.store.pipe(select(tokenSelector))
    this.$account = this.store.pipe(select(accountSelector))
    this.$lastPrice = this.store.pipe(select(lastPriceSelector))
  }


  async ngOnInit(): Promise<void> {

    let chart_dom = document.getElementById("chart2")
    await this.loadBlockchainData()
    await this.getEtheriumPrice()

    const options = await this.setOptions()

    var chart = new ApexCharts(chart_dom, options)
    chart.render();

  }

  async getEtheriumPrice() {
    var req = this.http.get("http://dex.berntsen.solutions/").toPromise();
    var { data } = await req;

    var ethereum = data.filter(o => o.symbol == "ETH")[0];
    var quote = ethereum.quote["USD"];

    this.ethereumPrice = quote.price;
  }

  async loadBlockchainData() {
    var exchange, token, account, etherBalance;
    await this.$exchange.subscribe(result => exchange = result)
    await this.$token.subscribe(result => token = result)
    await this.$account.subscribe(result => account = result)

    await loadBalances(this.web3, exchange, token, account, this.store)
  }

  formatCurrency(x)
  {
    return Math.round(x * 100) / 100
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
        position: 'left',
        labels: {
          colors: 'white'
        }
      },

      series: [this.formatCurrency(ether), this.formatCurrency(token)],
      labels: ['Ether', 'Token'],
      
      chartOptions: {
        dataLabels: {
          formatter: function(val) {
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
