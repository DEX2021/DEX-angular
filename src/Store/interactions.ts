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
    // Fetch cancelled orders with the Cancel event stream
    const cancelStream = await exchange.getPastEvents('Cancel', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    const cancelled = cancelStream.map(e => e.returnValues)
    console.log("Cancel", cancelled)
    store.dispatch(new Postactions.cancelledOrdersLoaded(cancelled));

    // Fetch filled orders with the Trade event stream
    const tradeStream = await exchange.getPastEvents('Trade', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    const filled = tradeStream.map(e => e.returnValues)
    console.log("Trade", filled)
    store.dispatch(new Postactions.filledOrdersLoaded(filled));

    // Fetch all orders with the Order event stream
    const orderStream = await exchange.getPastEvents('Order', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    const orders = orderStream.map(e => e.returnValues)
    console.log("Order", orders)
    store.dispatch(new Postactions.ordersLoaded(orders));
}
