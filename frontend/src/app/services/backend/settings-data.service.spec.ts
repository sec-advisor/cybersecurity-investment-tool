/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { SettingsDataService } from './settings-data.service';

describe('Service: SettingsData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SettingsDataService],
    });
  });

  it('should ...', inject(
    [SettingsDataService],
    (service: SettingsDataService) => {
      expect(service).toBeTruthy();
    },
  ));
});
