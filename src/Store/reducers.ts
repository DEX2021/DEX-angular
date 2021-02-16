import { createReducer, on, combineReducers } from "@ngrx/store";
// import { web3Loaded } from './action'
import * as PostActions from './action'
import { IWeb3 } from '../models/web3'
//import { Action } from '@ngrx/store'

const initial = { connection: "hello" };


export type Action = PostActions.All

const defaultState: IWeb3 = {
  web3: 'hello'
}

const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function postReducer(state: IWeb3 = defaultState, action: Action) {
  console.log(action.type, state)
  switch (action.type) {
    case PostActions.WEB3_LOADED:
      return { ...state, web3: action.payload }
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

// const rootReducer = combineReducers({
//   web3,
// });


// export function rootReducer(state: any, action: Action){
//   switch(action.type){
//     case 'WEB3_LOADED':
//       return {...state, connection: state.connection}
//   }
// }


// export default rootReducer