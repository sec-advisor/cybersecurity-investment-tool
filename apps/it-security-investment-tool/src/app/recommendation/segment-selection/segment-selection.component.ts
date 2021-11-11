import { Component, Input } from '@angular/core';

import { SegmentViewModel } from '../models/recommendation-view.model';

@Component({
  selector: 'app-segment-selection',
  templateUrl: './segment-selection.component.html',
  styleUrls: ['./segment-selection.component.scss']
})
export class SegmentSelectionComponent {

  @Input() segments?: SegmentViewModel[];

  segmentClick(segments: SegmentViewModel[], selectedSegment: SegmentViewModel): void {
    segments.forEach(segment => segment.isActive = false);
    selectedSegment.isActive = true;
  }

}
