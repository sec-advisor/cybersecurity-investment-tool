import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { BusinessProfile } from '../../../../libs/api-interfaces';
import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private storageService: StorageService) {}

  getProfile(): Observable<{ profile: BusinessProfile | undefined }> {
    return this.storageService
      .getBusinessProfile()
      .pipe(map((profile) => ({ profile })));
  }
}
