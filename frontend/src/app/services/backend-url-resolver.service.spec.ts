/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackendUrlResolverService } from './backend-url-resolver.service';

describe('Service: BackendUrlResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendUrlResolverService],
    });
  });

  it('should ...', inject(
    [BackendUrlResolverService],
    (service: BackendUrlResolverService) => {
      expect(service).toBeTruthy();
    },
  ));
});
