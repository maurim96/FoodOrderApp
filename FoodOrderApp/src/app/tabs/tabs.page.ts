import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  constructor(      
      private _loginService: LoginService
  ) {}

  logout() {
    this._loginService.logout();    
  }
}
