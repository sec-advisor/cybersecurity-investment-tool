import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private selectedSegmentId$ = new BehaviorSubject<string | undefined>(undefined);

  getSelectedSegmentId(): Observable<string | undefined> {
    return this.selectedSegmentId$;
  }

  setSelectedSegmentId(id: string): void {
    this.selectedSegmentId$.next(id);
  }

}
