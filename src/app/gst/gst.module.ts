import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GstPageRoutingModule } from './gst-routing.module';

import { GstPage } from './gst.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GstPageRoutingModule
  ],
  declarations: [GstPage]
})
export class GstPageModule {}
