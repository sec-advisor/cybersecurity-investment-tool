import { Injectable } from '@angular/core';
import { BusinessProfile } from '@app/api-interfaces';
import { map, Observable } from 'rxjs';

import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private storageService: StorageService,
  ) {
  }

  getProfile(): Observable<{ profile: BusinessProfile | undefined }> {
    // return of({ profile: undefined })
    return this.storageService.getBusinessProfile().pipe(map(profile => ({ profile })));
    // return this.isFirstCall ?
    //   this.getProfileRemotely().pipe(
    //     delay(1000),
    //     tap(() => {
    //       this.isFirstCall = false;
    //       this.isLoading = false;
    //     })
    //   ) :
    //   this.getProfileLocally();
  }

}
