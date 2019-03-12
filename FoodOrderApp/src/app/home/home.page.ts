import { UtilitiesService } from './../utilities.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
      public utilitiesService: UtilitiesService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.utilitiesService.presentLoadingWithOptions();
  }
}
