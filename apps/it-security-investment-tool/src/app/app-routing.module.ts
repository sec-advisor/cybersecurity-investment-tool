import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { HomeComponent } from './home/home.component';
import { SegmentPresenterComponent } from './segment-presenter/segment-presenter.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'segments', component: SegmentPresenterComponent },
  { path: 'recommendation', component: SegmentPresenterComponent },
  { path: 'business-profile', component: BusinessProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
