import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { SearchComponent } from './search.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  Route.withShell([
    { path: 'search', component: SearchComponent, data: { title: extract('Search') } },
    { path: 'search/:id', component: ProfileComponent, data: { title: extract('User Profile') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SearchRoutingModule { }
