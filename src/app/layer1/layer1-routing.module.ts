import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Layer1Page } from './layer1.page';

const routes: Routes = [
  {
    path: '',
    component: Layer1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Layer1PageRoutingModule {}
