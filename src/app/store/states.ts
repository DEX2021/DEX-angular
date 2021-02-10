
export interface Web3Connection {
    connection: any;
}

export interface Web3Account {
    account: any;
}

export interface Contract {
    contract: any;
}

export interface Order {
    order: any;
}

export interface Orders {
    orders: Order[];
}

export interface CancelledOrders {
    cancelledOrders: Order[]
}

export interface FilledOrders {
    filledOrders: Order[]
}

export interface Balance {
    balance: any;
}

export interface Amount {
    amount: any;
}

export interface Price {
    price: any;
}