import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KonversiPageRoutingModule } from './konversi-routing.module';

import { KonversiPage } from './konversi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KonversiPageRoutingModule
  ],
  declarations: [KonversiPage]
})
export class KonversiPageModule {}
