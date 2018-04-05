import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from '../core/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    SearchRoutingModule
  ],
  entryComponents: [
    SearchComponent
  ],
  declarations: [
    SearchComponent,
    ProfileComponent
  ],
  providers: [UserService]
})
export class SearchModule { }
