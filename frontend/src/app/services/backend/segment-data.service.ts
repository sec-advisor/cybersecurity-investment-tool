import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Segment } from '../../../../libs/api-interfaces';
import { httpOptions } from '../../constants/http-options.constants';
import { publicAPIUrl } from '../../constants/public-api-url';

@Injectable({
  providedIn: 'root',
})
export class SegmentDataService {
  constructor(private http: HttpClient) { }

  storeSegment(segment: Segment): Observable<string> {
    return this.http
      .post<string>(`${publicAPIUrl}/segments/segment`, segment, httpOptions)
      .pipe(
        catchError((err) =>
          of({} as string).pipe(tap(() => console.error(err.error.message)))
        )
      );
  }

  getSegments(companyId: string): Observable<Segment[]> {
    return this.http
      .get<Segment[]>(`${publicAPIUrl}/segments/segments/${companyId}`, httpOptions)
      .pipe(
        catchError((err) =>
          of({} as Segment[]).pipe(tap(() => console.error(err.error.message)))
        )
      );
  }

  removeSegment(segmentId: string): Observable<void> {
    return this.http
      .delete<void>(`${publicAPIUrl}/segments/segment/${segmentId}`, httpOptions)
      .pipe(
        catchError((err) =>
          of(undefined).pipe(tap(() => console.error(err.error.message)))
        )
      );
  }

  calculateInvestment(segments: Segment[]): Observable<Segment[]> {
    return this.http
      .post<Segment[]>(
        `${publicAPIUrl}/segments/investment-calculation`,
        segments,
        httpOptions
      )
      .pipe(
        catchError((err) =>
          of({} as Segment[]).pipe(tap(() => console.error(err.error.message)))
        )
      );
  }

  calculateInvestmentWithoutSegmentation(
    segments: Segment[]
  ): Observable<Partial<Segment>> {
    return this.http
      .post<Partial<Segment>>(
        `${publicAPIUrl}/segments/investment-calculation-without-segmentation`,
        segments,
        httpOptions
      )
      .pipe(
        catchError((err) =>
          of({} as Partial<Segment>).pipe(
            tap(() => console.error(err.error.message))
          )
        )
      );
  }

  updateSegment(segment: Segment): Observable<Segment> {
    return this.http
      .patch<Segment>(`${publicAPIUrl}/segments/segment`, segment, httpOptions)
      .pipe(
        catchError((err) =>
          of({} as Segment).pipe(tap(() => console.error(err.error.message)))
        )
      );
  }
}
