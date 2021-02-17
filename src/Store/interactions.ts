// this file handles all the blockchain interactions
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IExchange } from 'src/models/models';
import Web3, {Modules} from "web3"
import * as Postactions from './action'
import { exchangeSelector } from './selectors';
const Token = require('../abis/Token.json')
const Exchange = require('../abis/Exchange.json')

export const loadAccount = async (web3, store) => {
    const accounts = await web3.eth.getAccounts()
    const account = await accounts[0]
    if (typeof account !== 'undefined') {
        store.dispatch(new Postactions.web3AccountLoaded(account))
        return account
    } else {
        window.alert('Please login with MetaMask')
        return null
    }
}

export const loadToken = async (web3, networkId, store) => {
    try {
        const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
        store.dispatch(new Postactions.web3TokenLoaded(JSON.parse(JSON.stringify(token))))
        return token
    } catch (error) {
        console.log('Contract not deployed to the current network. Please select another network with Metamask.')
        return null
    }
}

export const loadExchange = async (web3, networkId, store) => {
    try {
        const exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
        store.dispatch(new Postactions.exchangeLoaded(exchange))
        return exchange
    } catch (error) {
        console.log('Contract not deployed to the current network. Please select another network with Metamask.')
        return null
    }
}

export const loadAllOrders = async (store: Store, exchange) => {
    let orderData = {
        'Cancel': Postactions.cancelledOrdersLoaded,
        'Trade': Postactions.filledOrdersLoaded,
        'Order': Postactions.ordersLoaded
    }

    for (const [event, action] of Object.entries(orderData)) {
        const stream = await exchange.getPastEvents(
            event,
            {
                fromBlock: 0,
                toBlock: 'latest'
            }
        );

        const data = stream.map(e => e.returnValues);
        store.dispatch(new action(data));
    }
}
