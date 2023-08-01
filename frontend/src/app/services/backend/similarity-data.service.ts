import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';
import { Company, CompanyComparisonDto } from '../../models/company.interface';

@Injectable({
  providedIn: 'root',
})
export class SimilarityDataService {
  constructor(private http: HttpClient) {}

  getComparisonCompanies(
    company: Company,
    numberOfClosest?: number,
  ): Observable<CompanyComparisonDto> {
    return this.http.post<CompanyComparisonDto>(
      `${backend.url}/analyse-companies`,
      { company, numberOfClosest },
      httpOptions,
    );
  }

  getSharedCompanyData(companyId: number): Observable<CompanyComparisonDto> {
    return this.http.get<CompanyComparisonDto>(
      `${backend.url}/analyse-companies/company/${companyId}`,
      httpOptions,
    );
  }
}
