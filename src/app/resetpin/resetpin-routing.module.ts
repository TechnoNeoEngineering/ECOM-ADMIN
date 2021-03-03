import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetpinPage } from './resetpin.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetpinPageRoutingModule {}
