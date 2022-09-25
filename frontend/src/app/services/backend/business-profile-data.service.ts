import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { BusinessProfile } from '../../../../libs/api-interfaces';
import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';
import { StorageKey } from '../../models/storage-key.enum';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessProfileDataService {
  constructor(
    private http: HttpClient,
    private storeService: LocalStorageService,
  ) {}

  storeProfile(profile: BusinessProfile): Observable<string> {
    return this.http
      .post<string>(
        `${backend.url}/business-profiles/profiles`,
        profile,
        httpOptions,
      )
      .pipe(
        tap((profileId) =>
          this.storeService.setItem(StorageKey.BusinessProfileId, profileId),
        ),
        catchError((err) =>
          of({} as string).pipe(tap(() => console.error(err.error.message))),
        ),
      );
  }

  getProfileId(): Observable<string | undefined> {
    return this.http
      .get<string>(`${backend.url}/business-profiles/user`, httpOptions)
      .pipe(
        catchError((err) =>
          of(undefined).pipe(tap(() => console.error(err.error.message))),
        ),
      );
  }

  getProfile(id: string): Observable<BusinessProfile> {
    return this.http
      .get<BusinessProfile>(
        `${backend.url}/business-profiles/profiles/${id}`,
        httpOptions,
      )
      .pipe(
        catchError((err) =>
          of({} as BusinessProfile).pipe(
            tap(() => console.error(err.error.message)),
          ),
        ),
      );
  }

  updateProfile(profile: BusinessProfile): Observable<BusinessProfile> {
    return this.http.patch<BusinessProfile>(
      `${backend.url}/business-profiles/profiles`,
      profile,
      httpOptions,
    );
  }
}
