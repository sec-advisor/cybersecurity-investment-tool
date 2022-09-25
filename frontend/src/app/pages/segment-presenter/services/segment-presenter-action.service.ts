import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SegmentPresenterActionService {
  private readonly segmentView$ = new BehaviorSubject<'overview' | 'detail'>(
    'overview',
  );
  private isLoading$ = new BehaviorSubject(true);

  toggleView(): void {
    if (this.segmentView$.value === 'overview') {
      this.segmentView$.next('detail');
    } else {
      this.segmentView$.next('overview');
    }
  }

  getView(): Observable<'overview' | 'detail'> {
    return this.segmentView$;
  }

  startLoading(): void {
    this.isLoading$.next(true);
  }

  stopLoading(): void {
    this.isLoading$.next(false);
  }

  getLoadingStatus(): Observable<boolean> {
    return this.isLoading$;
  }
}
