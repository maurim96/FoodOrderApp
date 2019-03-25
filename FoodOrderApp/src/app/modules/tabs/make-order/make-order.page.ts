import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-make-order',
  templateUrl: 'make-order.page.html',
  styleUrls: ['make-order.page.scss']
})
export class MakeOrderPage {

  constructor(
    private _orderService: OrderService,
    private _loginService: LoginService
  ) { }

  menus: any[];

  ngOnInit() {
    this._orderService.getAllMenus().subscribe(res => {
      this.menus = res;
    })
  }

  logout() {
    this._loginService.logout();    
  }
}
