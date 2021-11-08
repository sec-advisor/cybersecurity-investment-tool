import { Injectable } from '@angular/core';
import { BusinessProfile } from '@app/api-interfaces';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

import { StorageKey } from '../models/storage-key.enum';
import { BusinessProfileDataService } from './backend/business-profile-data.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private businessProfile$ = new BehaviorSubject<BusinessProfile | undefined>(undefined);
  private isFirstCall = true;

  constructor(
    private businessProfileDataService: BusinessProfileDataService,
    private localStorageService: LocalStorageService,
  ) { }

  storeBusinessProfile(profile: BusinessProfile): Observable<string> {
    return this.businessProfileDataService.storeProfile(profile).pipe(
      tap(id => this.businessProfile$.next({ ...profile, id }))
    );
  }

  getBusinessProfile(): Observable<BusinessProfile | undefined> {
    return (this.isFirstCall ?
      this.getProfileRemotely().pipe(tap(profile => this.businessProfile$.next(profile))) :
      of(this.businessProfile$.value)
    ).pipe(
      tap(() => this.isFirstCall = false),
      switchMap(() => this.businessProfile$)
    );
  }

  updateBusinessProfile(profile: BusinessProfile): Observable<BusinessProfile> {
    return this.businessProfileDataService.updateProfile(profile).pipe(
      tap(updatedProfile => this.businessProfile$.next(updatedProfile))
    )
  }

  private getProfileRemotely(): Observable<BusinessProfile | undefined> {
    const profileId = this.localStorageService.getItem(StorageKey.BusinessProfileId);
    return profileId ?
      this.businessProfileDataService.getProfile(profileId) :
      of(undefined);
  }

}
