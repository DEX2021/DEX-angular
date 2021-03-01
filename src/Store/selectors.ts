import { get } from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, IOrders, IWeb3 } from '../models/models'
import { ETHER_ADDRESS, ether, tokens, RED, GREEN } from '../app/utils/helpers';
import moment from 'moment';
import lodash from 'lodash';
import { formatBalance, formatBalanceToEther } from './helpers'


export const root = createFeatureSelector<AppState>('root')

// export const accountSelector = createSelector(
//     account,
//     (state: AppState) => state.web3Reducer.account
// );

const account = state => get(state, 'root')
export const accountSelector = createSelector(
    root,
    (state: AppState) => state.web3Reducer.account
);

export const exchangeSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.exchange
)

// Cancelled, Trade, Open Orders

export const cancelledOrdersSelector = createSelector(
    root,
    (state: AppState) => state.ordersReducer.cancelled
)

export const filledOrdersSelector = createSelector(
    root,
    (state: AppState) => {
        let orders = state.ordersReducer.filled;

        // Sort orders ascending by date for price comparison
        orders.data = orders.data.sort((a, b) => a.timestamp - b.timestamp)

        orders.data = decorateFilledOrders(orders.data)

        // Sort orders decending by date for display
        orders.data = orders.data.sort((a, b) => b.timestamp - a.timestamp)
        return orders
    }
)

export const ordersSelector = createSelector(
    root,
    (state: AppState) => state.ordersReducer.orders
)

const openOrders = state => {
    const all = ordersSelector(state);
    const cancelled = cancelledOrdersSelector(state);
    const filled = filledOrdersSelector(state);
    const loaded = cancelled.loaded && filled.loaded && all.loaded;

    const openOrders = lodash.reject(all.data, (order) => {
        const orderFilled = filled.data.some((o) => o.id === order.id);
        const orderCancelled = cancelled.data.some((o) => o.id === order.id)

        return(orderFilled || orderCancelled)
    })

    return {
        loaded: loaded,
        data: openOrders
    }
}

export const orderBookSelector = createSelector(
    openOrders,
    (orders) => {
        // Decorate orders
        orders.data = decorateOrderBookOrders(orders.data);
        // Group orders by order type
        orders.data = lodash.groupBy(orders.data, 'orderType');
        // Sort buy orders by token price
        const buyOrders = lodash.get(orders.data, 'buy', [])
        orders.data = {
            ...orders.data,
            buyOrders: buyOrders.sort((a,b) => b.tokenPrice - a.tokenPrice),
        }
        // Sort sell orders by token price
        const sellOrders = lodash.get(orders.data, 'sell', [])
        orders.data = {
            ...orders.data,
            sellOrders: sellOrders.sort((a,b) => b.tokenPrice - a.tokenPrice),
        }

        return orders;
    }
)

const decorateFilledOrders = (orders) => {
    // Track previous order (to compare history)
    let previousOrder = orders[0];

    return orders.map(order => {
        order = decorateOrder(order);
        order = decorateFilledOrder(order, previousOrder);

        previousOrder = order// update previous order once it's decorated
        return order
    })
}

const decorateOrder = (order) => {
    let etherAmount;
    let tokenAmount;

    // Determine Ether and Token amount
    if (order.tokenGive === ETHER_ADDRESS) {
        etherAmount = order.amountGive;
        tokenAmount = order.amountGet;        
    } else {
        etherAmount = order.amountGet;
        tokenAmount = order.amountGive; 
    }

    // Calculate token price to 5 decimal places
    const precision = 100000
    let tokenPrice = (etherAmount / tokenAmount)
    tokenPrice = Math.round(tokenPrice * precision) / precision

    let decoratedOrder = {
        ...order,
        etherAmount: ether(etherAmount),
        tokenAmount: tokens(tokenAmount),
        tokenPrice,
        formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ss a M/D')
    }

    return decoratedOrder
}

const decorateFilledOrder = (order, previousOrder) => {
    return({
        ...order,
        tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder)
    })
}

const tokenPriceClass = (tokenPrice, orderId, previousOrder) => {
    if (previousOrder.id === orderId) {
        return GREEN;
    }

    if (previousOrder.tokenPrice <= tokenPrice) {
        return GREEN;
    } else {
        return RED;
    }
}

const decorateOrderBookOrders = (order) => {
    return order.map((order) => {
        order = decorateOrder(order);
        order = decorateOrderBookOrder(order);
        return order
    })
}

const decorateOrderBookOrder = (order) => {
    const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';
    return({
        ...order,
        orderType: orderType,
        orderTypeClass: (orderType === 'buy' ? GREEN : RED),
        orderFillClass: (orderType === 'buy' ? 'sell' : 'buy')
    })
}

