import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
      private _router : Router, 
      private _loginService: LoginService) { }

  ngOnInit() {
  }

  login(form) {    
    const loginData = {
      username: form.controls.usuario.value,
      password: form.controls.password.value
    };
    this._loginService.login(loginData).subscribe(res => {      
      this._loginService.logUser(res);
      this._router.navigateByUrl('app/tabs/home')
    }, err => {
      console.log(err)
    })
  }
}
