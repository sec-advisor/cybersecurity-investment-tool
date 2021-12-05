import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SegmentViewModel } from '../models/recommendation-view.model';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  recommendations$ = new BehaviorSubject<any>(undefined);
  selectedSegment$ = new BehaviorSubject<SegmentViewModel | undefined>(undefined);

  getSelectedSegment(): Observable<SegmentViewModel | undefined> {
    return this.selectedSegment$;
  }

  getRecommendations(): Observable<any> {
    return this.recommendations$;
  }

  setSelectedSegment(segment: SegmentViewModel): void {
    this.selectedSegment$.next(segment);
  }

  setRecommendations(recommendations: any): void {
    this.recommendations$.next(recommendations);
  }

}
