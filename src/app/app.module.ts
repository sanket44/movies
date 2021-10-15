import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FilmlistComponent} from './filmlist/filmlist.component';
import {FilmDetailsComponent} from './film-details/film-details.component';
import {HttpClientModule} from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuardService} from "./guards/auth-guard.service";
import {StarRatingComponent} from './star-rating/star-rating.component';
import {FilmEditComponent} from './film-edit/film-edit.component';
import {LoginGuard} from "./guards/login.guard";
import {UnsavedGuard} from "./guards/unsaved.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilmlistComponent,
    FilmDetailsComponent,
    StarRatingComponent,
    FilmEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthGuardService, LoginGuard,UnsavedGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
