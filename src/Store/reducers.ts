import { createReducer, on, combineReducers } from "@ngrx/store";
// import { web3Loaded } from './action'
import * as PostActions from './action'
import { IWeb3, IToken, IExchange, IOrder, IOrders } from '../models/models'
//import { Action } from '@ngrx/store'

const initial = { connection: "hello" };


export type Action = PostActions.All

const defaultWeb3State: IWeb3 = {
  web3: 'hello',
  account: "null",
}

const defaultTokenState: IToken = {
  token: "nothing"
}
const defaultExchangeState: IExchange = {
  exchange: "nothing"
}
const defaultOrdersState: IOrders = {
  cancelled: null,
  filled: null,
  orders: null
}

const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function web3Reducer(state: IWeb3 = defaultWeb3State, action: Action) {
  // console.log(action.type, state)
  switch (action.type) {
    case PostActions.WEB3_LOADED:
      return { ...state, web3: action.payload }
    case PostActions.ACCOUNT_LOADED:
      return { ...state, account: action.payload }
    default:
      return state;
  }
}

export function tokenReducer(state: IToken = defaultTokenState, action: Action) {
  // console.log(action.type, state)
  switch (action.type) {
    case PostActions.TOKEN_LOADED:
      return { ...state, token: action.payload }
    default:
      return state;
  }
}

export function exchangeReducer(state: IExchange = defaultExchangeState, action: Action) {
  // console.log(action.type, state)
  switch (action.type) {
    case PostActions.EXCHANGE_LAODED:
      return { ...state, exchange: action.payload }
    default:
      return state;
  }
}

export function ordersReducer(state: IOrders = defaultOrdersState, action: Action) {
  switch(action.type) {
    case PostActions.ORDERS_LOADED:
      return {
        ...state,
        cancelled: action.payload.cancelled,
        filled: action.payload.filled,
        orders: action.payload.orders,
      }
    default:
      return state;
  }
}

// const web3 = createReducer(initial,
//   on(web3Loaded, (state, { connection }) => ({ ...state, web3: connection }))
// );

// const web3 = createReducer(initial,
//   on(web3Loaded, (state, action) => {
//     return { ...state, connection: action.connection }
//   })

// )

// const web3 = (state, action) => {
//   switch (action.type) {
//     case "WEB3_LOADED":
//       return { ...state, connection: action.connection }
//   }
// }

const rootReducer = combineReducers({
  web3Reducer,
  tokenReducer,
  exchangeReducer,
  ordersReducer
});


// export function rootReducer(state: any, action: Action){
//   switch(action.type){
//     case 'WEB3_LOADED':
//       return {...state, connection: state.connection}
//   }
// }


export default rootReducer