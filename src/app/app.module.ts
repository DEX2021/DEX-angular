import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgrxComponent } from './pages/ngrx/ngrx.component';
import { HomeComponent } from './pages/home/home.component';

import { StoreModule } from '@ngrx/store'; // NgRx Store
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // NgRx Store Developer Tools
import RootReducer from '../Store/reducers'; // TODO: Remove the test reducer
import { getCount, getCountValue } from './ngrx/feature.selector'; // TODO: Remove the test selector

import Web3, { Modules } from 'web3';

@NgModule({
  declarations: [
    AppComponent,
    NgrxComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppRoutingModule,
    StoreModule.forRoot({ root: RootReducer }),
    // StoreModule.forFeature('counter', counterReducer), // TODO: Remove the test selector
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains the last states (25 in this case for example)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
