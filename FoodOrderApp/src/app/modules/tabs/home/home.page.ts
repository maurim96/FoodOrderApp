import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  idUser: string;

  constructor(    
    private _loginService: LoginService,
    private _orderService: OrderService) { }

  ngOnInit() {
    this.idUser = this._loginService.getUserId();
    this._orderService.getOrderByClient(this.idUser).subscribe(res => {
      this._orderService.setOrderClient(res);
    })
  }

  ionViewDidEnter() {
    document.addEventListener("backbutton", function (e) {
      console.log("disable back button")
    }, false);
  }

}
