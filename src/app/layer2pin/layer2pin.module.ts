import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Layer2pinPageRoutingModule } from './layer2pin-routing.module';

import { Layer2pinPage } from './layer2pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Layer2pinPageRoutingModule
  ],
  declarations: [Layer2pinPage]
})
export class Layer2pinPageModule {}
