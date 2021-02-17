import { get } from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, IWeb3 } from '../models/models'
import { ETHER_ADDRESS, ether, tokens, RED, GREEN } from '../app/utils/helpers';
import moment from 'moment';


export const root = createFeatureSelector<AppState>('root')

export const accountSelector = createSelector(
    root,
    (state: AppState) => state.web3Reducer.account
);

export const exchangeSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.exchange
)

// Cancelled, Trade, Orders

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
    if (order.tokenGive = ETHER_ADDRESS) {
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
        return GREEN
    } else {
        return RED
    }
}