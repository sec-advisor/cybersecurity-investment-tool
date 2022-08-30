/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';

import { SegmentDataService } from './segment-data.service';


describe('Service: SegmentData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentDataService]
    });
  });

  xit('should ...', inject([SegmentDataService], (service: SegmentDataService) => {
    expect(service).toBeTruthy();
  }));
});
