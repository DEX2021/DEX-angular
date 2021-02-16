// this file handles all the blockchain interactions
import Web3 from "web3"
import * as Postactions from './action'

export const loadWeb3 = (store) => {
    console.log("this is the store", store)
    const web3 = new Web3(Web3.givenProvider || 'http:/localhost:7545')
    //store.dispatch(new Postactions.web3Loaded({ connection: "fukcing", another: "pb" }));
    return web3;
}