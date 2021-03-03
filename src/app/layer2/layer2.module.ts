import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Layer2PageRoutingModule } from './layer2-routing.module';

import { Layer2Page } from './layer2.page';
import { DemoMaterialModule } from '../material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Layer2PageRoutingModule,
    DemoMaterialModule
  ],
  declarations: [Layer2Page]
})
export class Layer2PageModule {}
