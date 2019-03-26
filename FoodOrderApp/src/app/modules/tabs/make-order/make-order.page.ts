import { IonSlides } from '@ionic/angular';
import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { timeout } from 'q';


@Component({
  selector: 'app-make-order',
  templateUrl: 'make-order.page.html',
  styleUrls: ['make-order.page.scss']
})
export class MakeOrderPage {

  @ViewChild('slides') slides: IonSlides;
  constructor(
    private _orderService: OrderService,
    private _loginService: LoginService,
    private _fb: FormBuilder
  ) { }

  formMenu: FormGroup;
  selectedMenu: any;
  selectedGarnish: any;
  menus: any[];
  locations: any[];
  turns: any[];
  garnishes: any[];
  ingredients: any[];

  get menu() { return this.formMenu.get('menu') }
  get location() { return this.formMenu.get('location') }
  get turn() { return this.formMenu.get('turn') }
  get type() { return this.formMenu.get('type') }
  get garnish() { return this.formMenu.get('garnish') }
  get ingredient() { return this.formMenu.get('ingredient') }

  ngOnInit() {
    this.formMenu = this.createModel();
    this.preloadData();
  }

  next() {
    this.slides.slideNext();
    // this.slides.updateAutoHeight(2000);
  }

  prev() {
    this.slides.slidePrev();
  }

  createModel() {
    return this._fb.group({
      menu: ['', Validators.required],
      location: ['', Validators.required],
      turn: ['', Validators.required],
      type: [''],
      garnish: [''],
      ingredient: ['']
    })
  }

  preloadData() {
    this._orderService.getAllMenus().subscribe(res => {
      this.menus = res;
    })
    this._orderService.getAllLocations().subscribe(res => {
      this.locations = res;
    })
    this._orderService.getAllTurns().subscribe(res => {
      this.turns = res;
    })
    this._orderService.getAllGarnishes().subscribe(res => {
      this.garnishes = res;
    })
    this._orderService.getAllIngredients().subscribe(res => {
      this.ingredients = res;
      console.log(this.ingredients)
    })
  }

  logout() {
    this._loginService.logout();
  }

  menuChanged(idMenu) {
    const menuSelected = this.menus.filter(x => {
      if (x._id === idMenu) return x;
    })
    this.selectedMenu = menuSelected[0];
    console.log(this.selectedMenu);
    this.next();
  }

  garnishChanged() {
    const garnishSelected = this.garnishes.filter(x => {
      if (x._id === this.garnish.value && x.isSalad) return x;
    })
    this.selectedGarnish = garnishSelected[0];
    console.log(this.selectedGarnish);
  }

  garnishIngredientsChanged() {
    console.log(this.ingredient)
  }
}
