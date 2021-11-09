import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';

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

  constructor(private router: Router, private storageService: StorageService) {
    this.subscriber.add(this.storageService.getBusinessProfile().pipe(
    ).subscribe(profile => {
      if (profile) {
        this.pages.forEach(page => page.disabled = false);
      }
    }))
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
}
