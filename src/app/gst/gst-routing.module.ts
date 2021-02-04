import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GstPage } from './gst.page';

const routes: Routes = [
  {
    path: '',
    component: GstPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GstPageRoutingModule {}
