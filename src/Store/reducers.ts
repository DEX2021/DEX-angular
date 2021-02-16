import { createReducer, on, combineReducers } from "@ngrx/store";
import { web3Loaded } from './action'

const initial = { connection: "hello" };

const web3 = createReducer(initial,
  on(web3Loaded, (state, { connection }) => ({ ...state, connection }))
);

// const web3s = (state, action) => {
//   switch (action.type) {
//     case "WEB3_LOADED":
//       return { ...state, connection: action.connection }
//   }
// }

const rootReducer = combineReducers({
  web3,
});




export default rootReducer;