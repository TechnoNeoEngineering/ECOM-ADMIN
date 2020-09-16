import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountdetailsPage } from './discountdetails.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountdetailsPageRoutingModule {}
