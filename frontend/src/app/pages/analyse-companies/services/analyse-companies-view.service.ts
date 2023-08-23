import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import {
  Company,
  CompanyComparisonDto,
  SharedCompanyData,
} from '../../../models/company.interface';
import { SimilarityDataService } from '../../../services/backend/similarity-data.service';

@Injectable()
export class AnalyseCompaniesViewService {
  constructor(private similarityDataService: SimilarityDataService) {}

  getViewModel(
    company: Company,
    numberOfClosest?: number,
  ): Observable<CompanyComparisonDto> {
    return this.similarityDataService
      .getComparisonCompanies(company, numberOfClosest)
      .pipe(tap(console.log));
  }

  getSharedCompanyData(companyId: number): Observable<{
    company: SharedCompanyData;
    average: SharedCompanyData;
  }> {
    return this.similarityDataService
      .getSharedCompanyData(companyId)
      .pipe(tap(console.log));
  }
}
