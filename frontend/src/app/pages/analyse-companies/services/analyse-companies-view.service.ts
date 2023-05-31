import { Injectable } from '@angular/core';

import { SimilarityDataService } from '../../../services/backend/similarity-data.service';

@Injectable()
export class AnalyseCompaniesViewService {

  constructor(private similarityDataService: SimilarityDataService) { }

  getViewModel() {
    return this.similarityDataService.getData();
  }

}
