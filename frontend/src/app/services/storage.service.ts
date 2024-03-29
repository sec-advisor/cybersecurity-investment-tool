import { Injectable } from '@angular/core';
import { BusinessProfile, Segment } from '@libs';
import {
  BehaviorSubject,
  filter,
  first,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { AppSegment } from '../models/app-segment.model';
import { StorageKey } from '../models/storage-key.enum';
import { BusinessProfileDataService } from './backend/business-profile-data.service';
import { SegmentDataService } from './backend/segment-data.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private businessProfileSource$ = new BehaviorSubject<
    BusinessProfile | undefined
  >(undefined);
  private isFirstCallProfile = true;
  private isFirstCallSegments = true;
  private isLoggedIn$ = new BehaviorSubject<boolean | undefined>(undefined);
  private segmentsSource$ = new BehaviorSubject<AppSegment[]>([]);

  constructor(
    private businessProfileDataService: BusinessProfileDataService,
    private localStorageService: LocalStorageService,
    private segmentDataServices: SegmentDataService,
  ) {}

  storeBusinessProfile(profile: BusinessProfile): Observable<string> {
    return this.businessProfileDataService
      .storeProfile(profile)
      .pipe(tap((id) => this.businessProfileSource$.next({ ...profile, id })));
  }

  getBusinessProfile(): Observable<BusinessProfile | undefined> {
    return (
      this.isFirstCallProfile
        ? this.getProfileRemotely().pipe(
            tap((profile) => this.businessProfileSource$.next(profile)),
          )
        : of(this.businessProfileSource$.value)
    ).pipe(
      tap(() => (this.isFirstCallProfile = false)),
      switchMap(() => this.businessProfileSource$),
    );
  }

  updateBusinessProfile(profile: BusinessProfile): Observable<BusinessProfile> {
    return this.businessProfileDataService
      .updateProfile(profile)
      .pipe(
        tap((updatedProfile) =>
          this.businessProfileSource$.next(updatedProfile),
        ),
      );
  }

  storeSegment(segment: Segment): Observable<string> {
    return this.segmentDataServices
      .storeSegment(segment)
      .pipe(
        tap((id) =>
          this.segmentsSource$.next(
            this.segmentsSource$.value
              ? [...this.segmentsSource$.value, { ...segment, id }]
              : [{ ...segment, id }],
          ),
        ),
      );
  }

  getSegments(getExtendedModel = false): Observable<AppSegment[] | Segment[]> {
    return (
      this.isFirstCallSegments
        ? (this.isProfileDefined()
            ? of(this.businessProfileSource$.value)
            : this.businessProfileSource$.pipe(
                filter((profile) => !!profile),
                first(),
              )
          ).pipe(
            switchMap((profile) =>
              this.segmentDataServices.getSegments(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                (profile as BusinessProfile).id!,
              ),
            ),
            tap((segments) => this.segmentsSource$.next(segments)),
          )
        : of(this.segmentsSource$.value)
    ).pipe(
      tap(() => (this.isFirstCallSegments = false)),
      switchMap(() => this.segmentsSource$),
      map((segments) =>
        getExtendedModel
          ? segments
          : segments.map((segment) => ({
              ...segment,
              recommendations: undefined,
              recommendationProfile: undefined,
            })),
      ),
    );
  }

  updateSegment(
    segment: AppSegment,
    storeRemote = true,
  ): Observable<AppSegment> {
    return storeRemote
      ? this.segmentDataServices
          .updateSegment(segment)
          .pipe(
            tap((segment) =>
              this.segmentsSource$.next(
                this.segmentsSource$.value.map((s) =>
                  s.id === segment.id ? segment : s,
                ),
              ),
            ),
          )
      : of(segment).pipe(
          tap((segment) =>
            this.segmentsSource$.next(
              this.segmentsSource$.value.map((s) =>
                s.id === segment.id ? segment : s,
              ),
            ),
          ),
        );
  }

  removeSegment(segmentId: string): Observable<void> {
    this.segmentsSource$.next(
      this.segmentsSource$.value.filter((segment) => segment.id !== segmentId),
    );
    return this.segmentDataServices.removeSegment(segmentId);
  }

  updateSegments(segments: AppSegment[]): void {
    this.segmentsSource$.next(segments);
  }

  setLoggingState(isLoggedIn: boolean): void {
    this.isLoggedIn$.next(isLoggedIn);
  }

  getLoggingState(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      filter((isLoggedIn) => isLoggedIn !== undefined),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map((isLoggedIn) => isLoggedIn!),
    );
  }

  reset(): void {
    this.isFirstCallProfile = true;
    this.isFirstCallSegments = true;
  }

  private isProfileDefined(): boolean {
    return !!this.businessProfileSource$.value;
  }

  private getProfileRemotely(): Observable<BusinessProfile | undefined> {
    const profileId = this.localStorageService.getItem(
      StorageKey.BusinessProfileId,
    );
    return profileId
      ? this.businessProfileDataService.getProfile(profileId)
      : of(undefined);
  }
}
