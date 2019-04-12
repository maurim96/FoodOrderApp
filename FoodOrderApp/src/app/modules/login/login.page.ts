import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private _loginService: LoginService,
    private _fb: FormBuilder,
    private faio: FingerprintAIO) { }

  loginForm: FormGroup;
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  // ionViewWillEnter() {
  //   this._loginService.checkLocalStorage();
  // }

  ngOnInit() {
    this.loginForm = this.createModel();
  }

  loginFingerpint() {
    this.faio.isAvailable()
      .then(() => {
        this.faio.show({
          clientId: 'OrderFood',
          clientSecret: 'password', //Only necessary for Android        
          disableBackup: true,
        })
          .then((result: any) => {
            this.login();
          })
          .catch((error: any) => console.log(error));
      }, () => {
        this.login();
      });
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
