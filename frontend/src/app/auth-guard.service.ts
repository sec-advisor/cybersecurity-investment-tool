import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { StorageKey } from './models/storage-key.enum';
import { LocalStorageService } from './services/local-storage.service';
import { RoutingService } from './services/routing.service';


@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(public localStorageService: LocalStorageService, private routingService: RoutingService) { }

  canActivate(): boolean {
    if (this.localStorageService.getItem(StorageKey.BusinessProfileId)) {
      return true;
    } else {
      this.routingService.browseTo('/home');
      return false;
    }
  }
}
