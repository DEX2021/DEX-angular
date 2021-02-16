// this file handles all the blockchain interactions
import Web3 from "web3"
import * as Postactions from './action'
const Token = require('../abis/Token.json')
const Exchange = require('../abis/Exchange.json')

// export const loadWeb3Better = async (store) => {
//     if (typeof window.ethereum !== 'undefined') {
//         const web3 = new Web3(window.ethereum)
//         //store.dispatch(new Postactions.web3Loaded(web3))
//         return web3
//     } else {
//         window.alert('Please install MetaMask')
//         window.location.assign("https://metamask.io/")
//     }
// }

export const loadWeb3 = async (store) => {
    const web3 = new Web3(Web3.givenProvider || 'http:/localhost:7545')
    //store.dispatch(new Postactions.web3Loaded(web3));
    return web3;
}

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