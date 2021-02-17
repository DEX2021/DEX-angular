

export interface AppState {
    web3Reducer: IWeb3
    tokenReducer: IToken,
    exchangeReducer: IExchange,
    ordersReducer: IOrders,
}

export interface IWeb3 {
    web3Reducer: any
    account: any
}
export interface IToken {
    tokenReducer: any
}

export interface IExchange {
    exchange: any
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