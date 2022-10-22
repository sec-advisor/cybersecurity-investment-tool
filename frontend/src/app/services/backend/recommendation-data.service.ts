import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecommendationProfile, ROSIDetail } from '@libs';
import { catchError, Observable, of, tap } from 'rxjs';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';

@Injectable({
  providedIn: 'root',
})
export class RecommendationDataService {
  constructor(private http: HttpClient) {}

  recommend(profile: RecommendationProfile): Observable<any> {
    return this.http
      .post<RecommendationProfile>(
        `${backend.url}/recommendation/recommend`,
        profile,
        httpOptions,
      )
      .pipe(
        catchError((err) =>
          of({} as RecommendationProfile).pipe(
            tap(() => console.error(err.error.message)),
          ),
        ),
      );
  }

  calculateROSI(rosiDetail: ROSIDetail): Observable<ROSIDetail> {
    return this.http
      .post<ROSIDetail>(
        `${backend.url}/recommendation/calculate-rosi`,
        rosiDetail,
        httpOptions,
      )
      .pipe(
        catchError((err) =>
          of({} as ROSIDetail).pipe(
            tap(() => console.error(err.error.message)),
          ),
        ),
      );
  }
}
