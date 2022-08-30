/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';

import { RoutingService } from './routing.service';


describe('Service: Routing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingService]
    });
  });

  xit('should ...', inject([RoutingService], (service: RoutingService) => {
    expect(service).toBeTruthy();
  }));
});
