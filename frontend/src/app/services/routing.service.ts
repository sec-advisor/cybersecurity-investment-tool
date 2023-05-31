import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, first, map, merge, of, Subscriber, Subscription, switchMap, tap } from 'rxjs';

import { StorageKey } from '../models/storage-key.enum';
import { UserDataService } from './backend/user-data.service';
import { LocalStorageService } from './local-storage.service';
import { Page } from './models/page.enum';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoutingService implements OnDestroy {
  private readonly subscriber = new Subscriber();

  readonly pages: {
    id: Page;
    name: string;
    icon: string;
    path: string;
    active: boolean;
    disabled?: boolean;
  }[] = [
      {
        id: Page.Home,
        name: 'Home',
        icon: 'bi-house-door',
        path: '/home',
        active: true,
      },
      {
        id: Page.BusinessProfile,
        name: 'Business Profile',
        icon: 'bi-building',
        path: '/business-profile',
        active: false,
      },
      {
        id: Page.Segments,
        name: 'Segments',
        icon: 'bi-pie-chart',
        path: '/segments',
        active: false,
        disabled: true,
      },
      {
        id: Page.Recommendation,
        name: 'Recommendation',
        icon: 'bi-shield',
        path: '/recommendation',
        active: false,
        disabled: true,
      },
      {
        id: Page.Settings,
        name: 'Settings',
        icon: 'bi-gear',
        path: '/settings',
        active: false,
      },
      {
        id: Page.AnalyseCompanies,
        name: 'Analyse Companies',
        icon: 'bi-clipboard-data',
        path: '/analyse-companies',
        active: false,
      },
    ];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private localStorageService: LocalStorageService,
    private userDataService: UserDataService,
  ) {
    this.setUserLoggingState();

    this.subscriber.add(this.handlePageEnabling());
    this.subscriber.add(this.handleRouterChanges());
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  browseTo(path: string): void {
    const newPage = this.pages.find((page) => page.path === path);

    if (newPage) {
      if (!newPage.disabled) {
        this.pages.forEach((item) => (item.active = false));
        newPage.active = true;
        this.router.navigate([newPage.path]);
      }
    } else {
      throw new Error('Error in Routing Service');
    }
  }

  reset(): void {
    this.pages.forEach((page) => {
      page.active = false;
      if (![Page.Home, Page.BusinessProfile, Page.Settings, Page.AnalyseCompanies].includes(page.id)) {
        page.disabled = true;
      }
    });
    this.browseTo('/home');
  }

  // TODO CH: Refactor almost same code
  handleRouterChanges(): Subscription {
    return this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap((event) => {
          const newPage = this.pages.find((page) =>
            (event as NavigationEnd).url.startsWith(page.path),
          );
          if (newPage) {
            if (!newPage.disabled) {
              this.pages.forEach((item) => (item.active = false));
              newPage.active = true;
            }
          }
        }),
      )
      .subscribe();
  }

  private handlePageEnabling(): Subscription {
    return this.storageService
      .getLoggingState()
      .pipe(
        filter((isLoggedIn) => isLoggedIn),
        switchMap(() =>
          merge(
            this.storageService
              .getBusinessProfile()
              .pipe(map((profile) => !!profile)),
            of(
              this.localStorageService.getItem(StorageKey.BusinessProfileId),
            ).pipe(map((profileId) => !!profileId)),
          ),
        ),
      )
      .subscribe((isProfileDefined) => {
        if (isProfileDefined) {
          this.pages.forEach((page) => (page.disabled = false));
        }
      });
  }

  private setUserLoggingState(): void {
    this.userDataService
      .isActive()
      .pipe(first())
      .subscribe((isLoggedIn) => {
        if (!isLoggedIn) {
          this.browseTo('/home');
        }
        this.storageService.setLoggingState(isLoggedIn);
      });
  }
}
