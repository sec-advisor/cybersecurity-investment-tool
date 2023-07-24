import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { Company } from '../../../models/company.interface';
import { SimilarityDataService } from '../../../services/backend/similarity-data.service';

@Injectable()
export class AnalyseCompaniesViewService {
  constructor(private similarityDataService: SimilarityDataService) {}

  getViewModel(company: Company, numberOfClosest?: number) {
    return this.similarityDataService
      .getData(company, numberOfClosest)
      .pipe(tap(console.log));
  }
}
