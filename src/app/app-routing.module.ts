import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilmlistComponent} from "./filmlist/filmlist.component";
import {FilmDetailsComponent} from "./film-details/film-details.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {FilmEditComponent} from "./film-edit/film-edit.component";
import {LoginGuard} from "./guards/login.guard";
import {UnsavedGuard} from "./guards/unsaved.guard";

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'Login',canActivate:[LoginGuard],component: LoginComponent },
    { path: 'filmList', canActivate:[AuthGuardService],component: FilmlistComponent },
    {path:'filmDetails/:id',canActivate:[AuthGuardService],component:FilmDetailsComponent},
    { path: 'filmEdit/:id',canActivate:[AuthGuardService], canDeactivate:[UnsavedGuard], component: FilmEditComponent},
    {path:'',redirectTo:'Login',pathMatch:'full'},
    {path:'**',redirectTo:'Login',pathMatch:'full'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
