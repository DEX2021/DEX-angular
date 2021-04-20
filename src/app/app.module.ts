import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store'; // NgRx Store
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // NgRx Store Developer Tools
import rootReducer from '../Store/reducers'; // TODO: Remove the test reducer
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze'
import { IWeb3 } from 'src/models/models';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NumericDirective } from './Directives/numeric.directive';
import { Web3Module } from './Modules/web3.module';
import { XrpHomeComponent } from './Pages/xrp-home/xrp-home.component';

export const metaReducers: MetaReducer<IWeb3>[] = !environment.production ? [storeFreeze] : [];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // Directives
    NumericDirective,
    XrpHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ root: rootReducer }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    // StoreModule.forFeature('counter', counterReducer), // TODO: Remove the test selector
    StoreDevtoolsModule.instrument({
      maxAge: 10, // Retains the last states (25 in this case for example)
    }),
    Web3Module,
  ],
  exports: [
    Web3Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
