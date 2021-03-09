import { Observable } from 'rxjs';

export default class Observer {
    constructor() {}

    public static Observe<T>(obserable: Observable<T>): T {
        let returned: T;
        obserable.subscribe(data => returned = data);

        return returned;
    }
}

export function Observe<T>(observable: Observable<T>): T {
    let returned: T;
    observable.subscribe(data => returned = data)

    return returned;
}