import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Segment } from '@app/api-interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, from, map, Observable, of, Subscriber, switchMap } from 'rxjs';

import { DangerModalComponent } from '../../layouts/danger-modal/danger-modal.component';
import { StorageService } from '../../services/storage.service';
import { SegmentRegistratorComponent } from '../segment-registrator/segment-registrator.component';

@Component({
  selector: 'app-segment-overview',
  templateUrl: './segment-overview.component.html',
  styleUrls: ['./segment-overview.component.scss']
})
export class SegmentOverviewComponent implements OnInit, OnDestroy {

  private subscriber = new Subscriber();

  stream$!: Observable<{ segments: Segment[], totalInvestment: number | undefined }>;

  @ViewChild(SegmentRegistratorComponent) segmentModal?: SegmentRegistratorComponent;

  constructor(private storageService: StorageService, private moalService: NgbModal) {
  }

  ngOnInit(): void {
    this.stream$ = this.storageService.getSegments().pipe(
      map(segments => ({
        segments,
        totalInvestment: segments.every(s => Number.isFinite(s.suggestedInvestment)) ?
          this.getTotalInvestment(segments) :
          undefined
      }))
    );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  removeSegment(segment: Segment): void {
    if (segment.id) {
      this.subscriber.add(from(this.moalService.open(DangerModalComponent).result).pipe(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        switchMap(() => this.storageService.removeSegment(segment.id!)),
        catchError(() => of(undefined))
      ).subscribe())
    }
  }

  editSegment(segment: Segment): void {
    this.segmentModal?.openSegmentDialog(segment);
  }

  private getTotalInvestment(segments: Segment[]): number {
    return segments.reduce((pre, curr) => pre + (curr?.suggestedInvestment || 0), 0);
  }
}
