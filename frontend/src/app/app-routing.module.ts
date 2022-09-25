import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { BusinessProfileComponent } from './pages/business-profile/business-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { RecommendationComponent } from './pages/recommendation/recommendation.component';
import { SegmentPresenterComponent } from './pages/segment-presenter/segment-presenter.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'segments',
    component: SegmentPresenterComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'recommendation',
    component: RecommendationComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'business-profile', component: BusinessProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
