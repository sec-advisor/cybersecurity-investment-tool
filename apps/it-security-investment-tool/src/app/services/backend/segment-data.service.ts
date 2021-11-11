import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segment } from '@app/api-interfaces';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegmentDataService {

  constructor(private http: HttpClient) { }

  storeSegment(segment: Segment): Observable<string> {
    return this.http.post<string>('api/segments/segment', segment).pipe(
      catchError(err => of({} as string).pipe(
        tap(() => console.error(err.error.message)))
      )
    );
  }

  getSegments(companyId: string): Observable<Segment[]> {
    return this.http.get<Segment[]>(`api/segments/segments/${companyId}`).pipe(
      catchError((err) => of({} as Segment[]).pipe(
        tap(() => console.error(err.error.message))))
    );
  }

  removeSegment(segmentId: string): Observable<void> {
    return this.http.delete<void>(`api/segments/segment/${segmentId}`).pipe(
      catchError((err) => of(undefined).pipe(
        tap(() => console.error(err.error.message))))
    );
  }

  calculateInvestment(segments: Segment[]): Observable<Segment[]> {
    return this.http.post<Segment[]>(`api/segments/investment-calculation`, segments).pipe(
      catchError((err) => of({} as Segment[]).pipe(
        tap(() => console.error(err.error.message))))
    );
  }

}
