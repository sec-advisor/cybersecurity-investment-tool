import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, merge, Observable, of, Subscriber, switchMap, tap } from 'rxjs';

import { StorageKey } from '../models/storage-key.enum';
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
    ];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private localStorageService: LocalStorageService,
  ) {
    // TODO CH: Solve this issue properly
    this.browseTo('/home');
    this.subscriber.add(this.handlePageEnabling());
    this.subscriber.add(this.handleRouterChanges().subscribe());
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
      if (![Page.Home, Page.BusinessProfile].includes(page.id)) {
        page.disabled = true;
      }
    });
    this.browseTo('/home');
  }

  // TODO CH: Refactor almost same code
  handleRouterChanges(): Observable<any> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      tap((event) => {
        const newPage = this.pages.find(
          (page) => page.path === (event as NavigationEnd).url,
        );
        if (newPage) {
          if (!newPage.disabled) {
            this.pages.forEach((item) => (item.active = false));
            newPage.active = true;
          }
        }
      }),
    );
  }

  private handlePageEnabling(): void {
    this.storageService
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
}
