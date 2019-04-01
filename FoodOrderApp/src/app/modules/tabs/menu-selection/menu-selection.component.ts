import { Component, OnInit, Output } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-selection',
  templateUrl: './menu-selection.component.html',
  styleUrls: ['./menu-selection.component.scss', '../make-order/make-order.page.scss'],
})
export class MenuSelectionComponent implements OnInit {

  constructor(
    private _orderService: OrderService
  ) { }
  @Output() selectMenu = new EventEmitter();
  menus: any[];
  selectedMenu: any;

  ngOnInit() {
    this._orderService.getAllMenus().subscribe(res => {
      this.menus = res;
    })
  }

  menuChanged(idMenu) {
    const menuSelected = this.menus.filter(x => {
      if (x._id === idMenu) return x;
    })
    this.selectedMenu = menuSelected[0];
    this.selectMenu.emit(this.selectedMenu);
  }
}
