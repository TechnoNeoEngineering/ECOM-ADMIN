import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelpagePage } from './cancelpage.page';

const routes: Routes = [
  {
    path: '',
    component: CancelpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelpagePageRoutingModule {}
