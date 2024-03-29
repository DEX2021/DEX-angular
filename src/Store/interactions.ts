// this file handles all the blockchain interactions
import { Store } from "@ngrx/store";
import Web3 from "web3"
import * as Postactions from './action'
import { exchangeSelector } from './selectors';
const Token = require('../abis/Token.json')
const Exchange = require('../abis/Exchange.json')

export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000";

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

export const loadBalances = async (web3, exchange, token, account, store) => {
    console.log("LB Exchange", exchange)
    console.log("LB token", token)
    console.log("LB acc", account)
    console.log("LB Store", store)
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

export const cancelOrder = (store, exchange, order, account) => {
    exchange.methods.cancelOrder(order.id).send({ from: account })
        .on('transactionHash', (hash) => {
            store.dispatch(new Postactions.orderCancelling())
        })
        .on('error', (error) => {
            console.log(error)
            window.alert("There was an error")
        })
}

export const fillOrder = (store, exchange, order, account) => {
    exchange.methods.fillOrder(order.id).send({ from: account })
        .on('transactionHash', (hash) => {
            store.dispatch(new Postactions.orderFilling())
            store.dispatch(new Postactions.balancesLoading())
        })
        .on('error', (error) => {
            console.log(error)
            window.alert("There was an error")
        })
}

export const makeBuyOrder = (store, exchange, web3, token, order, account) => {
    const tokenGet = token.options.address
    const amountGet = web3.utils.toWei(order.amount.toString(), 'ether')
    const tokenGive = ETHER_ADDRESS
    const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

    exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive)
        .send({ from: account })
        .on('transactionHash', (hash) => {
            store.dispatch(new Postactions.buyOrderMaking())
            store.dispatch(new Postactions.balancesLoading())
        })
        .on('error', (error) => {
            console.log(error)
            window.alert("An error has occurred.")
        })
}

export const makeSellOrder = (store, exchange, web3, token, order, account) => {
    const tokenGet = ETHER_ADDRESS
    const amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
    const tokenGive = token.options.address
    const amountGive = web3.utils.toWei(order.amount.toString(), 'ether')

    exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive)
        .send({ from: account })
        .on('transactionHash', (hash) => {
            store.dispatch(new Postactions.sellOrderMaking())
            store.dispatch(new Postactions.balancesLoading())
        })
        .on('error', (error) => {
            console.log(error)
            window.alert("An error has occurred.")
        })
}

// see deposits 40 min mark to complete
export const subscribeToEvents = async (store, exchange) => {
    exchange.events.Cancel({}, (error, event) => {
        store.dispatch(new Postactions.orderCancelled(event.returnValues))
    })

    exchange.events.Trade({}, (error, event) => {
        store.dispatch(new Postactions.orderFilled(event.returnValues))
        store.dispatch(new Postactions.balancesLoaded())
    })

    exchange.events.Order({}, (error, event) => {
        store.dispatch(new Postactions.orderMade(event.returnValues))
        store.dispatch(new Postactions.balancesLoaded())
    })

    exchange.events.Deposit({}, (error, event) => {
        store.dispatch(new Postactions.balancesLoaded())
    })

    exchange.events.Withdraw({}, (error, event) => {
        store.dispatch(new Postactions.balancesLoaded())
    })
}