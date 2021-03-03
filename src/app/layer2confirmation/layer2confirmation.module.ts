import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Layer2confirmationPageRoutingModule } from './layer2confirmation-routing.module';

import { Layer2confirmationPage } from './layer2confirmation.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Layer2confirmationPageRoutingModule,
    HttpClientModule
  ],
  declarations: [Layer2confirmationPage]
})
export class Layer2confirmationPageModule {}
