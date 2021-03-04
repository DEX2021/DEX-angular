import { get, reject, groupBy, maxBy, minBy } from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, IWeb3 } from '../models/models'
import { ether, ETHER_ADDRESS, formatBalance, formatBalanceToEther, GREEN, RED, tokens2 } from './helpers'
import * as moment from 'moment';
import lodash from 'lodash';



export const root = createFeatureSelector<AppState>('root')

// export const accountSelector = createSelector(
//     account,
//     (state: AppState) => state.web3Reducer.account
// );

const rootReducer = state => get(state, 'root')
export const accountSelector = createSelector(
    root,
    (state: AppState) => state.web3Reducer.account
);

// Cancelled, Trade, Open Orders

export const cancelledOrdersSelector = createSelector(
    rootReducer,
    (state: AppState) => state.exchangeReducer.orders.cancelled
)

export const filledOrdersSelector = createSelector(
    root,
    (state: AppState) => {
        let orders = state.exchangeReducer.orders.filled;

        // Sort orders ascending by date for price comparison
        orders.data = orders.data.sort((a, b) => a.timestamp - b.timestamp)

        orders.data = decorateFilledOrders(orders.data)

        // Sort orders decending by date for display
        orders.data = orders.data.sort((a, b) => b.timestamp - a.timestamp)
        return orders
    }
)

export const ordersSelector = createSelector(
    rootReducer,
    (state: AppState) => state.exchangeReducer.orders.orders
)

const openOrders = state => {
    const all = ordersSelector(state);
    const cancelled = cancelledOrdersSelector(state);
    const filled = filledOrdersSelector(state);
    const loaded = cancelled.loaded && filled.loaded && all.loaded;

    const openOrders = reject(all.data, (order) => {
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
        orders.data = groupBy(orders.data, 'orderType');
        // Sort buy orders by token price
        const buyOrders = get(orders.data, 'buy', [])
        orders.data = {
            ...orders.data,
            buyOrders: buyOrders.sort((a,b) => b.tokenPrice - a.tokenPrice),
        }
        // Sort sell orders by token price
        const sellOrders = get(orders.data, 'sell', [])
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
        tokenAmount: tokens2(tokenAmount),
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

export const priceChartSelector = createSelector(
    filledOrdersSelector,
    (filledOrders) => {
        let orders = filledOrders.data;
        // Sort orders by date ascending to compare history
        orders = orders.sort((a,b) => a.timestamp - b.timestamp)
        // Decorate orders - add display attributes
        orders = orders.map((o) => decorateOrder(o))
        // Get last 2 order for final price & price change
        let secondLastOrder, lastOrder
        [secondLastOrder, lastOrder] = orders.slice(orders.length - 2, orders.length)
        // Get last order price
        const lastPrice = get(lastOrder, 'tokenPrice', 0)
        // Get second last order price
        const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0)
        
        return({
            lastPrice,
            lastPriceChange: (lastPrice >= secondLastPrice ? '+' : '-'),
            series: [{
                data: buildGraphData(orders)
            }]
        })
    }
)

const buildGraphData = (orders) => {
    // Group orders by hour (for the graph)
    orders = groupBy(orders, (o) => moment.unix(o.timestamp).startOf('hour').format())
    // Get each data where data exists
    const hours = Object.keys(orders)
    // Build the graph series
    const graphData = hours.map((hour) => {
        // Fetch all orders from current hour
        const group = orders[hour]
        // Calculate price values for open, high, low and close
        const open = group[0] // First order
        const high = maxBy(group, 'tokenPrice') // High Price
        const low = minBy(group, 'tokenPrice') // Low Price
        const close = group[group.length - 1] // Last order

        return {
            x: new Date(hour),
            y: [open.tokenPrice, high.tokenPrice, low.tokenPrice, close.tokenPrice]
        }
    })

    return graphData;
}

export const tokenLoadedSelector = createSelector(
    root,
    (state: AppState) => state.tokenReducer.loaded
)

export const tokenSelector = createSelector(
    root,
    (state: AppState) => state.tokenReducer.token
)

export const exchangeLoadedSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.loaded
)

export const exchangeSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.exchange
)

export const contractsLoadedSelector = createSelector(
    tokenLoadedSelector,
    exchangeLoadedSelector,
    (tl, el) => (tl && el)
)

export const balancesLoadingSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.balancesLoading
)

export const etherBalanceSelector = createSelector(
    root,
    (state: AppState) => formatBalance(state.web3Reducer.balance),
)

export const tokenBalanceSelector = createSelector(
    root,
    (state: AppState) => formatBalance(state.tokenReducer.balance)

)

export const exchangeEtherBalanceSelector = createSelector(
    root,
    (state: AppState) => formatBalance(state.exchangeReducer.etherBalance),
)

export const exchangeTokenBalanceSelector = createSelector(
    root,
    (state: AppState) => formatBalance(state.exchangeReducer.tokenBalance),

)

export const etherDepositAmountSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.etherDepositAmountChanged
)

export const etherWithdrawAmountSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.etherWithdrawAmountChanged
)

export const tokenDepositAmountSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.tokenDepositAmount
)

export const tokenWithdrawAmountSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.tokenWithdrawAmount
)

const decorateMyFilledOrders = (orders, account) => {
    return (
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

    return ({
        ...order,
        orderTypeClass: (orderType === 'buy' ? GREEN : RED),
        orderSign: (orderType === 'buy' ? '+' : '-')
    })
}

const decorateMyOpenOrder = (order) => {
    let orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';

    return ({
        ...order,
        orderType,
        orderTypeClass: (orderType === 'buy' ? GREEN : RED)
    })
}

const decorateMyOpenOrders = (orders) => {
    return (
        orders.map((order) => {
            order = decorateOrder(order);
            order = decorateMyOpenOrder(order)
            return order
        })
    )
}

const orderCancelling = state => get(state, 'root', false)
export const orderCancellingSelector = createSelector(
    orderCancelling,
    (state: AppState) => state.exchangeReducer.orderCancelling
)

const orderFilling = state => get(state, 'root', false)
export const orderFillingSelector = createSelector(
    orderFilling,
    (state: AppState) => state.exchangeReducer.orderFilling
)