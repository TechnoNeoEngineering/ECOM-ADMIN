import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialuserrequestPage } from './specialuserrequest.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialuserrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialuserrequestPageRoutingModule {}
