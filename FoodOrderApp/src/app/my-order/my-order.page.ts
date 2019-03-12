import { Component } from '@angular/core';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-my-order',
  templateUrl: 'my-order.page.html',
  styleUrls: ['my-order.page.scss']
})
export class MyOrderPage {
  ordered = true;

  constructor(
    public utilitiesService: UtilitiesService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.utilitiesService.presentLoadingWithOptions();
  }
}
