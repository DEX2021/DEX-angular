import { IWeb3, IToken, IExchange, IOrders } from "src/models/models";

var web3 = require('web3')

export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000";

export const EVM_REVERT = "VM Exception while processing transaction: revert";

export const fromWei = (n) => {
  return web3.utils.fromWei(n.toString(), "ether");
};

export const toEther = (n) => {
  return web3.utils.toWei(n.toString(), "ether");
};


// Same as ether
export const tokens = (n) => toEther(n);

export const formatBalance = (balance) => {
  const precision = 100; // 2 decimal places

  balance = fromWei(balance);
  balance = Math.round(balance * precision) / precision; // Use 2 decimal places

  return balance;
};

export const formatBalanceToEther = (balance) => {
  const precision = 100; // 2 decimal places

  balance = toEther(balance);
  balance = Math.round(balance * precision) / precision; // Use 2 decimal places

  return balance;
};


export const DECIMALS = (10 ** 18);

export const RED = 'danger';
export const GREEN = 'success';

export const ether = (wei) => {
  if (wei) {
    return (wei / DECIMALS);
  }
}

export const tokens2 = ether;



// initial state for reducers
export const defaultWeb3State: IWeb3 = {
  web3Reducer: 'hello',
  account: "null",
  balance: 0
}

export const defaultTokenState: IToken = {
  token: "nothing",
  balance: 0,
  loaded: false
}
export const defaultExchangeState: IExchange = {
  exchange: "nothing",
  etherBalance: 0,
  tokenBalance: 0,
  loaded: false,
  balancesLoading: true,
  etherDepositAmountChanged: 0,
  etherWithdrawAmountChanged: 0,
  tokenDepositAmount: 0,
  tokenWithdrawAmount: 0,
  orderCancelling: false,
  orderFilling: false,
  orders: {
    cancelled: {
      loaded: false, data: []
    },
    filled: {
      loaded: false, data: []
    },
    orders: {
      loaded: false, data: []
    }
  },
  buyOrder: {
    amount: 0,
    price: 0
  },
  sellOrder: {
    amount: 0,
    price: 0
  }
}

export const defaultOrdersState: IOrders = {
  cancelled: {
    loaded: false,
    data: []
  },
  filled: {
    loaded: false,
    data: []
  },
  orders: {
    loaded: false,
    data: []
  }
}