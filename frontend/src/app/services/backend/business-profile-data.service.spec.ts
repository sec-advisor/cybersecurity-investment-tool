/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';

import { BusinessProfileDataService } from './business-profile-data.service';

describe('Service: BusinessProfileData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessProfileDataService],
    });
  });

  xit('should ...', inject(
    [BusinessProfileDataService],
    (service: BusinessProfileDataService) => {
      expect(service).toBeTruthy();
    }
  ));
});
