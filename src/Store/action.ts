import { createAction, props, Action } from '@ngrx/store';


export const WEB3_LOADED = '[Post] web3'
export const ACCOUNT_LOADED = '[Post] accountloaded'
export const TOKEN_LOADED = '[Post] tokenloaded'
export const EXCHANGE_LAODED = '[Post] exchangeloaded'
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
    readonly type = EXCHANGE_LAODED

    constructor(public payload: any) { }
}

export class etherBalanceLoaded implements Action {
    readonly type = ETHER_BALANCE_LOADED

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


// export const web3Loaded = createAction(
//     'WEB3_LOADED',
//     props<{ connection: any }>()
// );

//export const web3Loaded2 = createAction('[web3] web3');
export type All = web3Loaded | web3AccountLoaded |
    web3TokenLoaded | exchangeLoaded | etherBalanceLoaded | tokenBalanceLoaded | exchangeEtherBalanceLoaded |
    exchangeTokenBalanceLoaded | balancesLoaded | balancesLoading | etherDepositAmountChanged |
    etherWithdrawAmountChanged | tokenDepositAmountChanged | tokenWithdrawAmountChanged