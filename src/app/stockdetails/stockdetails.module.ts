import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockdetailsPageRoutingModule } from './stockdetails-routing.module';

import { StockdetailsPage } from './stockdetails.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StockdetailsPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [StockdetailsPage]
})
export class StockdetailsPageModule {}
