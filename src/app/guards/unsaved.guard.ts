import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {FilmEditComponent} from "../film-edit/film-edit.component";
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard implements CanDeactivate<unknown> {
  constructor() {
  }

  canDeactivate(
    component: FilmEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(component.isdirty){
      if (component.editform.dirty) {
        return Swal.fire({
          title: 'Are you sure?',
          text: "Your data wont be save Do you Want to Continue!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.value) {
            return true;
          } else {
            return false;
          }
        })
      }
    }
      return true;
  }

}
