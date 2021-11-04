import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  readonly pages: { name: string; icon: string; path: string; active: boolean; }[] = [
    { name: 'Home', icon: 'bi-house-door', path: '/home', active: true },
    { name: 'Segments', icon: 'bi-pie-chart', path: '/segments', active: false },
    { name: 'Recommendation', icon: 'bi-shield', path: '/recommendation', active: false },
    { name: 'Business Profile', icon: 'bi-building', path: '/business-profile', active: false },
  ]

  constructor(private router: Router) { }

  browseTo(path: string): void {
    this.pages.forEach(item => item.active = false);
    const currentPage = this.pages.find(page => page.path === path);

    if (currentPage) {
      currentPage.active = true;
      this.router.navigate([currentPage.path]);
    } else {
      throw new Error('Error in Routing Service');
    }
  }
}
