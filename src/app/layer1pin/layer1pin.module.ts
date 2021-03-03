import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Layer1pinPageRoutingModule } from './layer1pin-routing.module';

import { Layer1pinPage } from './layer1pin.page';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Layer1pinPageRoutingModule
  ],
  declarations: [Layer1pinPage]
})
export class Layer1pinPageModule {}
