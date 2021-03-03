import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayerconfirmationPage } from './layerconfirmation.page';

const routes: Routes = [
  {
    path: '',
    component: LayerconfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayerconfirmationPageRoutingModule {}
