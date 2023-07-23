/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimilarityDataService } from './similarity-data.service';

describe('Service: SimilarityData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimilarityDataService],
    });
  });

  it('should ...', inject(
    [SimilarityDataService],
    (service: SimilarityDataService) => {
      expect(service).toBeTruthy();
    },
  ));
});
