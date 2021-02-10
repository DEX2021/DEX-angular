import { createAction, props } from '@ngrx/store';
import { Web3Connection, Web3Account, Contract, Order, Orders, CancelledOrders, FilledOrders, Balance, Amount, Price } from './states';

// Web3

export const Web3Loaded = createAction(
    'WEB3_LOADED',
    props<Web3Connection>()
);

export const Web3AccountLoaded = createAction(
    'WEB3_ACCOUNT_LOADED',
    props<Web3Account>()
)

// Token

export const TokenLoaded = createAction(
    'TOKEN_LOADED',
    props<Contract>()
)

export const ExchangeLoaded = createAction(
    'EXCHANGE_LOADED',
    props<Contract>()
)

// (Exchange Ether Balance, Ether Balance, Exchange Token) Loading

export const EtherBalanceLoaded = createAction(
    'ETHER_BALANCE_LOADED',
    props<Balance>()
)

export const ExchangeEtherBalanceLoaded = createAction(
    'EXCHANGE_ETHER_BALANCE_LOADED',
    props<Balance>()
)

export const ExchangeTokenBalanceLoaded = createAction(
    'EXCHANGE_TOKEN_BALANCE_LOADED',
    props<Balance>()
)

// Balance Loading

export const BalancesLoaded = createAction('BALANCES_LOADED')

export const BalancesLoading = createAction('BALANCES_LOADING')

// Ether (Deposit, Withdraw) Amount

export const EtherDepositAmountChanged = createAction(
    'ETHER_DEPOSIT_AMOUNT_CHANGED',
    props<Amount>()
)

export const EtherWithdrawAmountChanged = createAction(
    'ETHER_WITHDRAW_AMOUNT_CHANGED',
    props<Amount>()
)

// Token (Deposit, Withdraw) Amount

export const TokenDepositAmountChanged = createAction(
    'TOKEN_DEPOSIT_AMOUNT_CHANGED',
    props<Amount>()
)

export const TokenWithdrawAmountChanged = createAction(
    'TOKEN_WITHDRAW_AMOUNT_CHANGED',
    props<Amount>()
)

// Order

export const OrderMade = createAction(
    'ORDER_MADE',
    props<Order>()
)

export const OrderFilled = createAction(
    'ORDER_FILLED',
    props<Order>()
)

export const OrderFilling = createAction('ORDER_FILLING')

export const AllOrdersLoaded = createAction(
    'ALL_ORDERS_LOADED',
    props<Orders>()
)

export const FilledOrdersLoaded = createAction(
    'FILLED_ORDERS_LOADED',
    props<FilledOrders>()
)

export const CancelledOrdersLoaded = createAction(
    'CANCELLED_ORDERS_LOADED',
    props<CancelledOrders>()
)

// Buy Order

export const BuyOrderMaking = createAction('BUY_ORDER_MAKING')

export const BuyOrderPriceChanged = createAction(
    'BUY_ORDER_PRICE_CHANGED',
    props<Price>()
)

export const BuyOrderAmountChanged = createAction(
    'BUY_ORDER_AMOUNT_CHANGED',
    props<Price>()
)

// Sell Order

export const SellOrderMaking = createAction('SELL_ORDER_MAKING')

export const SellOrderPriceChanged = createAction(
    'SELL_ORDER_PRICE_CHANGED',
    props<Price>()
)

export const SellOrderAmountChanged = createAction(
    'SELL_ORDER_AMOUNT_CHANGED',
    props<Amount>()
)