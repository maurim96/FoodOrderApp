import { AdditionalInfoComponent } from './../additional-info/additional-info.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakeOrderPage } from './make-order.page';
import { MenuSelectionComponent } from '../menu-selection/menu-selection.component';
import { OrderDataComponent } from '../order-data/order-data.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: MakeOrderPage }])
  ],
  declarations: [MakeOrderPage, AdditionalInfoComponent, MenuSelectionComponent, OrderDataComponent]
})
export class MakeOrderPageModule {}
