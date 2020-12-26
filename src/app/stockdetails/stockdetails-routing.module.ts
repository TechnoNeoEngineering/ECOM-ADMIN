import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockdetailsPage } from './stockdetails.page';

const routes: Routes = [
  {
    path: '',
    component: StockdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockdetailsPageRoutingModule {}
