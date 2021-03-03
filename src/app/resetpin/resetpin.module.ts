import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpinPageRoutingModule } from './resetpin-routing.module';

import { ResetpinPage } from './resetpin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetpinPageRoutingModule
  ],
  declarations: [ResetpinPage]
})
export class ResetpinPageModule {}
