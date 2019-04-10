import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './../constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _nativeStorage: NativeStorage) { }

  private user: any;

  login(loginData): Observable<any> {
    return this._httpClient.post(Constants.apiRoot + 'user/login', loginData, httpOptions);
  }

  logout() {
    this.user = null;
    this._nativeStorage.remove('user')
      .then(
        () => {
          console.log('User logged out')          
        },
        error => console.error('Error storing item', error)
      );
    this._router.navigateByUrl('login');
  }

  logUser(user: any) {
    this.user = user;

    this._nativeStorage.setItem('user', { value: this.user })
      .then(
        () => {
          console.log('Stored item!');          
        },
        error => console.error('Error storing item', error)
      );

    this._router.navigateByUrl('app/tabs/home')
  }

  getUserId() {
    return this.user._id;
  }

  isLoggedIn() {
    if (this.user != null) {
      return true;
    }
    return false;
  }

  checkLocalStorage() {
    this._nativeStorage.getItem('user')
      .then(
        data => {
          if (data) {
            this.user = data;
            this._router.navigateByUrl('app/tabs/home')
          }
        },
        error => {
          console.error(error)
        }
      );
  }

}
