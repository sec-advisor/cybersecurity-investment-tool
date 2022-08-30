import { inject, TestBed } from '@angular/core/testing';

import { RecommendationDataService } from './recommendation-data.service';

/* tslint:disable:no-unused-variable */

describe('Service: Recommendation Data', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationDataService],
    });
  });

  xit('should ...', inject(
    [RecommendationDataService],
    (service: RecommendationDataService) => {
      expect(service).toBeTruthy();
    }
  ));
});
