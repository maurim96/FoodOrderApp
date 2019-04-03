import { Router } from '@angular/router';
import { IonSlides, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-make-order',
  templateUrl: 'make-order.page.html',
  styleUrls: ['make-order.page.scss']
})
export class MakeOrderPage {

  @ViewChild('slides') slides: IonSlides;
  constructor(
    private _loginService: LoginService,
    private _orderService: OrderService,
    private _alert: AlertController,
    private _router: Router
  ) { }
  currentStep: number = 1;
  selectedMenu: any;
  order: any;
  finalOrder: any;
  dateToday: Date = new Date();
  finalForm: any;

  ngOnInit() {
  }

  checkStep(step) {
    if (this.currentStep === step) return true;
    else return false
  }

  prev() {
    this.currentStep--;
    if (this.currentStep === 1) {
      this.cleanSelection();
    }
  }

  next() {
    this.currentStep++;
  }

  cleanSelection() {
    this.selectedMenu = null;
  }

  selectMenu(menu) {
    this.selectedMenu = menu;
    this.currentStep++;
  }

  orderData(data) {
    this.order = data;
    this.currentStep++;
  }

  async additionalInfo(data) {
    this.finalOrder = {
      ...this.order,
      ...data,
      user: this._loginService.getUserId(),
      date: this.dateToday.setHours(0, 0, 0, 0)
    };
    const alert = await this._alert.create({
      header: 'Atención',
      message: '¿Está seguro que desea realizar la orden?',
      buttons: [{
        text: "Confirmar",
        handler: () => { this.createOrder(); }
      }, {
        text: "Cancelar",
        role: 'cancel'
      }]
    });
    return await alert.present();
  }

  createOrder() {
    if (this._orderService.hasOrder()) {
      this._orderService.updateOrder(this.finalOrder).subscribe(res => {        
        this._orderService.getOrderByClient(res.user).subscribe(x => {
          this._orderService.setOrderClient(x);
          this.cleanSelection();
          this.currentStep = 1;
          this._router.navigateByUrl('app/tabs/my-order');
        })
      })
    } else {
      this._orderService.createOrder(this.finalOrder).subscribe(res => {
        this._orderService.getOrderByClient(res.user).subscribe(x => {
          this._orderService.setOrderClient(x);
          this.cleanSelection();
          this.currentStep = 1;
          this._router.navigateByUrl('app/tabs/my-order');
        })
      })
    }
  }

}
