import { createAction, props, Action } from '@ngrx/store';


export const WEB3_LOADED = '[Post] web3'
export const ACCOUNT_LOADED = '[Post] accountloaded'
export const TOKEN_LOADED = '[Post] tokenloaded'
export const EXCHANGE_LAODED = '[Post] exchangeloaded'
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


// export const web3Loaded = createAction(
//     'WEB3_LOADED',
//     props<{ connection: any }>()
// );

//export const web3Loaded2 = createAction('[web3] web3');
export type All = web3Loaded | web3AccountLoaded | web3TokenLoaded | exchangeLoaded