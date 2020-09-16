import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialuserPage } from './specialuser.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialuserPageRoutingModule {}
