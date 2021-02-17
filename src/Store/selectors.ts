import { get } from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, IWeb3 } from '../models/models'


export const root = createFeatureSelector<AppState>('root')

export const accountSelector = createSelector(
    root,
    (state: AppState) => state.web3Reducer.account
);

export const exchangeSelector = createSelector(
    root,
    (state: AppState) => state.exchangeReducer.exchange
)
