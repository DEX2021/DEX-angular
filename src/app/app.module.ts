import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgrxComponent } from './pages/ngrx/ngrx.component';
import { HomeComponent } from './pages/home/home.component';

import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store'; // NgRx Store
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // NgRx Store Developer Tools
import { postReducer } from '../Store/reducers'; // TODO: Remove the test reducer
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze'
import { IWeb3 } from 'src/models/web3';

export const metaReducers: MetaReducer<IWeb3>[] = !environment.production ? [storeFreeze] : [];
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
    StoreModule.forRoot({ root: postReducer }),
    // StoreModule.forFeature('counter', counterReducer), // TODO: Remove the test selector
    StoreDevtoolsModule.instrument({
      maxAge: 100, // Retains the last states (25 in this case for example)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
