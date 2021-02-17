import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnpagePage } from './returnpage.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnpagePageRoutingModule {}
