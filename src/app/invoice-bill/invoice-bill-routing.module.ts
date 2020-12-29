import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceBillPage } from './invoice-bill.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceBillPageRoutingModule {}
