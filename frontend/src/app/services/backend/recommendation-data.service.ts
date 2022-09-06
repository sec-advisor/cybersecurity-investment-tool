import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import {
  RecommendationProfile,
  ROSIDetail,
} from '../../../../libs/api-interfaces';
import { httpOptions } from '../../constants/http-options.constants';
import { publicAPIUrl } from '../../constants/public-api-url';

@Injectable({
  providedIn: 'root',
})
export class RecommendationDataService {
  constructor(private http: HttpClient) {}

  recommend(profile: RecommendationProfile): Observable<any> {
    return this.http
      .post<RecommendationProfile>(
        `${publicAPIUrl}/recommendation/recommend`,
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
        `${publicAPIUrl}/recommendation/calculate-rosi`,
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
