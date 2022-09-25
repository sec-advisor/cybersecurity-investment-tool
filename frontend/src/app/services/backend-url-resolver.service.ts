import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { backend } from '../constants/backend.constants';

@Injectable({ providedIn: 'root' })
export class BackendUrlResolverService {
  constructor(private injector: Injector, private http: HttpClient) {}

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.http
        .get<{ publicAPI: { url: string } }>('./assets/config/config.json')
        .subscribe((config) => {
          backend.url = config.publicAPI.url;
          resolve();
        });
    });
  }
}
