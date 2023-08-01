import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Company, CompanyComparisonDto } from '../../../models/company.interface';
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

  getSharedCompanyData(companyId: number) {
    return this.similarityDataService.getSharedCompanyData(companyId);
  }
}
