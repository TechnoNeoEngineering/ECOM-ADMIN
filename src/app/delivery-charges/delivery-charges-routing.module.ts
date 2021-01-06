import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryChargesPage } from './delivery-charges.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryChargesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryChargesPageRoutingModule {}
