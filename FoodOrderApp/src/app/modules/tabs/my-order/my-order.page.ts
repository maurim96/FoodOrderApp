import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: 'my-order.page.html',
  styleUrls: ['my-order.page.scss']
})
export class MyOrderPage {
  order: any;

  constructor(
    private _orderService: OrderService) { }

  ngOnInit() {
    this._orderService.order$.subscribe(res => {
      this.order = res;      
    })
  }

}
