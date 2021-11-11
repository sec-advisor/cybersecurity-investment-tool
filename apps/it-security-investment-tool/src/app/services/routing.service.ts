import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subscriber, tap } from 'rxjs';

import { StorageKey } from '../models/storage-key.enum';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService implements OnDestroy {

  private readonly subscriber = new Subscriber();

  readonly pages: { name: string; icon: string; path: string; active: boolean; disabled?: boolean }[] = [
    { name: 'Home', icon: 'bi-house-door', path: '/home', active: true },
    { name: 'Business Profile', icon: 'bi-building', path: '/business-profile', active: false },
    { name: 'Segments', icon: 'bi-pie-chart', path: '/segments', active: false, disabled: true },
    { name: 'Recommendation', icon: 'bi-shield', path: '/recommendation', active: false, disabled: true },
  ]

  constructor(private router: Router, private storageService: StorageService, private l: LocalStorageService) {
    // TODO CH: Load profile at beginning from other place
    this.subscriber.add(this.storageService.getBusinessProfile().subscribe());

    const profileId = this.l.getItem(StorageKey.BusinessProfileId);
    if (profileId) {
      this.pages.forEach(page => page.disabled = false);
    }

    this.subscriber.add(this.handleRouterChanges().subscribe());
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  browseTo(path: string): void {
    const newPage = this.pages.find(page => page.path === path);

    if (newPage) {
      if (!newPage.disabled) {
        this.pages.forEach(item => item.active = false);
        newPage.active = true;
        this.router.navigate([newPage.path]);
      }
    } else {
      throw new Error('Error in Routing Service');
    }
  }

  // TODO CH: Refactor almost same code
  handleRouterChanges(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(event => {
        const newPage = this.pages.find(page => page.path === (event as NavigationEnd).url);
        if (newPage) {
          if (!newPage.disabled) {
            this.pages.forEach(item => item.active = false);
            newPage.active = true;
          }
        }
      })
    )
  }
}
