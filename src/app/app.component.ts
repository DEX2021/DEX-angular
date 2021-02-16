import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadWeb3, loadAccount, loadToken, loadExchange } from 'src/Store/interactions';
import { Observable } from 'rxjs'
import { IToken, IWeb3, IExchange, AppState } from '../models/models'
import { accountSelector } from '../Store/selectors'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  post: Observable<IWeb3>
  $selector: Observable<AppState>
  public object = {
    test: [3, 4, 5, 53, 22],
    another: "motherfucker"
  }

  async ngOnInit() {

    await this.loadBlockchainData();
    this.$selector.subscribe(result => console.log("this is the selector:", result))
  }

  constructor(private store: Store<AppState>) {
    this.$selector = this.store.pipe(select(accountSelector))
  }

  async loadBlockchainData() {
    var web3 = await loadWeb3(this.store)


    const network = await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId();


    const token = await loadToken(web3, networkId, this.store)
    console.log("this is the token:", token)


    const exchange = await loadExchange(web3, networkId, this.store)
    console.log("this is the exchange:", exchange)


    //this.store.dispatch(new Postactions.web3Loaded(this.object))
    var account = await loadAccount(web3, this.store)
    console.log("this is the web3 shiet: ", account)

  }

}
