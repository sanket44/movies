import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  userform = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private loginService: LoginService) {
  }
  loader:boolean=false;
  ngOnInit(): void {
  this.loginService.getLoginCred();
  }

  login() {
    if (this.userform && this.userform.valid) {

      this.errorMessage = this.loginService.validate(this.userform);
    } else {
      this.errorMessage = 'Please enter correct user name and password.';
    }
    this.loader=true;
  }

}
