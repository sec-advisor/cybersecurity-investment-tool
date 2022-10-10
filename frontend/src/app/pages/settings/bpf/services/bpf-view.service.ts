import { Injectable } from '@angular/core';
import { Segment } from '@libs';
import { first, forkJoin, map, Observable, switchMap } from 'rxjs';

import { StorageService } from '../../../../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class BpfViewService {
  constructor(private storageService: StorageService) {}

  resetSegments(): Observable<Segment[]> {
    return this.storageService.getSegments().pipe(
      first(),
      map((segments) =>
        segments.map((segment) => ({
          ...segment,
          optimalInvestment: undefined,
          expectedLossBeforeInvestment: undefined,
          expectedLossWithInvestment: undefined,
          totalCybersecurityCosts: undefined,
        })),
      ),
      switchMap((segments) =>
        forkJoin([
          ...segments.map((segment) =>
            this.storageService.updateSegment(segment).pipe(first()),
          ),
        ]),
      ),
    );
  }
}
