import { Component } from '@angular/core';
import Web3 from 'web3'
const Token = require('../abis/Token.json')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DEX';

  ngOnInit() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || 'http:/localhost:7545')
    const network =await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();

    const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    const totalsupply = await token.methods.totalSupply().call();

    console.log("this is the token:", token)

  }


}
