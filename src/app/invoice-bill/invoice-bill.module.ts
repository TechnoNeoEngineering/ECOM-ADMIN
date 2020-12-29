import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceBillPageRoutingModule } from './invoice-bill-routing.module';

import { InvoiceBillPage } from './invoice-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceBillPageRoutingModule
  ],
  declarations: [InvoiceBillPage]
})
export class InvoiceBillPageModule {}
