import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    public loadingController: LoadingController) { }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 1500,
      message: 'Cargando...',
      translucent: false,
      showBackdrop: true
    });
    return await loading.present();
  }
}
