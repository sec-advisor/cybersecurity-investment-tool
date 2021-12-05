import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutsModule } from '../layouts/layouts.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RecommendationPresenterComponent } from './recommendation-presenter/recommendation-presenter.component';
import { RecommendationComponent } from './recommendation.component';
import { SegmentSelectionComponent } from './segment-selection/segment-selection.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    ReactiveFormsModule
  ],
  declarations: [RecommendationComponent, SegmentSelectionComponent, ConfigurationComponent, RecommendationPresenterComponent]
})
export class RecommendationModule { }
