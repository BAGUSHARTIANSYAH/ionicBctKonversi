import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KonversiPage } from './konversi.page';

const routes: Routes = [
  {
    path: '',
    component: KonversiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KonversiPageRoutingModule {}
