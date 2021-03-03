import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Layer2Page } from './layer2.page';

const routes: Routes = [
  {
    path: '',
    component: Layer2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Layer2PageRoutingModule {}
