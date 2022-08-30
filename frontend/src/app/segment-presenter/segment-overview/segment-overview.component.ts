import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';

import { Segment } from '../../../../libs/api-interfaces';
import { SegmentDataService } from '../../services/backend/segment-data.service';
import { StorageService } from '../../services/storage.service';
import { SegmentPresenterActionService } from '../services/segment-presenter-action.service';

@Component({
  selector: 'app-segment-overview',
  templateUrl: './segment-overview.component.html',
  styleUrls: ['./segment-overview.component.scss'],
})
export class SegmentOverviewComponent implements OnInit {
  stream$!: Observable<{
    segments: Segment[];
    totalInvestment: number | undefined;
    withoutSegmentation: Partial<Segment> | undefined;
  }>;

  constructor(
    private segmentDataService: SegmentDataService,
    private storageService: StorageService,
    public segmentPresenterActionService: SegmentPresenterActionService
  ) {}

  ngOnInit(): void {
    this.stream$ = this.storageService.getSegments().pipe(
      tap(() => this.segmentPresenterActionService.startLoading()),
      switchMap((segments) =>
        segments.length > 0 &&
        segments.some((segment) => !Number.isFinite(segment.optimalInvestment))
          ? this.segmentDataService
              .calculateInvestment(segments)
              .pipe(
                tap((segments) => this.storageService.updateSegments(segments))
              )
          : of(segments)
      ),
      map((segments) => ({
        segments,
        totalInvestment:
          segments.length > 0 &&
          segments.every((s) => Number.isFinite(s.optimalInvestment))
            ? this.getTotalInvestment(segments)
            : undefined,
      })),
      switchMap((viewModel) =>
        (viewModel.segments.length > 0
          ? this.segmentDataService.calculateInvestmentWithoutSegmentation(
              viewModel.segments
            )
          : of(undefined as unknown as Partial<Segment>)
        ).pipe(
          map((withoutSegmentation) => ({ ...viewModel, withoutSegmentation })),
          tap(() => this.segmentPresenterActionService.stopLoading())
        )
      )
    );
  }

  private getTotalInvestment(segments: Segment[]): number {
    return segments.reduce(
      (pre, curr) => pre + (curr?.optimalInvestment || 0),
      0
    );
  }
}
