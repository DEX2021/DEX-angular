

export interface AppState {
    appReducer: IAppState
    web3Reducer: IWeb3
    tokenReducer: IToken
    exchangeReducer: IExchange
}

export interface IAppState {
    initialized: boolean
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

export interface ExchangeOrder {
    amount: number
    price: number
    making: boolean
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
    tokenWithdrawAmount: number,
    orderCancelling: boolean,
    orderFilling: boolean,
    orders: IOrders,
    buyOrder: ExchangeOrder,
    sellOrder: ExchangeOrder
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