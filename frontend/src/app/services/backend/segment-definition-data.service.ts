import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SegmentDefinition, ValueEstimation } from '@libs';
import { catchError, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';

@Injectable({
  providedIn: 'root',
})
export class SegmentDefinitionDataService {
  segments?: SegmentDefinition[];

  constructor(private http: HttpClient) {}

  getSegmentDefinitions(): Observable<SegmentDefinition[]> {
    return this.segments
      ? of(this.segments)
      : this.http
          .get<SegmentDefinition[]>(
            `${backend.url}/segment-definitions/definitions`,
            httpOptions,
          )
          .pipe(
            tap((segments) => (this.segments = segments)),
            catchError((err) =>
              of({} as SegmentDefinition[]).pipe(
                tap(() => console.error(err.error.message)),
              ),
            ),
          );
  }

  estimateValue(
    segment: SegmentDefinition | undefined,
    keyValuePairs: { key: string; value: number }[] | undefined,
  ): Observable<number> {
    if (segment && keyValuePairs) {
      return this.http.post<number>(
        `${backend.url}/segment-definitions/value-estimation`,
        { segment, keyValuePairs } as ValueEstimation,
        httpOptions,
      );
    } else {
      return throwError({
        error: { message: 'Wrong values for value estimation!' },
      });
    }
  }
}
