import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/models'
import Web3 from 'web3';
import { DexService } from './Services/DexService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private web3: Web3, private store: Store<AppState>, private dex: DexService) {
  }

  async ngOnInit() {
    this.dex.initialize();
  }
}
