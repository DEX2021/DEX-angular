

export interface AppState {
    web3: IWeb3
    token: IToken,
    exchange: IExchange
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