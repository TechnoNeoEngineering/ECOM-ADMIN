import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelpagePageRoutingModule } from './cancelpage-routing.module';

import { CancelpagePage } from './cancelpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelpagePageRoutingModule
  ],
  declarations: [CancelpagePage]
})
export class CancelpagePageModule {}
