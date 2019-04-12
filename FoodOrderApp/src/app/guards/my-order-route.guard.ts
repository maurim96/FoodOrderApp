import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderService } from '../services/order.service';

@Injectable({ providedIn: 'root' })

export class RouteMyOrderGuard implements CanActivate {

    constructor(private _orderService: OrderService,
        private _router: Router,
        public _alert: AlertController) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._orderService.hasOrder()) {
            return true;
        } else {
            this.presentAlertConfirm();
            return false;
        }
    }

    async presentAlertConfirm() {
        const alert = await this._alert.create({
            header: 'Atención',
            message: 'Aún no realizaste tu pédido, recordá que tenés tiempo hasta las 11:00hs.',
            buttons: [{
                text: "Aceptar",
                handler: () => { this._router.navigateByUrl('app/tabs/make-order'); }
            }]
        });

        return await alert.present();
    }
}
