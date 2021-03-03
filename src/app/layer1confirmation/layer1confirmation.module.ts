import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Layer1confirmationPageRoutingModule } from './layer1confirmation-routing.module';

import { Layer1confirmationPage } from './layer1confirmation.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Layer1confirmationPageRoutingModule,
    HttpClientModule
  ],
  declarations: [Layer1confirmationPage]
})
export class Layer1confirmationPageModule {}
