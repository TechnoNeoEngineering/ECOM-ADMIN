import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewproductPage } from './viewproduct.page';

const routes: Routes = [
  {
    path: '',
    component: ViewproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewproductPageRoutingModule {}
