import { Component, Input } from '@angular/core';

import { SegmentViewModel } from '../models/recommendation-view.model';
import { RecommendationService } from '../services/recommendation.service';

@Component({
  selector: 'app-segment-selection',
  templateUrl: './segment-selection.component.html',
  styleUrls: ['./segment-selection.component.scss']
})
export class SegmentSelectionComponent {

  @Input() segments?: SegmentViewModel[];

  constructor(
    private recommendationService: RecommendationService
  ) { }

  segmentClick(segment: SegmentViewModel): void {
    this.recommendationService.setSelectedSegment(segment);
    this.recommendationService.setRecommendations(undefined);
  }

}
