import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductrequestsPageRoutingModule } from './productrequests-routing.module';

import { ProductrequestsPage } from './productrequests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductrequestsPageRoutingModule
  ],
  declarations: [ProductrequestsPage]
})
export class ProductrequestsPageModule {}
