/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SegmentPresenterActionService } from './segment-presenter-action.service';

describe('Service: SegmentPresenterAction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentPresenterActionService],
    });
  });

  it('should ...', inject(
    [SegmentPresenterActionService],
    (service: SegmentPresenterActionService) => {
      expect(service).toBeTruthy();
    }
  ));
});
