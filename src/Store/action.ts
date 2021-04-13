import { createAction, props, Action } from '@ngrx/store';


export const WEB3_LOADED = '[Post] web3'
export const ACCOUNT_LOADED = '[Post] accountloaded'
export const TOKEN_LOADED = '[Post] tokenloaded'
export const EXCHANGE_LOADED = '[Post] exchangeloaded'
export const ETHER_BALANCE_LOADED = '[Post] etherebalanceloaded'
export const TOKEN_BALANCE_LOADED = '[Post] tokenbalanceloaded'
export const EXCHANGE_ETHER_BALANCE_LOADED = '[Post] exchangeetherbalanceloaded'
export const EXCHANGE_TOKEN_BALANCE_LOADED = '[Post] exchangetokenbalanceloaded'
export const BALANCES_LOADED = '[Post] balancesloaded'
export const BALANCES_LOADING = '[Post] balancesloading'
export const ETHER_DEPOSIT_AMOUNT_CHANGED = '[Post] etherdepositamountchanged'
export const ETHER_WITHDRAW_AMOUNT_CHANGED = '[Post] etherwithdrawamountchanged'
export const TOKEN_DEPOSIT_AMOUNT_CHANGED = '[Post] tokendepositamountchanged'
export const TOKEN_WITHDRAW_AMOUNT_CHANGED = '[Post] tokenwithdrawamountchanged'
export const CANCELLED_ORDERS_LOADED = '[Post] cancelledOrdersloaded'
export const FILLED_ORDERS_LOADED = '[Post] filledOrdersloaded'
export const ORDERS_LOADED = '[Post] ordersloaded'
export const ORDER_CANCELLING = '[Post] ordercanceling'
export const ORDER_CANCELLED = '[Post] ordercancelled'
export const ORDER_FILLING = '[Post] orderfilling'
export const ORDER_FILLED = '[Post] orderfilled'
export const BUY_ORDER_AMOUNT_CHANGED = '[Post] buyOrderAmountChanged'
export const BUY_ORDER_PRICE_CHANGED = '[Post] buyOrderPriceChanged'
export const BUY_ORDER_MAKING = '[Post] buyOrderMaking'
export const ORDER_MADE = '[Post] orderMade'
export const SELL_ORDER_AMOUNT_CHANGED = '[Post] sellOrderAmountChanged'
export const SELL_ORDER_PRICE_CHANGED = '[Post] sellOrderPriceChanged'
export const SELL_ORDER_MAKING = '[Post] sellOrderMaking'

// export function web3Loaded(connection) {
//     return {
//         type: "WEB3_LOADED",
//         connection
//     }
// }

export class web3Loaded implements Action {
    readonly type = WEB3_LOADED

    constructor(public payload: any) { }
}

export class web3AccountLoaded implements Action {
    readonly type = ACCOUNT_LOADED

    constructor(public payload: any) { }
}

export class web3TokenLoaded implements Action {
    readonly type = TOKEN_LOADED

    constructor(public payload: any) { }
}

export class exchangeLoaded implements Action {
    readonly type = EXCHANGE_LOADED

    constructor(public payload: any) { }
}

export class ordersLoaded implements Action {
    readonly type = ORDERS_LOADED

    constructor(public payload: any) { }
}

export class etherBalanceLoaded implements Action {
    readonly type = ETHER_BALANCE_LOADED

    constructor(public payload: any) { }
}

export class filledOrdersLoaded implements Action {
    readonly type = FILLED_ORDERS_LOADED

    constructor(public payload: any) { }
}

export class cancelledOrdersLoaded implements Action {
    readonly type = CANCELLED_ORDERS_LOADED

    constructor(public payload: any) { }
}

export class tokenBalanceLoaded implements Action {
    readonly type = TOKEN_BALANCE_LOADED

    constructor(public payload: any) { }
}

export class exchangeEtherBalanceLoaded implements Action {
    readonly type = EXCHANGE_ETHER_BALANCE_LOADED

    constructor(public payload: any) { }
}

export class exchangeTokenBalanceLoaded implements Action {
    readonly type = EXCHANGE_TOKEN_BALANCE_LOADED

    constructor(public payload: any) { }
}

export class balancesLoaded implements Action {
    readonly type = BALANCES_LOADED

    //constructor(public payload: any) { }
}

export class balancesLoading implements Action {
    readonly type = BALANCES_LOADING
}

export class etherDepositAmountChanged implements Action {
    readonly type = ETHER_DEPOSIT_AMOUNT_CHANGED

    constructor(public payload: any) { }
}

export class etherWithdrawAmountChanged implements Action {
    readonly type = ETHER_WITHDRAW_AMOUNT_CHANGED

    constructor(public payload: any) { }
}

export class tokenDepositAmountChanged implements Action {
    readonly type = TOKEN_DEPOSIT_AMOUNT_CHANGED

    constructor(public payload: any) { }
}

export class tokenWithdrawAmountChanged implements Action {
    readonly type = TOKEN_WITHDRAW_AMOUNT_CHANGED

    constructor(public payload: any) { }
}

export class buyOrderAmountChanged implements Action {
    readonly type = BUY_ORDER_AMOUNT_CHANGED

    constructor(public payload: any) { }
}

export class buyOrderPriceChanged implements Action {
    readonly type = BUY_ORDER_PRICE_CHANGED

    constructor(public payload: any) { }
}

export class buyOrderMaking implements Action {
    readonly type = BUY_ORDER_MAKING
}

export class orderMade implements Action {
    readonly type = ORDER_MADE

    constructor(public payload: any) { }
}

export class sellOrderAmountChanged implements Action {
    readonly type = SELL_ORDER_AMOUNT_CHANGED

    constructor(public payload: any) { }
}

export class sellOrderPriceChanged implements Action {
    readonly type = SELL_ORDER_PRICE_CHANGED

    constructor(public payload: any) { }
}

export class sellOrderMaking implements Action {
    readonly type = SELL_ORDER_MAKING
}

// Cancel Order
export class orderCancelling implements Action {

    readonly type = ORDER_CANCELLING
}

export class orderCancelled implements Action {

    readonly type = ORDER_CANCELLED

    constructor(public payload: any) { }
}

export class orderFilling implements Action {

    readonly type = ORDER_FILLING
}

export class orderFilled implements Action {

    readonly type = ORDER_FILLED

    constructor(public payload: any) { }
}



// export const web3Loaded = createAction(
//     'WEB3_LOADED',
//     props<{ connection: any }>()
// );

//export const web3Loaded2 = createAction('[web3] web3');
export type All = web3Loaded | web3AccountLoaded |
    web3TokenLoaded | exchangeLoaded | etherBalanceLoaded | tokenBalanceLoaded | exchangeEtherBalanceLoaded |
    exchangeTokenBalanceLoaded | balancesLoaded | balancesLoading | etherDepositAmountChanged |
    etherWithdrawAmountChanged | tokenDepositAmountChanged | tokenWithdrawAmountChanged | cancelledOrdersLoaded | filledOrdersLoaded | ordersLoaded |
    orderCancelling | orderCancelled | orderFilling | orderFilled | buyOrderAmountChanged | buyOrderPriceChanged | buyOrderMaking | orderMade |
    sellOrderAmountChanged | sellOrderPriceChanged | sellOrderMaking