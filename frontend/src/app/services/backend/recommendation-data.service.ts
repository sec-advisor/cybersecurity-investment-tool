import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecommendationProfile, ROSIDetail } from '@app/api-interfaces';
import { catchError, Observable, of, tap } from 'rxjs';

import { publicAPIUrl } from '../../constants/public-api-url';

@Injectable({
  providedIn: 'root'
})
export class RecommendationDataService {

  constructor(
    private http: HttpClient,
  ) { }

  recommend(profile: RecommendationProfile): Observable<any> {
    return this.http.post<RecommendationProfile>(`${publicAPIUrl}/recommendation/recommend`, profile).pipe(
      catchError((err) => of({} as RecommendationProfile).pipe(
        tap(() => console.error(err.error.message))))
    );
  }

  calculateROSI(rosiDetail: ROSIDetail): Observable<ROSIDetail> {
    return this.http.post<ROSIDetail>(`${publicAPIUrl}/recommendation/calculate-rosi`, rosiDetail).pipe(
      catchError((err) => of({} as ROSIDetail).pipe(
        tap(() => console.error(err.error.message))))
    );
  }

}