export const myFilledOrderSelector = createSelector(
    accountSelector,
    filledOrdersSelector,
    (account, filledOrders) => {
        let orders = filledOrders.data;
        // Find out orders
        orders = orders.filter((o) => o.user === account || o.userFill == account);
        // Sort by date ascending
        orders = orders.sort((a, b) => a.timestamp - b.timestamp);
        // Decorate orders - add display attributes
        orders = decorateMyFilledOrders(orders, account);
        
        return orders;
    }
)

export const myOpenOrderSelector = createSelector(
    accountSelector,
    ordersSelector,
    (account, openOrders) => {
        let orders = openOrders.data;
        // Find out orders
        orders = orders.filter((o) => o.user === account || o.userFill == account);
        // Decorate orders - add display attributes
        orders = decorateMyOpenOrders(orders);
        // Sort by date ascending
        orders = orders.sort((a, b) => a.timestamp - b.timestamp);

        return orders;
    }
)

const decorateMyFilledOrders = (orders, account) => {
    return(
        orders.map((order) => {
            order = decorateOrder(order);
            order = decorateMyFilledOrder(order, account)
            return order
        })
    )
}

const decorateMyFilledOrder = (order, account) => {
    const myOrder = order.user === account

    let orderType;
    if (myOrder) {
        orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
    } else {
        orderType = order.tokenGive === ETHER_ADDRESS ? 'sell' : 'buy'
    }

    return({
        ...order,
        orderTypeClass: (orderType === 'buy' ? GREEN : RED),
        orderSign: (orderType === 'buy' ? '+' : '-')
    })
}

const decorateMyOpenOrders = (orders) => {
    return(
        orders.map((order) => {
            order = decorateOrder(order);
            order = decorateMyOpenOrder(order)
            return order
        })
    )
}

const decorateMyOpenOrder = (order) => {
    let orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';

    return({
        ...order,
        orderType,
        orderTypeClass: (orderType === 'buy' ? GREEN : RED)
    })
}

const tokenLoaded = state => get(state, 'root', false)
export const tokenLoadedSelector = createSelector(
    tokenLoaded,
    (state: AppState) => state.tokenReducer.loaded
)

const token = state => get(state, 'root', false)
export const tokenSelector = createSelector(
    token,
    (state: AppState) => state.tokenReducer.token
)

const exchangeLoaded = state => get(state, 'root', false)
export const exchangeLoadedSelector = createSelector(
    exchangeLoaded,
    (state: AppState) => state.exchangeReducer.loaded
)

const exchange = state => get(state, 'root', false)
export const exchangeSelector = createSelector(
    exchange,
    (state: AppState) => state.exchangeReducer.exchange
)

export const contractsLoadedSelector = createSelector(
    tokenLoaded,
    exchangeLoaded,
    (tl, el) => (tl && el)
)



const balancesLoading = state => get(state, 'root', true)
export const balancesLoadingSelector = createSelector(
    balancesLoading,
    (state: AppState) => state.exchangeReducer.balancesLoading
)

const etherBalance = state => get(state, 'root', 0)
export const etherBalanceSelector = createSelector(
    etherBalance,
    (state: AppState) => formatBalance(state.web3Reducer.balance),
)

const tokenBalance = state => get(state, 'root', 0)
export const tokenBalanceSelector = createSelector(
    tokenBalance,
    (state: AppState) => formatBalance(state.tokenReducer.balance)

)

const exchangeEtherBalance = state => get(state, 'root', 0)
export const exchangeEtherBalanceSelector = createSelector(
    exchangeEtherBalance,
    (state: AppState) => formatBalance(state.exchangeReducer.etherBalance),
)

const exchangeTokenBalance = state => get(state, 'root', 0)
export const exchangeTokenBalanceSelector = createSelector(
    exchangeTokenBalance,
    (state: AppState) => formatBalance(state.exchangeReducer.tokenBalance),

)

const etherDepositAmount = state => get(state, "root", null)
export const etherDepositAmountSelector = createSelector(
    etherDepositAmount,
    (state: AppState) => state.exchangeReducer.etherDepositAmountChanged
)

const etherWithdrawAmount = state => get(state, "root", null)
export const etherWithdrawAmountSelector = createSelector(
    etherWithdrawAmount,
    (state: AppState) => state.exchangeReducer.etherWithdrawAmountChanged
)


const tokenDepositAmount = state => get(state, "root", null)
export const tokenDepositAmountSelector = createSelector(
    tokenDepositAmount,
    (state: AppState) => state.exchangeReducer.tokenDepositAmount
)


const tokenWithdrawAmount = state => get(state, "root", null)
export const tokenWithdrawAmountSelector = createSelector(
    tokenWithdrawAmount,
    (state: AppState) => state.exchangeReducer.tokenWithdrawAmount
)

