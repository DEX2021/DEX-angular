import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as selectors from '../../ngrx/feature.selector';
import { increment, decrement, reset } from '../../ngrx/counter/counter.actions';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.scss']
})
export class NgrxComponent implements OnInit {
  count$: Observable<number>;
  count2$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  ngOnInit(): void {
    //this.count2$ = this.store.select(selectors.getCount);
    console.log(this.count$);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
  
  reset() {
    this.store.dispatch(reset());
  }
}
