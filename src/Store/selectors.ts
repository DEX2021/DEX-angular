import { get } from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, IWeb3 } from '../models/models'
import { formatBalance } from './helpers'


// const account = createFeatureSelector<AppState>('root')

// export const accountSelector = createSelector(
//     account,
//     (state: AppState) => state.web3Reducer.account
// );

const account = state => get(state, 'root')
export const accountSelector = createSelector(
    account,
    (state: AppState) => state.web3Reducer.account
);

const tokenLoaded = state => get(state, 'root', false)
export const tokenLoadedSelector = createSelector(
    tokenLoaded,
    (state: AppState) => state.tokenReducer.loaded
)

const token = state => get(state, 'root', false)
export const tokenSelector = createSelector(
    token,
    (state: AppState) => state.tokenReducer.token
)

const exchangeLoaded = state => get(state, 'root', false)
export const exchangeLoadedSelector = createSelector(
    exchangeLoaded,
    (state: AppState) => state.exchangeReducer.loaded
)

const exchange = state => get(state, 'root', false)
export const exchangeSelector = createSelector(
    exchange,
    (state: AppState) => state.exchangeReducer.exchange
)

export const contractsLoadedSelector = createSelector(
    tokenLoaded,
    exchangeLoaded,
    (tl, el) => (tl && el)
)



const balancesLoading = state => get(state, 'root', true)
export const balancesLoadingSelector = createSelector(
    balancesLoading,
    (state: AppState) => state.exchangeReducer.balancesLoading
)

const etherBalance = state => get(state, 'root', 0)
export const etherBalanceSelector = createSelector(
    etherBalance,
    (state: AppState) => state.web3Reducer.balance,
    (balance) => {
        return formatBalance(balance)
    }
)

const tokenBalance = state => get(state, 'root', 0)
export const tokenBalanceSelector = createSelector(
    tokenBalance,
    (state: AppState) => formatBalance(state.tokenReducer.balance)
    // (balance) => {
    //     return balance
    // }
)

const exchangeEtherBalance = state => get(state, 'root', 0)
export const exchangeEtherBalanceSelector = createSelector(
    exchangeEtherBalance,
    (state: AppState) => state.exchangeReducer.etherBalance,
    // (balance) => {
    //     return formatBalance(balance)
    // }
)

const exchangeTokenBalance = state => get(state, 'root', 0)
export const exchangeTokenBalanceSelector = createSelector(
    exchangeTokenBalance,
    (state: AppState) => state.exchangeReducer.tokenBalance,
    // (balance) => {
    //     return formatBalance(balance)
    // }
)
