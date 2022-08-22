import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessProfile } from '@app/api-interfaces';
import { catchError, Observable, of, tap } from 'rxjs';

import { publicAPIUrl } from '../../constants/public-api-url';
import { StorageKey } from '../../models/storage-key.enum';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfileDataService {

  constructor(
    private http: HttpClient,
    private storeService: LocalStorageService,
  ) { }

  storeProfile(profile: BusinessProfile): Observable<string> {
    return this.http.post<string>(`${publicAPIUrl}/business-profiles/profiles`, profile).pipe(
      tap(profileId => this.storeService.setItem(StorageKey.BusinessProfileId, profileId)),
      catchError(err => of({} as string).pipe(
        tap(() => console.error(err.error.message)))
      )
    );
  }

  getProfile(id: string): Observable<BusinessProfile> {
    return this.http.get<BusinessProfile>(`${publicAPIUrl}/business-profiles/profiles/${id}`).pipe(
      catchError((err) => of({} as BusinessProfile).pipe(
        tap(() => console.error(err.error.message))))
    );
  }

  updateProfile(profile: BusinessProfile): Observable<BusinessProfile> {
    return this.http.patch<BusinessProfile>(`${publicAPIUrl}/business-profiles/profiles`, profile);
  }

}
