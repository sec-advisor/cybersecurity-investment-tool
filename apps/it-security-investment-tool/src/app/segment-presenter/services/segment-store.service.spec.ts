/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SegmentStoreService } from './segment-store.service';

describe('Service: SegmentStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentStoreService]
    });
  });

  it('should ...', inject([SegmentStoreService], (service: SegmentStoreService) => {
    expect(service).toBeTruthy();
  }));
});
