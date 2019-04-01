import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss', '../make-order/make-order.page.scss'],
})
export class AdditionalInfoComponent implements OnInit {

  constructor(
    private _fb : FormBuilder,
    private _orderService : OrderService
  ) { }
  @Output() prevPage = new EventEmitter();
  @Output() confirmForm = new EventEmitter();

  additionalForm: FormGroup;
  locations: any[];
  turns: any[];

  get location() { return this.additionalForm.get('location') }
  get turn() { return this.additionalForm.get('turn') }
  get note() { return this.additionalForm.get('note') }

  ngOnInit() {
    this.preloadData();
    this.additionalForm = this._fb.group({
      turn: ['', Validators.required],
      location: ['', Validators.required],
      note: ['']
    })
  }

  preloadData() {        
    this._orderService.getAllLocations().subscribe(res => {
      this.locations = res;
    })
    this._orderService.getAllTurns().subscribe(res => {
      this.turns = res;
    })
  }

  prev() {
    this.prevPage.emit();
  }

  next() {
    const data = {
      turn: this.turn.value,
      location: this.location.value,
      note: this.note.value
    }
    this.confirmForm.emit(data);
  }

}
