import {Component} from '@angular/core';
import {LoginService} from "./services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movies';

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  logOut(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/Login');
  }

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedin;
  }

  get getRole(): number {
    return this.loginService.role;
  }


}
