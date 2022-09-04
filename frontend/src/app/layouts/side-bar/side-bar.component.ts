import { Component } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';

import { StorageKey } from '../../models/storage-key.enum';
import { UserDataService } from '../../services/backend/user-data.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { RoutingService } from '../../services/routing.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  readonly companyName$: Observable<string | undefined>;
  readonly isLoggedIn$: Observable<boolean>;

  constructor(
    private localStorageService: LocalStorageService,
    private userDataService: UserDataService,
    public storageService: StorageService,
    public routingService: RoutingService
  ) {
    this.isLoggedIn$ = this.storageService.getLoggingState();

    this.companyName$ = this.isLoggedIn$.pipe(
      switchMap((isLoggedIn) => isLoggedIn ?
        this.storageService.getBusinessProfile().pipe(map((profile) => profile?.companyName)) :
        of(undefined)),
    );

  }

  logout(): void {
    this.localStorageService.removeItem(StorageKey.BusinessProfileId);
    this.storageService.setLoggingState(false);
    this.storageService.reset();
    this.userDataService.logout().subscribe(() => this.routingService.reset());
  }
}
