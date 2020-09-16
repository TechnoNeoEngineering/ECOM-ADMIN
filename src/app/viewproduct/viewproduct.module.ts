import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewproductPageRoutingModule } from './viewproduct-routing.module';

import { ViewproductPage } from './viewproduct.page';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewproductPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewproductPage
      }
    ]),
    NgxDatatableModule
  ],
  declarations: [ViewproductPage]
})
export class ViewproductPageModule {}
