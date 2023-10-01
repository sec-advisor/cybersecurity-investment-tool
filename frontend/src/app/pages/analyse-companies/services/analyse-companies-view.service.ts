import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import {
  CompaniesSummary,
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
    return this.similarityDataService.getComparisonCompanies(
      company,
      numberOfClosest,
    );
  }

  getSharedCompanyData(companyId: number): Observable<{
    company: SharedCompanyData;
    average: CompaniesSummary;
  }> {
    return this.similarityDataService.getSharedCompanyData(companyId);
  }
}
