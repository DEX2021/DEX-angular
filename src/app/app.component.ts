import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadWeb3 } from 'src/Store/interactions';
import Web3 from 'web3'
const Token = require('../abis/Token.json')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DEX';
  store$: any;

  ngOnInit() {

    this.loadBlockchainData();
  }

  constructor(private store: Store<{ web3: any }>) {

  }

  async loadBlockchainData() {
    const web3 = await loadWeb3(this.store)
    console.log("this is the web3 shiet: ", web3)
    // const network = await web3.eth.net.getNetworkType()
    // const networkId = await web3.eth.net.getId();
    // const accounts = await web3.eth.getAccounts();

    //const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    // const totalsupply = await token.methods.totalSupply().call();

    //console.log("this is the token:", token)

  }

}
