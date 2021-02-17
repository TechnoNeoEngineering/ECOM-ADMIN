import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnpagePageRoutingModule } from './returnpage-routing.module';

import { ReturnpagePage } from './returnpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnpagePageRoutingModule
  ],
  declarations: [ReturnpagePage]
})
export class ReturnpagePageModule {}
