import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryChargesPageRoutingModule } from './delivery-charges-routing.module';

import { DeliveryChargesPage } from './delivery-charges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DeliveryChargesPageRoutingModule
  ],
  declarations: [DeliveryChargesPage]
})
export class DeliveryChargesPageModule {}
