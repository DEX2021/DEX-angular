import { createAction, props } from '@ngrx/store';

// export function web3Loaded(connection) {
//     return {
//         type: "WEB3_LOADED",
//         connection
//     }
// }

export const web3Loaded = createAction(
    'WEB3_LOADED',
    props<{ connection: any }>()
);

//export const web3Loaded2 = createAction('[web3] web3');
