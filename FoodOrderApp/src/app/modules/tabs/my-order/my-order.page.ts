import { Component } from '@angular/core';
import { UtilitiesService } from '../../../utilities.service';
import { OrderService } from '../../../services/order.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-my-order',
  templateUrl: 'my-order.page.html',
  styleUrls: ['my-order.page.scss']
})
export class MyOrderPage {
  order: any;

  constructor(
    private utilitiesService: UtilitiesService,
    private _orderService: OrderService,
    public alertController: AlertController,
    public _router: Router,
    private _loginService: LoginService) { }

  ngOnInit() {
    // this.utilitiesService.presentLoadingWithOptions();
    this._orderService.order$.subscribe(res => {
      if (res.msg) {
        // this.presentAlertConfirm('Recordá que tenés tiempo hasta las 11:00hs');
      }
      else {
        this.order = res;
      }
    })
  }

  logout() {
    this._loginService.logout();    
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Aún no realizaste tu pedido',
      message: msg,
      buttons: [
        {
          text: 'Realizar Pedido !',
          handler: () => {
            this._router.navigateByUrl('app/tabs/make-order');
          }
        }
      ]
    });

    await alert.present();
  }
}
