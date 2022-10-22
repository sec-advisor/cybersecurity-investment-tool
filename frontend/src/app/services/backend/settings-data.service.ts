import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '@libs';
import { Observable } from 'rxjs';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';

@Injectable({
  providedIn: 'root',
})
export class SettingsDataService {
  constructor(private http: HttpClient) {}

  save(appSetting: AppSetting): Observable<AppSetting> {
    return this.http.post<AppSetting>(
      `${backend.url}/settings/save`,
      appSetting,
      httpOptions,
    );
  }

  reset(): Observable<void> {
    return this.http.post<void>(
      `${backend.url}/settings/reset`,
      {},
      httpOptions,
    );
  }
}
