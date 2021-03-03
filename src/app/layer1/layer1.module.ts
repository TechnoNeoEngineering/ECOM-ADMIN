import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Layer1PageRoutingModule } from './layer1-routing.module';

import { Layer1Page } from './layer1.page';
import { DemoMaterialModule } from '../material';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Layer1PageRoutingModule,
    DemoMaterialModule,
    HttpClientModule
  ],
  declarations: [Layer1Page,]
})
export class Layer1PageModule {}
