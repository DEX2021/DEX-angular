import { createReducer, on, combineReducers } from "@ngrx/store";
// import { web3Loaded } from './action'
import * as PostActions from './action'
import { IWeb3, IToken, IExchange } from '../models/models'
//import { Action } from '@ngrx/store'

const initial = { connection: "hello" };


export type Action = PostActions.All

const defaultWeb3State: IWeb3 = {
  web3Reducer: 'hello',
  account: "null",
  balance: 0
}

const defaultTokenState: IToken = {
  token: "nothing",
  balance: 0,
  loaded: false
}
const defaultExchangeState: IExchange = {
  exchange: "nothing",
  etherBalance: 0,
  tokenBalance: 0,
  loaded: false,
  balancesLoading: true,
  etherDepositAmountChanged: 0,
  etherWithdrawAmountChanged: 0,
  tokenDepositAmount: 0,
  tokenWithdrawAmount: 0

}

const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function web3Reducer(state: IWeb3 = defaultWeb3State, action: Action) {
  console.log(action.type, state)
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
  console.log(action.type, state)
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
  console.log(action.type, state)
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
  exchangeReducer
});


// export function rootReducer(state: any, action: Action){
//   switch(action.type){
//     case 'WEB3_LOADED':
//       return {...state, connection: state.connection}
//   }
// }


export default rootReducer