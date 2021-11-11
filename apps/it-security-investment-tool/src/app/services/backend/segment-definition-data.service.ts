import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SegmentDefinition, ValueEstimation } from '@app/api-interfaces';
import { catchError, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SegmentDefinitionDataService {

  segments?: SegmentDefinition[];

  constructor(private http: HttpClient) { }

  getSegmentDefinitions(): Observable<SegmentDefinition[]> {
    return this.segments ?
      of(this.segments) :
      this.http.get<SegmentDefinition[]>('api/segment-definitions/definitions').pipe(
        tap(segments => this.segments = segments),
        catchError((err) => of({} as SegmentDefinition[]).pipe(
          tap(() => console.error(err.error.message))))
      );
  }

  estimateValue(segment: SegmentDefinition | undefined, keyValuePairs: { key: string; value: number; }[] | undefined): Observable<number> {
    if (segment && keyValuePairs) {
      return this.http.post<number>('api/segment-definitions/value-estimation', { segment, keyValuePairs } as ValueEstimation);
    } else {
      return throwError({ error: { message: 'Wrong values for value estimation!' } })
    }
  }
}
