import { UtilitiesService } from './../utilities.service';
import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  idUser: string;

  constructor(
    public utilitiesService: UtilitiesService,
    private _loginService: LoginService,
    private _orderService: OrderService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.utilitiesService.presentLoadingWithOptions();
    this.idUser = this._loginService.getUserId();
    this._orderService.getOrderByClient(this.idUser).subscribe(res => {
      this._orderService.setOrderClient(res);
    })
  }
}
