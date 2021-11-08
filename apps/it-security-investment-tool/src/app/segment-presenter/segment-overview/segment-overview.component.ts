import { Component } from '@angular/core';

import { SegmentStoreService } from '../services/segment-store.service';

@Component({
  selector: 'app-segment-overview',
  templateUrl: './segment-overview.component.html',
  styleUrls: ['./segment-overview.component.scss']
})
export class SegmentOverviewComponent {

  constructor(public segmentStoreService: SegmentStoreService) { }

}
