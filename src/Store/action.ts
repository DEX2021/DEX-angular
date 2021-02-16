import { createAction, props, Action } from '@ngrx/store';


export const WEB3_LOADED = '[Post] web3'
// export function web3Loaded(connection) {
//     return {
//         type: "WEB3_LOADED",
//         connection
//     }
// }

export class web3Loaded implements Action {
    readonly type = WEB3_LOADED

    constructor(public payload: any) { }
}

// export const web3Loaded = createAction(
//     'WEB3_LOADED',
//     props<{ connection: any }>()
// );

//export const web3Loaded2 = createAction('[web3] web3');
export type All = web3Loaded