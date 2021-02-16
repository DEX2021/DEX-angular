import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadWeb3, loadAccount, loadToken, loadExchange } from 'src/Store/interactions';
import { Observable } from 'rxjs'
import { IToken, IWeb3, IExchange, AppState } from '../models/models'
import { accountSelector } from '../Store/selectors'
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  post: Observable<IWeb3>
  $selector: Observable<IWeb3>
  public object = {
    test: [3, 4, 5, 53, 22],
    another: "motherfucker"
  }

  async ngOnInit() {

    await this.loadBlockchainData();
    this.$selector.subscribe(s => console.log(`Account: ${s}`));
  }

  constructor(private web3: Web3, private store: Store<AppState>) {
    this.$selector = this.store.pipe(select(accountSelector))
  }

  async loadBlockchainData() {
    const network = await this.web3.eth.net.getNetworkType()
    const networkId = await this.web3.eth.net.getId();


    const token = await loadToken(this.web3, networkId, this.store)
    console.log("this is the token:", token)


    const exchange = await loadExchange(this.web3, networkId, this.store)
    console.log("this is the exchange:", exchange)


    //this.store.dispatch(new Postactions.web3Loaded(this.object))
    var account = await loadAccount(this.web3, this.store)
    console.log("this is the web3 shiet: ", account)

  }

}
