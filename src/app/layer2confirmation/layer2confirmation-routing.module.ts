import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Layer2confirmationPage } from './layer2confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: Layer2confirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Layer2confirmationPageRoutingModule {}
