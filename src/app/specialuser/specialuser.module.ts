import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialuserPageRoutingModule } from './specialuser-routing.module';

import { SpecialuserPage } from './specialuser.page';
import { UserlistviewComponent } from '../userlistview/userlistview.component';
import { UsercartComponent } from '../usercart/usercart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SpecialuserPageRoutingModule
  ],
  declarations: [SpecialuserPage, UserlistviewComponent,UsercartComponent],
  entryComponents : [UserlistviewComponent,UsercartComponent]
})
export class SpecialuserPageModule {}
