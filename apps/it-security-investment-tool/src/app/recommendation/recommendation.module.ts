import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutsModule } from '../layouts/layouts.module';
import { RecommendationComponent } from './recommendation.component';
import { SegmentSelectionComponent } from './segment-selection/segment-selection.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule
  ],
  declarations: [RecommendationComponent, SegmentSelectionComponent]
})
export class RecommendationModule { }
