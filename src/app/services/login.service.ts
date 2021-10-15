import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../login/user";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: IUser[] = [];
  isLoggedin: boolean = false;
  role: number = 0;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {
  }
  userurl="https://moviesdb1.herokuapp.com/users";
  // userurl="http://localhost:3000/users";

  getLoginCred(){
    // return this.http.get<IUser[]>(this.userurl)
    this.http.get<IUser[]>(this.userurl).subscribe({
      next:users=>this.users=users
    })
  }


  validate(user: FormGroup): string {
   // this.getLoginCred().subscribe({
   //   next:users=>this.users=users,
   // })
    this.users.map(usr => {
      if (usr.username === user.value.username && usr.password === user.value.password) {
        this.isLoggedin = true;
        this.role = usr.roles.length;
        this.router.navigate(['/filmList']);
      } else {
        this.errorMessage = 'Please enter correct user name and password.';
      }
    })
    return this.errorMessage;
  }

  logout(): void {
    this.isLoggedin = false;
  }

}

