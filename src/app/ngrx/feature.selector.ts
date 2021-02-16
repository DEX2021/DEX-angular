import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface FeatureState {
    counter: number;
}

export interface AppState {
    feature: FeatureState;
}

export const selectFeature = (state: AppState) => state.feature;
export const getCountValue = (counter2: number) => counter2

export const getCount = createSelector(
    getCountValue,
    (counter2, props) => counter2 * props.multiply
);