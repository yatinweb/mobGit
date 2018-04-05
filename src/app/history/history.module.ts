import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    HistoryRoutingModule
  ],
  entryComponents: [
    HistoryComponent
  ],
  declarations: [
    HistoryComponent
  ]
})
export class HistoryModule { }
