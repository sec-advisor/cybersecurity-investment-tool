import { Component, OnInit } from '@angular/core';

import { SegmentStoreService } from '../services/segment-store.service';

@Component({
  selector: 'app-segment-overview',
  templateUrl: './segment-overview.component.html',
  styleUrls: ['./segment-overview.component.scss']
})
export class SegmentOverviewComponent implements OnInit {

  constructor(public segmentStoreService: SegmentStoreService) { }

  ngOnInit() {
  }

}
