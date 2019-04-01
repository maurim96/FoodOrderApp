import { IonSlides } from '@ionic/angular';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-make-order',
  templateUrl: 'make-order.page.html',
  styleUrls: ['make-order.page.scss']
})
export class MakeOrderPage {

  @ViewChild('slides') slides: IonSlides;
  constructor(
    private _loginService: LoginService
  ) { }
  currentStep: number = 1;
  selectedMenu: any;
  order: any;  
  dateToday: Date = new Date();
  finalForm: any;

  ngOnInit() { }

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

  additionalInfo(data) {
    const order = {
      ...this.order,
      ...data,
      user: this._loginService.getUserId(),
      date: this.dateToday
    }
    console.log(order)
  }

}
