import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayerconfirmationPageRoutingModule } from './layerconfirmation-routing.module';

import { LayerconfirmationPage } from './layerconfirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayerconfirmationPageRoutingModule
  ],
  declarations: [LayerconfirmationPage]
})
export class LayerconfirmationPageModule {}
