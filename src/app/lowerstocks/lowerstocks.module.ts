import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LowerstocksPageRoutingModule } from './lowerstocks-routing.module';

import { LowerstocksPage } from './lowerstocks.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxDatatableModule,
    LowerstocksPageRoutingModule
  ],
  declarations: [LowerstocksPage]
})
export class LowerstocksPageModule {}
