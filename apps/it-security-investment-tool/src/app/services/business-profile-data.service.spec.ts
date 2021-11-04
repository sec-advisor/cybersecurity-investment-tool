/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusinessProfileDataService } from './business-profile-data.service';

describe('Service: BusinessProfileData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessProfileDataService]
    });
  });

  it('should ...', inject([BusinessProfileDataService], (service: BusinessProfileDataService) => {
    expect(service).toBeTruthy();
  }));
});
