import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Layer1confirmationPage } from './layer1confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: Layer1confirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Layer1confirmationPageRoutingModule {}
