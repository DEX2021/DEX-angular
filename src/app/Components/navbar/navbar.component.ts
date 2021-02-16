import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, IWeb3 } from 'src/models/models';
import { Observable } from 'rxjs'
import { accountSelector } from 'src/Store/selectors';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  $account: Observable<AppState>

  constructor(private store: Store<AppState>) {
    this.$account = this.store.pipe(select(accountSelector))
  }

  ngOnInit(): void {
  }

}
