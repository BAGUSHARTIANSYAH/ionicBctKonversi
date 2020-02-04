import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BctPageRoutingModule } from './bct-routing.module';

import { BctPage } from './bct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BctPageRoutingModule
  ],
  declarations: [BctPage]
})
export class BctPageModule {}
