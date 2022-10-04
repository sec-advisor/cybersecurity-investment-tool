/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { BackendUrlResolverService } from './backend-url-resolver.service';

describe('Service: BackendUrlResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
