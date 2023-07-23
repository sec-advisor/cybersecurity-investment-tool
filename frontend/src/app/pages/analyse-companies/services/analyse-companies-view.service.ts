import { Injectable } from '@angular/core';

import { Company } from '../../../models/company.interface';
import { SimilarityDataService } from '../../../services/backend/similarity-data.service';

@Injectable()
export class AnalyseCompaniesViewService {
  constructor(private similarityDataService: SimilarityDataService) {}

  getViewModel(company: Company) {
    return this.similarityDataService.getData(company);
  }
}
