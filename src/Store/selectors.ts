import { get } from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, IOrders, IWeb3 } from '../models/models'
import { ETHER_ADDRESS, ether, tokens, RED, GREEN } from '../app/utils/helpers';
import moment from 'moment';
import lodash from 'lodash';


export const root = createFeatureSelector<AppState>('root')

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