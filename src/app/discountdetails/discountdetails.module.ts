import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountdetailsPageRoutingModule } from './discountdetails-routing.module';

import { DiscountdetailsPage } from './discountdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DiscountdetailsPageRoutingModule
  ],
  declarations: [DiscountdetailsPage]
})
export class DiscountdetailsPageModule {}
