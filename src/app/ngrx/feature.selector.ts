import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface FeatureState {
    counter: number;
}

export interface AppState {
    feature: FeatureState;
}

export const selectFeature = (state: AppState) => state.feature;
export const getCountValue = (counter: number) => counter

export const getCount = createSelector(
    getCountValue,
    (counter, props) => counter * props.multiply
);