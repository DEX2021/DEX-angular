import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadAccount, loadToken, loadExchange, loadAllOrders } from 'src/Store/interactions';
import { Observable } from 'rxjs'
import { IToken, IWeb3, IExchange, AppState } from '../models/models'
import { accountSelector, exchangeSelector } from '../Store/selectors'
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  post: Observable<IWeb3>
  $selector: Observable<AppState>
  $exchange: Observable<AppState>
  appLoaded: Boolean = false;

  async ngOnInit() {

    await this.loadBlockchainData();
    //this.$selector.subscribe(result => console.log("this is the selector:", result))
    //this.$tests.subscribe(result => console.log("contracts laoded???:", result))

    //console.log("contracts loaded?", contractsLoadedSelector(this.store))
  }

  constructor(private web3: Web3, private store: Store<AppState>) {
    this.$selector = this.store.pipe(select(accountSelector))
    this.$exchange = this.store.pipe(select(exchangeSelector))
  }

  async loadBlockchainData() {
    const network = await this.web3.eth.net.getNetworkType()
    const networkId = await this.web3.eth.net.getId();

    const token = await loadToken(this.web3, networkId, this.store)
    if (!token) {
      window.alert("Token smart contract not detected on current network. Please select another netowrk with metamask")
    }
    //console.log("this is the token:", token)

    const exchange = await loadExchange(this.web3, networkId, this.store)
    if (!exchange) {
      window.alert("Exchange smart contract not detected on current network. Please select another netowrk with metamask")
    }
    //console.log("this is the exchange:", exchange)

    await loadAllOrders(this.store, exchange);
    //this.store.dispatch(new Postactions.web3Loaded(this.object))
    var account = await loadAccount(this.web3, this.store)
    //console.log("this is the web3 shiet: ", account)

    //console.log("this is the exchange: ", this.$exchange)
    //await loadAllOrders(exchange, this.store);
    this.appLoaded = true;

  }

}
