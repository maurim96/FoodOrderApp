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
  currentStep: number = 1;
  formMenu: FormGroup;
  additionalForm: FormGroup
  selectedMenu: any;
  selectedType: any;
  selectedGarnish: any;
  selectedSauce: any;  
  selectedIngredients: any[];
  selectedSpecial: any;
  menus: any[];
  locations: any[];
  turns: any[];
  garnishes: any[];
  ingredients: any[];
  specials: any[];
  displayIngredients: boolean = true;
  
  get location() { return this.additionalForm.get('location') }
  get turn() { return this.additionalForm.get('turn') }
  get type() { return this.formMenu.get('type') }
  get sauce() { return this.formMenu.get('sauce') }
  get garnish() { return this.formMenu.get('garnish') }
  get ingredient() { return this.formMenu.get('ingredient') }
  get special() { return this.formMenu.get('special') }

  ngOnInit() {
    this.preloadData();
  }

  createModel() {
    if (this.selectedMenu.type.length > 0) {
      if (this.selectedMenu.hasGarnish) {
        this.formMenu = this._fb.group({
          type: ['', Validators.required],
          garnish: ['', Validators.required],
          ingredient: ['', [Validators.required, Validators.maxLength(3)]]
        })
      } else {
        this.formMenu = this._fb.group({
          type: ['', Validators.required],
          sauce: ['', Validators.required]
        })
      }
    } else {
      this.formMenu = this._fb.group({
        ingredient: ['', [Validators.required, Validators.maxLength(5)]],
        special: ['', Validators.maxLength(1)]
      })
    }
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
      this.ingredients = res.filter(x => {
        if(!x.isSpecial) return x;
      });
      this.specials = res.filter(x => {
        if(x.isSpecial) return x;
      });
    })
  }

  checkStep(step) {
    if (this.currentStep === step) return true;
    else return false
  }

  prev() {
    this.currentStep--;
  }

  menuChanged(idMenu) {
    const menuSelected = this.menus.filter(x => {
      if (x._id === idMenu) return x;
    })
    this.selectedMenu = menuSelected[0];
    this.currentStep++;
    this.createModel();
  }

  showIngredients() {
    this.displayIngredients = true;    
  }

  showSpecials() {
    this.displayIngredients = false;
  }

  typeChanged() {
    const typeSelected = this.selectedMenu.type.filter(x => {
      if (x._id === this.type.value) return x;
    })   
    this.selectedType = typeSelected[0];
  }

  ingredientsChanged() {
    const ingredientsSelected = this.ingredients.filter(x => {
      if (this.ingredient.value.includes(x._id)) return x;
    })   
    this.selectedIngredients = ingredientsSelected;
  }

  sauceChanged() {
    const sauceSelected = this.selectedMenu.sauce.filter(x => {
      if (x._id === this.sauce.value) return x;
    })   
    this.selectedType = sauceSelected[0];
  }

  garnishChanged() {
    const garnishSelected = this.garnishes.filter(x => {
      if (x._id === this.garnish.value) return x;
    })        
    if (!garnishSelected[0].isSalad) {
      this.ingredient.setValidators(null);
      this.ingredient.patchValue('');
    }
    this.selectedGarnish = garnishSelected[0];
  }

  garnishIngredientsChanged() {
    const ingredientSelected = this.ingredients.filter(x => {
      if (this.ingredient.value.includes(x._id)) return x;
    })
    this.selectedIngredients = ingredientSelected;
  }
}
