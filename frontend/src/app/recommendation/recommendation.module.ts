import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutsModule } from '../layouts/layouts.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RecommendationPresenterComponent } from './recommendation-presenter/recommendation-presenter.component';
import { RecommendationComponent } from './recommendation.component';
import { RosiModalComponent } from './rosi-modal/rosi-modal.component';
import { SegmentSelectionComponent } from './segment-selection/segment-selection.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    RecommendationComponent,
    SegmentSelectionComponent,
    ConfigurationComponent,
    RecommendationPresenterComponent,
    RosiModalComponent
  ]
})
export class RecommendationModule { }
