import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initial = 0;

const _reducer = createReducer(
    initial,
    on(increment, (state) => {
        return state += 1;
    }),
    on(decrement, (state) => {
        return state -= 1;
    }),
    on(reset, (state) => {
        return state = 0;
    })
);

export function counterReducer(state, action) {
    return _reducer(state, action);
}