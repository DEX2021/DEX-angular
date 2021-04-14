import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import Web3 from 'web3';

import { loadToken, loadExchange, loadAccount, loadAllOrders, subscribeToEvents, loadBalances } from 'src/Store/interactions';
import { accountSelector, exchangeSelector, tokenSelector } from 'src/Store/selectors';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/models/models';
import * as Actions from 'src/Store/action'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DexService {
    private loaded: boolean = false;

    private $exchange: Observable<AppState>;
    private $token: Observable<AppState>;
    private $account: Observable<AppState>;

    constructor(private web3: Web3, private store: Store<AppState>, private http: HttpClient) {
        // this.initialize();
    }

    public get AppLoaded() {
        return this.loaded;
    }

    async initialize() {
        console.log("Initializing DEX application");
        const network = await this.web3.eth.net.getNetworkType();
        const networkId = await this.web3.eth.net.getId();

        // Load the token contract
        const token = await loadToken(this.web3, networkId, this.store);
        if (!token) {
            window.alert("A smart contract was not detected on the current network. Please select another network with MetaMask.");
            console.error("Token smart contract was not detected on the current network.", token);
            return;
        }

        // Load the exchange contract
        const exchange = await loadExchange(this.web3, networkId, this.store);
        if (!exchange) {
            window.alert("A smart contract was not detected on the current network. Please select another network with MetaMask.");
            console.error("Token smart contract was not detected on the current network.", exchange);
            return;
        }

        // Load All Orders
        await loadAllOrders(this.store, exchange);

        // Subscribe to all events
        await subscribeToEvents(this.store, exchange);

        // Get pipes from store
        await this.pipeStore();

        // Load Account
        await loadAccount(this.web3, this.store);

        // Load Balances
        await this.LoadBalances();

        this.loaded = true;
        await this.store.dispatch(new Actions.appInitialized(true));
    }

    private async pipeStore() {
        this.$exchange = this.store.pipe(select(exchangeSelector));
        this.$token = this.store.pipe(select(tokenSelector));
        this.$account = this.store.pipe(select(accountSelector));
    }

    public get Exchange(): AppState {
        let exchange: AppState;
        this.$exchange.subscribe(result => exchange = result);

        return exchange;
    }

    public get Token(): AppState {
        let token: AppState;
        this.$token.subscribe(result => token = result);

        return token;
    }

    public get Account(): AppState {
        let account: AppState;
        this.$account.subscribe(result => account = result);

        return account;
    }

    public async LoadBalances() {
        await loadBalances(this.web3, this.Exchange, this.Token, this.Account, this.store);
    }

    public async LoadAccount() {
        await loadAccount(this.web3, this.store);
    }

    public async EthereumPrice(): Promise<number> {
        let promise: Promise<number> = new Promise((resolve, reject) => {
            let request = this.http.get("http://dex.berntsen.solutions/");

            request.subscribe(result => {
                var data = result['data'];
                var eth = data.filter(o => o.symbol == "ETH")[0];
                var quote = eth.quote["USD"];

                resolve(quote.price);
            })
        })

        return promise;
    }
}