import { inject, TestBed } from '@angular/core/testing';

import { SegmentDefinitionDataService } from './segment-definition-data.service';

/* tslint:disable:no-unused-variable */

describe('Service: SegmentDefinitionData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentDefinitionDataService],
    });
  });

  xit('should ...', inject(
    [SegmentDefinitionDataService],
    (service: SegmentDefinitionDataService) => {
      expect(service).toBeTruthy();
    },
  ));
});
