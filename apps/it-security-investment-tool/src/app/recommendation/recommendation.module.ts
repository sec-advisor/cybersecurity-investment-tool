import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutsModule } from '../layouts/layouts.module';
import { RecommendationComponent } from './recommendation.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule
  ],
  declarations: [RecommendationComponent]
})
export class RecommendationModule { }
