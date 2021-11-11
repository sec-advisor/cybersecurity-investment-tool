import { Component, OnInit } from '@angular/core';
import { Segment } from '@app/api-interfaces';
import { first, Observable } from 'rxjs';

import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-segment-overview',
  templateUrl: './segment-overview.component.html',
  styleUrls: ['./segment-overview.component.scss']
})
export class SegmentOverviewComponent implements OnInit {

  segments$!: Observable<Segment[]>;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.segments$ = this.storageService.getSegments();
  }

  removeSegment(segment: Segment): void {
    if (segment.id) {
      this.storageService.removeSegment(segment.id).pipe(first()).subscribe();
    }
  }
}
