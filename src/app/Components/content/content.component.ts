import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/models/models';
import { loadExchange, subscribeToEvents } from 'src/Store/interactions';
import Web3 from 'web3'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private web3: Web3, private store: Store<AppState>) { }

  async ngOnInit() {
    const networkId = await this.web3.eth.net.getId();


    const exchange = await loadExchange(this.web3, networkId, this.store)
    if (!exchange) {
      window.alert("Exchange smart contract not detected on current network. Please select another netowrk with metamask")
    }
    await subscribeToEvents(this.store, exchange)
  }

}
