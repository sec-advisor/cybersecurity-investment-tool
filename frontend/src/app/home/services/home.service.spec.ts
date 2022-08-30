/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';


describe('Service: Home', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeService],
    });
  });

  xit('should ...', inject([HomeService], (service: HomeService) => {
    expect(service).toBeTruthy();
  }));
});
