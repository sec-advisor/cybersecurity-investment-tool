import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';
import { Company } from '../../models/company.interface';

@Injectable({
  providedIn: 'root',
})
export class SimilarityDataService {
  constructor(private http: HttpClient) {}

  getData(company: Company, numberOfClosest?: number): Observable<any> {
    return this.http.post(
      `${backend.url}/analyse-companies`,
      { company, numberOfClosest },
      httpOptions,
    );
  }
}
