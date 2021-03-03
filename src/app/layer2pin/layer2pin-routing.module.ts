import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Layer2pinPage } from './layer2pin.page';

const routes: Routes = [
  {
    path: '',
    component: Layer2pinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Layer2pinPageRoutingModule {}
