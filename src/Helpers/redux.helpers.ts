import { select } from "@ngrx/store";

export function fetchReduxData(store, reduxSelector) {
    let result;
    var reduxObject = store.pipe(select(reduxSelector))
    reduxObject.subscribe(data => result = data)

    return result;
}
