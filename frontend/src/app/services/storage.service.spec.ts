/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';


describe('Service: Storage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
  });

  xit('should ...', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
});
