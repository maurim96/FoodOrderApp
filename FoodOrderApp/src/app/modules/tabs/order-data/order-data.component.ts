import { ValidateLengthSmaller } from 'src/app/length-smaller.validator.';
import { ValidateLength } from 'src/app/length.validator';
import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss', '../make-order/make-order.page.scss'],
})
export class OrderDataComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _orderService: OrderService
  ) { }

  @Input() selectedMenu: any;
  @Output() prevPage = new EventEmitter();
  @Output() confirmForm = new EventEmitter();
  formMenu: FormGroup;
  selectedType: any;
  selectedGarnish: any;
  selectedSauce: any;
  selectedIngredients = [];
  selectedSpecial: any;
  garnishes: any[];
  ingredients: any[];
  specials: any[];
  displayIngredients: boolean = true;

  get type() { return this.formMenu.get('type') }
  get sauce() { return this.formMenu.get('sauce') }
  get garnish() { return this.formMenu.get('garnish') }
  get ingredient() { return this.formMenu.get('ingredient') }
  get garnishIngredients() { return this.formMenu.get('garnishIngredients') }
  get special() { return this.formMenu.get('special') }

  ngOnInit() {
    this.preloadData();
  }

  ngOnChanges(changes: SimpleChanges) {    
    this.formMenu = this.createModel();
  }

  createModel() {
    if (!this.selectedMenu.isSalad) {
      if (this.selectedMenu.hasGarnish) {
        return this._fb.group({
          type: ['', Validators.required],
          garnish: ['', Validators.required],
          garnishIngredients: ['', ValidateLengthSmaller]
        })
      } else {
        return this._fb.group({
          type: ['', Validators.required],
          sauce: ['']
        })
      }
    } else {
      return this._fb.group({
        ingredient: ['', [Validators.required, ValidateLength]],
        special: ['']
      })
    }
  }

  checkState(ingredient, maxLength, isGarnish) {
    if (isGarnish) {
      if (this.garnishIngredients.value.length === maxLength && !this.garnishIngredients.value.includes(ingredient)) {
        return true;
      }
    } else {
      if (this.ingredient.value.length === maxLength && !this.ingredient.value.includes(ingredient)) {
        return true;
      }
    }
    return false;
  }

  checkOption(ingredient, isGarnish) {
    if (this.selectedIngredients.includes(ingredient)) {
      const index = this.selectedIngredients.indexOf(ingredient, 0);
      if (index > -1) {
        this.selectedIngredients.splice(index, 1);
      }
    } else {
      this.selectedIngredients.push(ingredient);
    }
    if (isGarnish) {
      this.garnishIngredients.patchValue(this.selectedIngredients);
    } else {
      this.ingredient.patchValue(this.selectedIngredients);
    }
  }

  checkSpecial(special) {
    if (this.selectedSpecial === special) {
      this.selectedSpecial = null;
      this.special.patchValue("");
    } else {
      this.selectedSpecial = special;
      this.special.patchValue(special);
    }
  }

  next() {    
    const data = {
      menu: this.selectedMenu._id,
      mainCourse: {
        type: this.type ? this.type.value : "",
        sauce: this.sauce ? this.sauce.value : "",
        ingredients: this.ingredient ? this.ingredient.value : [],
        special: this.special ? this.special.value : "",
        specialImg: this.special ? this.specials.filter(x => {if(x.name === this.special.value) return x.img})[0].img : ""
      },
      garnish: this.selectedGarnish ? this.selectedGarnish._id : null,
      garnishIngredients: this.garnishIngredients ? this.garnishIngredients.value : []
    }
    this.confirmForm.emit(data);
  }

  preloadData() {
    this._orderService.getAllGarnishes().subscribe(res => {
      this.garnishes = res;
    })
    this._orderService.getAllIngredients().subscribe(res => {
      this.ingredients = res.filter(x => {
        if (!x.isSpecial) return x;
      });
      this.specials = res.filter(x => {
        if (x.isSpecial) return x;
      });
    })
  }

  prev() {
    this.prevPage.emit();
  }

  showIngredients() {
    this.displayIngredients = true;
  }

  showSpecials() {
    this.displayIngredients = false;
  }

  typeChanged() {
    const typeSelected = this.selectedMenu.type.filter(x => {
      if (x.name === this.type.value) return x;
    })
    this.selectedType = typeSelected[0];
  }

  ingredientsChanged() {
    const ingredientsSelected = this.ingredients.filter(x => {
      if (this.ingredient.value.includes(x._id)) return x;
    })
    this.selectedIngredients = ingredientsSelected;
  }

  garnishChanged() {
    const garnishSelected = this.garnishes.filter(x => {
      if (x.name === this.garnish.value) return x;
    })
    if (!garnishSelected[0].isSalad) {
      this.garnishIngredients.setValidators(null);
      this.garnishIngredients.patchValue('');
    }
    this.selectedGarnish = garnishSelected[0];
  }

  garnishIngredientsChanged() {
    const ingredientSelected = this.ingredients.filter(x => {
      if (this.ingredient.value.includes(x._id)) return x;
    })
    this.selectedIngredients = ingredientSelected;
  }

  sauceChanged() {
    const sauceSelected = this.selectedMenu.sauce.filter(x => {
      if (x.name === this.sauce.value) return x;
    })
    this.selectedType = sauceSelected[0];
  }

}
