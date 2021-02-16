

export interface AppState {
    web3Reducer: IWeb3
    tokenReducer: IToken,
    exchangeReducer: IExchange
}

export interface IWeb3 {
    web3Reducer: any
    account: any
}
export interface IToken {
    tokenReducer: any
}

export interface IExchange {
    exchangeReducer: any
}