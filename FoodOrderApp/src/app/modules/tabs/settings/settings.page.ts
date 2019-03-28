import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private _loginService: LoginService,
    private _alert: AlertController) { }

  ngOnInit() {
  }
      
  async logout() {
    const alert = await this._alert.create({
      header: 'Atención',
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
