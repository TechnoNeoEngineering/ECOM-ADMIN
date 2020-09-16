import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductrecoveryPage } from './productrecovery.page';

const routes: Routes = [
  {
    path: '',
    component: ProductrecoveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductrecoveryPageRoutingModule {}
