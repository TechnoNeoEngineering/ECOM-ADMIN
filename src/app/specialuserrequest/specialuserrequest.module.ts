import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialuserrequestPageRoutingModule } from './specialuserrequest-routing.module';

import { SpecialuserrequestPage } from './specialuserrequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SpecialuserrequestPageRoutingModule
  ],
  declarations: [SpecialuserrequestPage]
})
export class SpecialuserrequestPageModule {}
