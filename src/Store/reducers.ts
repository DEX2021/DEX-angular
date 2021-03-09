import { combineReducers } from "@ngrx/store";
import * as PostActions from './action'
import { IWeb3, IToken, IExchange } from '../models/models'
import { defaultWeb3State, defaultTokenState, defaultExchangeState, defaultOrdersState } from "./helpers";

export type Action = PostActions.All


const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function web3Reducer(state: IWeb3 = defaultWeb3State, action: Action) {
  switch (action.type) {
    case PostActions.WEB3_LOADED:
      //return { ...state, web3: action.payload }
      return newState(state, { web3: action.payload })

    case PostActions.ACCOUNT_LOADED:
      return { ...state, account: action.payload }

    case PostActions.ETHER_BALANCE_LOADED:
      return { ...state, balance: action.payload }

    default:
      return state;
  }
}

export function tokenReducer(state: IToken = defaultTokenState, action: Action) {
  switch (action.type) {
    case PostActions.TOKEN_LOADED:
      return { ...state, loaded: true, token: action.payload }

    case PostActions.TOKEN_BALANCE_LOADED:
      return { ...state, balance: action.payload }
    default:
      return state;
  }
}

export function exchangeReducer(state: IExchange = defaultExchangeState, action: Action) {
  let index, data
  switch (action.type) {
    case PostActions.EXCHANGE_LAODED:
      return { ...state, loaded: true, exchange: action.payload }

    case PostActions.EXCHANGE_ETHER_BALANCE_LOADED:
      return { ...state, etherBalance: action.payload }

    case PostActions.EXCHANGE_TOKEN_BALANCE_LOADED:
      return { ...state, tokenBalance: action.payload }

    case PostActions.BALANCES_LOADING:
      return { ...state, balancesloading: true }

    case PostActions.BALANCES_LOADED:
      return { ...state, balancesloading: false }

    case PostActions.ETHER_DEPOSIT_AMOUNT_CHANGED:
      return { ...state, etherDepositAmountChanged: action.payload }

    case PostActions.ETHER_WITHDRAW_AMOUNT_CHANGED:
      return { ...state, etherWithdrawAmountChanged: action.payload }

    case PostActions.TOKEN_DEPOSIT_AMOUNT_CHANGED:
      return { ...state, tokenDepositAmount: action.payload }

    case PostActions.TOKEN_WITHDRAW_AMOUNT_CHANGED:
      return { ...state, tokenWithdrawAmount: action.payload }

    case PostActions.ORDERS_LOADED:
      return {
        ...state,
        orders: {
          ...state.orders,
          orders: {
            ...state.orders.orders,
            loaded: true,
            data: [
              ...action.payload
            ]
          }
        }
      }

    case PostActions.FILLED_ORDERS_LOADED:
      return {
        ...state,
        orders: {
          ...state.orders,
          filled: {
            ...state.orders.filled,
            loaded: true,
            data: [
              ...action.payload
            ]
          }
        }
      }

    case PostActions.CANCELLED_ORDERS_LOADED:
      return {
        ...state,
        orders: {
          ...state.orders,
          cancelled: {
            ...state.orders.cancelled,
            loaded: true,
            data: [
              ...action.payload
            ]
          }
        }
      }

    case PostActions.ORDER_CANCELLING:
      return { ...state, orderCancelling: true }

    case PostActions.ORDER_CANCELLED:
      return {
        ...state, orderCancelling: false,
        orders: {
          ...state.orders,
          cancelled: {
            ...state.orders.cancelled,
            data: [...state.orders.cancelled.data, action.payload]
          }
        }
      }

    case PostActions.ORDER_FILLING:
      return { ...state, orderFilling: true }

    case PostActions.ORDER_FILLED:

      index = state.orders.filled.data.findIndex(order => order.id === action.payload.id)
      if (index === -1) {
        data = [...state.orders.filled.data, action.payload]
      } else {
        data = state.orders.filled.data
      }

      return {
        ...state, orderFilling: false, orders: {
          ...state.orders, filled: {
            ...state.orders.filled, data
          }
        }
      }

    case PostActions.BUY_ORDER_AMOUNT_CHANGED:
      return {
        ...state,
        buyOrder: {
          ...state.buyOrder,
          amount: action.payload
        }
      }

    case PostActions.BUY_ORDER_PRICE_CHANGED:
      return {
        ...state,
        buyOrder: {
          ...state.buyOrder,
          price: action.payload
        }
      }

    case PostActions.BUY_ORDER_MAKING:
      return {
        ...state,
        buyOrder: {
          ...state.buyOrder,
          amount: null,
          price: null,
          making: true
        }
      }

    case PostActions.ORDER_MADE:
      // Prevent duplicate orders
      index = state.orders.orders.data.findIndex(
        order => order.id === action.payload.id
      )

      if (index === -1) {
        data = [...state.orders.orders.data, action.payload]
      } else {
        data = state.orders.orders.data
      }

      return {
        ...state,
        orders: {
          ...state.orders,
          data
        },
        buyOrder: {
          ...state.buyOrder,
          making: false
        },
        sellOrder: {
          ...state.sellOrder,
          making: false
        }
      }

    case PostActions.SELL_ORDER_AMOUNT_CHANGED:
      return {
        ...state,
        sellOrder: {
          ...state.sellOrder,
          amount: action.payload
        }
      }

    case PostActions.SELL_ORDER_PRICE_CHANGED:
      return {
        ...state,
        sellOrder: {
          ...state.sellOrder,
          price: action.payload
        }
      }

    case PostActions.SELL_ORDER_MAKING:
      return {
        ...state,
        sellOrder: {
          ...state.sellOrder,
          amount: null,
          price: null,
          making: true
        }
      }

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  web3Reducer,
  tokenReducer,
  exchangeReducer
});

export default rootReducer