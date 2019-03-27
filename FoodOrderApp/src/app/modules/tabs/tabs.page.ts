import { AlertController } from '@ionic/angular';
import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private _loginService: LoginService,
    private _alert: AlertController
  ) { }
  
  async logout() {
    const alert = await this._alert.create({
      header: 'Atención',
      mode: 'ios',
      message: '¿Está seguro que desea desloguearse?',
      buttons: [{
        text: "Confirmar",
        handler: () => { this._loginService.logout(); }
      }, {
        text: "Cancelar",
        role: 'cancel'
      }]
    });
    return await alert.present();
  }

}
