// this file handles all the blockchain interactions

import { Store } from "@ngrx/store";
import Web3 from "web3"
import { web3Loaded } from "./action"


export const loadWeb3 = (store) => {
    const web3 = new Web3(Web3.givenProvider || 'http:/localhost:7545')
    store.dispatch(web3Loaded({ connection: web3 }));
    return web3;
}


