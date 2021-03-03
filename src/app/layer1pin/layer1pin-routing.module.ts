import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Layer1pinPage } from './layer1pin.page';

const routes: Routes = [
  {
    path: '',
    component: Layer1pinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Layer1pinPageRoutingModule {}
