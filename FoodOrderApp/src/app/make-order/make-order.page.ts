import { Component } from '@angular/core';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-make-order',
  templateUrl: 'make-order.page.html',
  styleUrls: ['make-order.page.scss']
})
export class MakeOrderPage {
  constructor(
    public utilitiesService: UtilitiesService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.utilitiesService.presentLoadingWithOptions();
  }
}
