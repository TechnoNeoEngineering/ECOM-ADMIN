import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductrequestsPage } from './productrequests.page';

const routes: Routes = [
  {
    path: '',
    component: ProductrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductrequestsPageRoutingModule {}
