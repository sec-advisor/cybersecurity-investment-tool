import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segment } from '@libs';
import { Observable } from 'rxjs';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';

@Injectable({
  providedIn: 'root',
})
export class SettingsDataService {
  constructor(private http: HttpClient) {}

  calculateOptimalInvestment(
    segments: Segment[],
    bpf: string,
  ): Observable<Segment[]> {
    return this.http.post<Segment[]>(
      `${backend.url}/settings/optimal-investment`,
      { segments, bpf },
      httpOptions,
    );
  }
}
