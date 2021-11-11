import { Component, OnInit, ViewChild } from '@angular/core';
import { Segment } from '@app/api-interfaces';
import { first, Observable } from 'rxjs';

import { StorageService } from '../../services/storage.service';
import { SegmentRegistratorComponent } from '../segment-registrator/segment-registrator.component';

@Component({
  selector: 'app-segment-overview',
  templateUrl: './segment-overview.component.html',
  styleUrls: ['./segment-overview.component.scss']
})
export class SegmentOverviewComponent implements OnInit {

  segments$!: Observable<Segment[]>;

  @ViewChild(SegmentRegistratorComponent) segmentModal?: SegmentRegistratorComponent;

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

  editSegment(segment: Segment): void {
    this.segmentModal?.openSegmentDialog(segment);
  }
}
