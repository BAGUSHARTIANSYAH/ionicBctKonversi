import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BctPage } from './bct.page';

const routes: Routes = [
  {
    path: '',
    component: BctPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BctPageRoutingModule {}
