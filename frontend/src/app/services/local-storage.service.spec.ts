import { inject, TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

/* tslint:disable:no-unused-variable */

describe('Service: Store', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
  });

  it('should ...', inject(
    [LocalStorageService],
    (service: LocalStorageService) => {
      expect(service).toBeTruthy();
    }
  ));
});
