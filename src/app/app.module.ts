import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgrxComponent } from './pages/ngrx/ngrx.component';
import { HomeComponent } from './pages/home/home.component';

import { StoreModule } from '@ngrx/store'; // NgRx Store
import { counterReducer } from './ngrx/counter.reducer'; // TODO: Remove the test reducer

@NgModule({
  declarations: [
    AppComponent,
    NgrxComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ count: counterReducer }) //TODO: Remove the test reducer
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
