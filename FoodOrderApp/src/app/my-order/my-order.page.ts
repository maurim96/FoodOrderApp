import { Component } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: 'my-order.page.html',
  styleUrls: ['my-order.page.scss']
})
export class MyOrderPage {
  ordered = true;
  order: any;  

  constructor(
    private utilitiesService: UtilitiesService,
    private _orderService: OrderService) { }

  ngOnInit() {
    this.utilitiesService.presentLoadingWithOptions();    
    this._orderService.order$.subscribe(res => {
      this.order = res;
    })
  }
}
