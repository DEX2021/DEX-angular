import { get } from 'lodash'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, IWeb3 } from '../models/models'


export const account = createFeatureSelector<AppState>('web3.account')

export const accountSelector = createSelector(
    account,
    (state: AppState) => state.web3
);