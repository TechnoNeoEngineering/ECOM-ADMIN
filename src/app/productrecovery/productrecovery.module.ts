import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductrecoveryPageRoutingModule } from './productrecovery-routing.module';
import { RouterModule } from '@angular/router';
import { ProductrecoveryPage } from './productrecovery.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductrecoveryPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductrecoveryPage
      }
    ]),
    NgxDatatableModule
  ],
  declarations: [ProductrecoveryPage]
})
export class ProductrecoveryPageModule {}
