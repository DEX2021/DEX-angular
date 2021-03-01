// this file handles all the blockchain interactions
import Web3 from "web3"
import * as Postactions from './action'
const Token = require('../abis/Token.json')
const Exchange = require('../abis/Exchange.json')

export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000";




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
        store.dispatch(new Postactions.web3TokenLoaded(token))
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

export const loadAllOrders = async (exchange, dispatch) => {
    const cancelStream = await exchange.getPastEvents("Cancel", { fromBlock: 0, toBlock: "latest" })
    console.log(cancelStream)
}

export const loadBalances = async (web3, exchange, token, account, store) => {
    if (typeof account !== 'undefined') {
        // Ether balance in wallet
        const etherBalance = await web3.eth.getBalance(account)
        store.dispatch(new Postactions.etherBalanceLoaded(etherBalance))

        // Token balance in wallet
        const tokenBalance = await token.methods.balanceOf(account).call()
        store.dispatch(new Postactions.tokenBalanceLoaded(tokenBalance))

        // Ether balance in exchange
        const exchangeEtherBalance = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call()
        store.dispatch(new Postactions.exchangeEtherBalanceLoaded(exchangeEtherBalance))

        // Token balance in exchange
        const exchangeTokenBalance = await exchange.methods.balanceOf(token.options.address, account).call()
        store.dispatch(new Postactions.exchangeTokenBalanceLoaded(exchangeTokenBalance))

        // Trigger all balances loaded
        store.dispatch(new Postactions.balancesLoaded())
    } else {
        window.alert('Please login with MetaMask')
    }
}

// fill out see deposits 40min
export const subscribeToEvents = async () => {

}


export const depositEther = async (store, exchange, web3, amount, account) => {
    exchange.methods.depositEther().send({ from: account, value: web3.utils.toWei(amount, 'ether') })
        .on('transactionHash', (hash) => {
            store.dispatch(new Postactions.balancesLoading())
        })
        .on('error', (error) => {
            console.error(error)
            window.alert(`There was an error!`)
        })
}

export const withdrawEther = async (store, exchange, web3, amount, account) => {
    exchange.methods.withdrawEther(web3.utils.toWei(amount, 'ether')).send({ from: account })
        .on('transactionHash', (hash) => {
            store.dispatch(new Postactions.balancesLoading())
        })
        .on('error', (error) => {
            console.error(error)
            window.alert(`There was an error!`)
        })
}

export const depositToken = (store, exchange, web3, token, amount, account) => {
    amount = web3.utils.toWei(amount, 'ether')

    token.methods.approve(exchange.options.address, amount).send({ from: account })
        .on('transactionHash', (hash) => {
            exchange.methods.depositToken(token.options.address, amount).send({ from: account })
                .on('transactionHash', (hash) => {
                    store.dispatch(new Postactions.balancesLoading())
                })
                .on('error', (error) => {
                    console.error(error)
                    window.alert(`There was an error!`)
                })
        })
}

export const withdrawToken = (store, exchange, web3, token, amount, account) => {
    exchange.methods.withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether')).send({ from: account })
        .on('transactionHash', (hash) => {
            store.dispatch(new Postactions.balancesLoading())
        })
        .on('error', (error) => {
            console.error(error)
            window.alert(`There was an error!`)
        })
}