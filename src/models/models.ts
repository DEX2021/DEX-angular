

export interface AppState {
    web3Reducer: IWeb3
    tokenReducer: IToken,
    exchangeReducer: IExchange,
}

export interface IWeb3 {
    web3: any
    account: any
}
export interface IToken {
    token: any
}

export interface IExchange {
    exchange: any
}