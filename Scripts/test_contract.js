const Web3 = require('web3')
const Token = require("../src/abis/Token.json")
const Exchange = require("../src/abis/Exchange.json")

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
let networkId = null;
let token = null;
let account = null;
let exchange = null;

async function main() {
    console.log("Loading network id");
    networkId = await web3.eth.net.getId();
    console.log("Loading token");
    token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    console.log("Loading exhcnage")
    exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
    console.log("Load account")
    const accounts = await web3.eth.getAccounts()
    account = await accounts[0]
    console.log("Loading cancelled orders")
    let cancelStream = await exchange.getPastEvents('Cancel', {
        fromBlock: 0,
        toBlock: 'latest'
    })
    let cancelled = cancelStream.map(e => e.returnValues)
    console.log("Loading fill orders")
    let tradeStream = await exchange.getPastEvents('Trade', {
        fromBlock: 0,
        toBlock: 'latest'
    })
    let filled = tradeStream.map(e => e.returnValues)


    // console.log("Network Id:", networkId)
    // console.log("Token", token)
    // console.log("Exchange", exchange)
    console.log("Account", account)
    // console.log("Cancelled orders", cancelled)
    // console.log("Filled orders", filled)
}

main();