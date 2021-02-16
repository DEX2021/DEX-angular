import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadWeb3 } from 'src/Store/interactions';
import Web3 from 'web3'
import { Observable } from 'rxjs'
import { IWeb3 } from '../models/web3'
import * as Postactions from '../Store/action'
const Token = require('../abis/Token.json')
interface AppState {
  web3: IWeb3
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  post: Observable<IWeb3>
  public object = {
    test: [3, 4, 5, 53, 22],
    another: "motherfucker"
  }

  ngOnInit() {

    //this.loadBlockchainData();
  }

  constructor(private store: Store<AppState>) {

  }

  async loadBlockchainData() {
    var web3 = await loadWeb3(this.store)


    const network = await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();

    const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    const totalsupply = await token.methods.totalSupply().call();

    console.log("this is the token:", token)
    console.log("total supply: ", totalsupply)
    console.log("accoutns", accounts)

    this.store.dispatch(new Postactions.web3Loaded(this.object))
    console.log("this is the web3 shiet: ", web3)

  }

}
