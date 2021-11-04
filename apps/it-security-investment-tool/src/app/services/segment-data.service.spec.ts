/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SegmentDataService } from './segment-data.service';

describe('Service: SegmentData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentDataService]
    });
  });

  it('should ...', inject([SegmentDataService], (service: SegmentDataService) => {
    expect(service).toBeTruthy();
  }));
});
