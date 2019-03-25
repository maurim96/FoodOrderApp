import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
      private _loginService: LoginService,
      private _fb: FormBuilder) { }

  loginForm: FormGroup;
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  ngOnInit() {
    this.loginForm = this.createModel();  
    this.username.patchValue('mmino');
    this.password.patchValue('mmino');
  }

  createModel() {
    return this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {    
    const loginData = {
      username: this.username.value,
      password: this.password.value
    };
    this._loginService.login(loginData).subscribe(res => {      
      this._loginService.logUser(res);
    }, err => {
      console.error(err)
    })
  }
}
