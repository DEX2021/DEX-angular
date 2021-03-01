

export interface AppState {
    web3Reducer: IWeb3
    tokenReducer: IToken,
    exchangeReducer: IExchange,
    ordersReducer: IOrders,
}

export interface IWeb3 {
    web3Reducer: any
    account: any
    balance: any
}
export interface IToken {
    token: any
    balance: any
    loaded: boolean
}

export interface IExchange {
    exchange: any
    etherBalance: any
    tokenBalance: any
    loaded: boolean
    balancesLoading: boolean,
    etherDepositAmountChanged: number,
    etherWithdrawAmountChanged: number,
    tokenDepositAmount: number,
    tokenWithdrawAmount: number
}

export interface IOrder {
    loaded: boolean
    data: any[]
}

export interface IOrders {
    cancelled: IOrder;
    filled: IOrder;
    orders: IOrder;
}